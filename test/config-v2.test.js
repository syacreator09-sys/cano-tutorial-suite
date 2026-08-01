import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { defaultSuiteConfig, normalizeSuiteConfig, validateSuiteConfig } from '../src/config.js';

test('default config isolates all four skills',()=>{
  const config=defaultSuiteConfig(process.cwd());
  assert.deepEqual(Object.keys(config.skills),['screen','presenter','vox','composer']);
  assert.equal(config.approvals.publication,false);
  assert.match(config.skills.vox.bin,/render-job\.mjs$/);
});

test('normalization resolves portable absolute paths',()=>{
  const config=normalizeSuiteConfig({skills:{screen:{path:'../screen'}}},process.cwd());
  assert.equal(path.isAbsolute(config.skills.screen.path),true);
  assert.equal(validateSuiteConfig(config).ok,true);
});
