import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadSuiteConfig } from './config.js';
import { runNodeJson } from './process.js';

async function loadJson(file){return JSON.parse(await readFile(file,'utf8'));}
async function saveState(file,state){await mkdir(path.dirname(file),{recursive:true});await writeFile(file,`${JSON.stringify(state,null,2)}\n`);}
function resolveFrom(base,file){return path.isAbsolute(file)?file:path.resolve(base,file);}

export async function executeWorkflow(workflowFile,{mode='mock',configFile='config/suite.local.json'}={}) {
  if(!['mock','live'].includes(mode))throw new Error('mode must be mock or live');
  const workflowPath=path.resolve(workflowFile);
  const workflow=await loadJson(workflowPath);
  const workflowDir=path.dirname(workflowPath);
  const {config}=await loadSuiteConfig(configFile);
  const stateFile=path.resolve(config.runtimeDir,'jobs',workflow.projectId,'job-state.json');
  const state={version:'1.0',projectId:workflow.projectId,mode,status:'RUNNING',startedAt:new Date().toISOString(),stages:{}};
  await saveState(stateFile,state);

  const requireApproval=(name,condition)=>{if(mode==='live'&&condition&&!config.approvals[name])throw new Error(`live execution requires approvals.${name}=true in local config`);};
  const runStage=async(id,fn)=>{
    state.stages[id]={status:'RUNNING',startedAt:new Date().toISOString()}; await saveState(stateFile,state);
    try { const output=await fn(); state.stages[id]={status:'COMPLETED',completedAt:new Date().toISOString(),output}; await saveState(stateFile,state); return output; }
    catch(error){state.status='FAILED';state.stages[id]={status:'FAILED',failedAt:new Date().toISOString(),error:error.message};await saveState(stateFile,state);throw error;}
  };

  const stages=workflow.stages ?? {};
  if(stages.screen?.enabled!==false) {
    requireApproval('liveBrowser',true);
    await runStage('screen',()=>runNodeJson({cwd:config.skills.screen.path,bin:config.skills.screen.bin,args:['capture',resolveFrom(workflowDir,stages.screen.request),mode==='live'?'--live':'--mock']}));
  } else state.stages.screen={status:'SKIPPED'};

  if(stages.presenter?.enabled) {
    requireApproval('providerSpend',true); requireApproval('identityUse',true);
    await runStage('presenter',()=>runNodeJson({cwd:config.skills.presenter.path,bin:config.skills.presenter.bin,args:['render',resolveFrom(workflowDir,stages.presenter.request),mode==='live'?'--live':'--mock']}));
  } else state.stages.presenter={status:'SKIPPED'};

  if(stages.vox?.enabled) {
    if(mode==='live') {
      requireApproval('localRender',true);
      if(!stages.vox.jobSlug)throw new Error('vox.jobSlug is required for live VideoVox rendering');
      const outputDir=resolveFrom(workflowDir,stages.vox.outputDir ?? path.join(config.runtimeDir,'jobs',workflow.projectId,'vox'));
      await runStage('vox',()=>runNodeJson({cwd:config.skills.vox.path,bin:config.skills.vox.bin,args:['--job',stages.vox.jobSlug,'--out',outputDir],allowNonJson:true}));
    } else state.stages.vox={status:'MOCKED',jobSlug:stages.vox.jobSlug ?? null};
  } else state.stages.vox={status:'SKIPPED'};
  await saveState(stateFile,state);

  if(stages.composer?.enabled!==false) {
    if(mode==='live')requireApproval('localRender',true);
    await runStage('composer',()=>runNodeJson({cwd:config.skills.composer.path,bin:config.skills.composer.bin,args:['render',resolveFrom(workflowDir,stages.composer.request),mode==='live'?'--live':'--mock']}));
  } else state.stages.composer={status:'SKIPPED'};

  state.status='AWAITING_REVIEW';state.completedAt=new Date().toISOString();state.approvals={publication:false};await saveState(stateFile,state);
  return {...state,stateFile};
}

export async function readWorkflowStatus(projectId,{configFile='config/suite.local.json'}={}) {
  const {config}=await loadSuiteConfig(configFile);
  const stateFile=path.resolve(config.runtimeDir,'jobs',projectId,'job-state.json');
  return {...await loadJson(stateFile),stateFile};
}
