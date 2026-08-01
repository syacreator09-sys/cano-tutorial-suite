import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { saveSuiteConfig, defaultSuiteConfig } from '../src/config.js';
import { prepareTutorialWorkspace } from '../src/prepare.js';

const request={version:'1.0',projectId:'prepare-pilot',topic:'Create an image tutorial',format:'tutorial_short',screen:{url:'https://example.com'},presenter:{enabled:true},vox:{enabled:true},cta:'Save this tutorial'};

test('prepare creates coherent requests and asset paths',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'cano-suite-test-'));
  const configFile=path.join(root,'suite.local.json');
  const config=defaultSuiteConfig(process.cwd());
  config.runtimeDir=path.join(root,'runtime');
  await saveSuiteConfig(config,configFile);
  const result=await prepareTutorialWorkspace(request,{configFile});
  const composition=JSON.parse(await readFile(result.files.composition,'utf8'));
  assert.equal(result.status,'PREPARED');
  assert.ok(composition.scenes.some((scene)=>scene.asset==='../assets/screen.webm'));
  assert.match(result.assetsDir,/assets$/);
});
