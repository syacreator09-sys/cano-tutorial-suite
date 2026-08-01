import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildTutorialPlan } from './plan.js';
import { loadSuiteConfig } from './config.js';

async function writeJson(file,value){await mkdir(path.dirname(file),{recursive:true});await writeFile(file,`${JSON.stringify(value,null,2)}\n`);return file;}

export async function prepareTutorialWorkspace(request,{configFile='config/suite.local.json'}={}) {
  const plan=buildTutorialPlan(request);
  const {config}=await loadSuiteConfig(configFile);
  const root=path.resolve(config.runtimeDir,'jobs',request.projectId);
  const requestDir=path.join(root,'requests');
  const screenRequest={
    version:'1.0',projectId:`${request.projectId}-screen`,url:request.screen.url,
    objective:request.screen.objective ?? request.topic,
    viewport:plan.route.canvas==='9:16'?{width:1440,height:900}:{width:1440,height:900},
    actions:[
      {id:'open-tool',type:'goto',url:request.screen.url},
      {id:'wait-page',type:'waitFor',selector:'body'},
      {id:'final-screen',type:'screenshot'}
    ],
    redactions:['input[type=password]','input[type=email]','[data-private]']
  };
  const presenterRequest={
    version:'1.0',projectId:`${request.projectId}-presenter`,
    profile:request.presenter?.profileFile ?? 'profiles/example.profile.json',
    aspectRatio:plan.route.canvas,resolution:'1080p',
    segments:[
      {id:'hook',purpose:'hook',script:request.presenter?.hook ?? `Hoy te mostraré ${request.topic}.`},
      {id:'cta',purpose:'cta',script:request.cta ?? 'Guarda este tutorial para consultarlo después.'}
    ]
  };
  const compositionRequest={
    version:'1.0',projectId:`${request.projectId}-composition`,canvas:plan.route.canvas,fps:30,
    scenes:[
      ...(plan.route.usePresenter?[{id:'avatar-hook',type:'avatar',asset:'assets/avatar-hook.mp4',duration:4}]:[]),
      {id:'browser-demo',type:'browser',asset:'assets/screen.webm',duration:Math.max(10,plan.route.durationTarget-12),fit:'contain'},
      ...(plan.route.useVox?[{id:'vox-explainer',type:'videovox',asset:'assets/vox.mp4',duration:6}]:[]),
      ...(plan.route.usePresenter?[{id:'avatar-cta',type:'avatar',asset:'assets/avatar-cta.mp4',duration:4}]:[])
    ]
  };
  const workflow={
    version:'1.0',projectId:request.projectId,
    stages:{
      screen:{enabled:true,request:path.join(requestDir,'screen-request.json')},
      presenter:{enabled:plan.route.usePresenter,request:path.join(requestDir,'presenter-request.json')},
      vox:{enabled:plan.route.useVox,jobSlug:request.vox?.jobSlug ?? null,outputDir:path.join(root,'vox')},
      composer:{enabled:true,request:path.join(requestDir,'composition-request.json')}
    }
  };
  await writeJson(path.join(root,'tutorial-plan.json'),plan);
  await writeJson(path.join(requestDir,'screen-request.json'),screenRequest);
  await writeJson(path.join(requestDir,'presenter-request.json'),presenterRequest);
  await writeJson(path.join(requestDir,'composition-request.json'),compositionRequest);
  await writeJson(path.join(root,'workflow.json'),workflow);
  return {status:'PREPARED',projectId:request.projectId,root,workflow:path.join(root,'workflow.json'),files:{screen:path.join(requestDir,'screen-request.json'),presenter:path.join(requestDir,'presenter-request.json'),composition:path.join(requestDir,'composition-request.json')}};
}
