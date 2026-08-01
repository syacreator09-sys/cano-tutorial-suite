#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { buildTutorialPlan } from '../src/plan.js';
import { runMock } from '../src/mock-run.js';
import { runSuiteSetup } from '../src/setup.js';
import { runSuiteDoctor } from '../src/doctor.js';
import { prepareTutorialWorkspace } from '../src/prepare.js';
import { executeWorkflow, readWorkflowStatus } from '../src/execute.js';

async function load(file){return JSON.parse(await readFile(file,'utf8'));}
function flag(name){const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]??true:null;}
function usage(){return `cano-tutorial-v2 commands:\n  init [--from config.json] [--config path]\n  doctor [--config path]\n  plan request.json\n  prepare request.json [--config path]\n  run request.json --mock\n  execute workflow.json [--mock|--live] [--config path]\n  status project-id [--config path]`;}

async function main(){
  const [cmd,arg]=process.argv.slice(2);
  const configFile=flag('--config') || 'config/suite.local.json';
  if(!cmd||cmd==='help'||cmd==='--help'){console.log(usage());return;}
  if(cmd==='init'){console.log(JSON.stringify(await runSuiteSetup({seedFile:flag('--from')||undefined,outputFile:configFile}),null,2));return;}
  if(cmd==='doctor'){const result=await runSuiteDoctor({configFile});console.log(JSON.stringify(result,null,2));if(!result.ok)process.exitCode=1;return;}
  if(cmd==='status'){if(!arg)throw new Error('status requires project-id');console.log(JSON.stringify(await readWorkflowStatus(arg,{configFile}),null,2));return;}
  if(!arg)throw new Error(`${cmd} requires a JSON file\n${usage()}`);
  if(cmd==='plan'){console.log(JSON.stringify(buildTutorialPlan(await load(arg)),null,2));return;}
  if(cmd==='prepare'){console.log(JSON.stringify(await prepareTutorialWorkspace(await load(arg),{configFile}),null,2));return;}
  if(cmd==='run'){
    const request=await load(arg);const plan=buildTutorialPlan(request);const out=path.resolve('.runtime','jobs',plan.projectId);
    console.log(JSON.stringify({...await runMock(plan,out),outDir:out},null,2));return;
  }
  if(cmd==='execute'){
    const mode=process.argv.includes('--live')?'live':'mock';
    console.log(JSON.stringify(await executeWorkflow(arg,{mode,configFile}),null,2));return;
  }
  throw new Error(`unknown command: ${cmd}\n${usage()}`);
}
main().catch((error)=>{console.error(error.message);process.exitCode=1;});
