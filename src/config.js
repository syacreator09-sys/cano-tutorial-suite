import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

export function defaultSuiteConfig(root = process.cwd()) {
  const parent = path.resolve(root, '..');
  return {
    version:'1.0',
    runtimeDir:'.runtime',
    skills:{
      screen:{path:path.join(parent,'cano-screen-tutorial-skill'),bin:'bin/cano-screen.js'},
      presenter:{path:path.join(parent,'cano-heygen-presenter-skill'),bin:'bin/cano-heygen.js'},
      vox:{path:path.join(parent,'cano-video-vox'),bin:'scripts/render-job.mjs'},
      composer:{path:path.join(parent,'cano-hybrid-composer-skill'),bin:'bin/cano-compose.js'}
    },
    defaults:{mode:'mock',format:'tutorial_short'},
    approvals:{liveBrowser:false,providerSpend:false,identityUse:false,localRender:false,publication:false}
  };
}

export function normalizeSuiteConfig(input = {}, root = process.cwd()) {
  const defaults = defaultSuiteConfig(root);
  const skills = input.skills ?? {};
  return {
    version:'1.0',
    runtimeDir:input.runtimeDir || defaults.runtimeDir,
    skills:Object.fromEntries(Object.entries(defaults.skills).map(([id,value]) => [id,{...value,...(skills[id] ?? {}),path:path.resolve(skills[id]?.path ?? value.path)}])),
    defaults:{...defaults.defaults,...(input.defaults ?? {})},
    approvals:{...defaults.approvals,...(input.approvals ?? {})}
  };
}

export function validateSuiteConfig(config) {
  const errors=[];
  for (const id of ['screen','presenter','vox','composer']) {
    if (!config?.skills?.[id]?.path) errors.push(`skills.${id}.path required`);
    if (!config?.skills?.[id]?.bin) errors.push(`skills.${id}.bin required`);
  }
  if (!['mock','live'].includes(config?.defaults?.mode)) errors.push('defaults.mode must be mock or live');
  for (const [key,value] of Object.entries(config?.approvals ?? {})) if (typeof value !== 'boolean') errors.push(`approvals.${key} must be boolean`);
  return {ok:errors.length===0,errors};
}

export async function loadSuiteConfig(file='config/suite.local.json') {
  try {
    const config=normalizeSuiteConfig(JSON.parse(await readFile(file,'utf8')));
    const check=validateSuiteConfig(config); if(!check.ok)throw new Error(check.errors.join('; '));
    return {config,file:path.resolve(file),exists:true};
  } catch(error) {
    if(error?.code!=='ENOENT')throw error;
    return {config:normalizeSuiteConfig(),file:path.resolve(file),exists:false};
  }
}

export async function saveSuiteConfig(input,file='config/suite.local.json') {
  const config=normalizeSuiteConfig(input);
  const check=validateSuiteConfig(config); if(!check.ok)throw new Error(check.errors.join('; '));
  await mkdir(path.dirname(file),{recursive:true});
  await writeFile(file,`${JSON.stringify(config,null,2)}\n`,{mode:0o600});
  return {file:path.resolve(file),config};
}
