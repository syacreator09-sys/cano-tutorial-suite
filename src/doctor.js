import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { loadSuiteConfig } from './config.js';
import { runNodeJson } from './process.js';

async function exists(file){try{await access(file);return true;}catch{return false;}}

export async function runSuiteDoctor({configFile='config/suite.local.json'}={}) {
  const loaded=await loadSuiteConfig(configFile);
  const skills={};
  for(const [id,skill] of Object.entries(loaded.config.skills)) {
    const packageFile=path.join(skill.path,'package.json');
    const binFile=path.join(skill.path,skill.bin);
    const repositoryExists=await exists(skill.path);
    const binExists=await exists(binFile);
    let version=null; let doctor=null; let error=null;
    if(await exists(packageFile)) {
      try { version=JSON.parse(await readFile(packageFile,'utf8')).version ?? null; } catch {}
    }
    if(repositoryExists && binExists && id!=='vox') {
      try { doctor=await runNodeJson({cwd:skill.path,bin:skill.bin,args:['doctor']}); }
      catch(err){ error=err.message; }
    }
    if(id==='vox' && repositoryExists) {
      try {
        const pkg=JSON.parse(await readFile(packageFile,'utf8'));
        doctor={renderJob:Boolean(pkg.scripts?.['render:job']),private:Boolean(pkg.private)};
      } catch(err){error=err.message;}
    }
    skills[id]={path:skill.path,repositoryExists,bin:skill.bin,binExists,version,doctor,error};
  }
  const nodeMajor=Number(process.versions.node.split('.')[0]);
  const ok=nodeMajor>=20 && Object.values(skills).every((skill)=>skill.repositoryExists && skill.binExists && !skill.error);
  return {
    ok,
    node:process.version,
    nodeSupported:nodeMajor>=20,
    platform:process.platform,
    arch:process.arch,
    configFile:loaded.file,
    configExists:loaded.exists,
    approvals:loaded.config.approvals,
    skills,
    nextSteps:[
      ...(!loaded.exists?['Run: cano-tutorial init']:[]),
      ...Object.entries(skills).filter(([,s])=>!s.repositoryExists).map(([id,s])=>`Clone or correct ${id}: ${s.path}`),
      ...Object.entries(skills).filter(([,s])=>s.repositoryExists&&!s.binExists).map(([id,s])=>`Missing ${id} executable: ${s.bin}`)
    ]
  };
}
