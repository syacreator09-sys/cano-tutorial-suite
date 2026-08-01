import { readFile } from 'node:fs/promises';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { defaultSuiteConfig, normalizeSuiteConfig, saveSuiteConfig } from './config.js';

function yes(value, fallback=false) {
  const text=String(value??'').trim().toLowerCase();
  if(!text)return fallback;
  return ['y','yes','s','si','sí','1','true'].includes(text);
}

export async function runSuiteSetup({seedFile,outputFile='config/suite.local.json'}={}) {
  if(seedFile)return saveSuiteConfig(JSON.parse(await readFile(seedFile,'utf8')),outputFile);
  const base=defaultSuiteConfig();
  const rl=readline.createInterface({input,output});
  try {
    output.write('\nCANO Tutorial Suite setup\n');
    output.write('Los permisos live quedan desactivados salvo que los habilites conscientemente.\n\n');
    const skills={};
    for(const id of ['screen','presenter','vox','composer']) {
      const current=base.skills[id];
      const value=(await rl.question(`Ruta local de ${id} (${current.path}): `)).trim();
      skills[id]={...current,path:value||current.path};
    }
    const mode=yes(await rl.question('¿Usar live como modo predeterminado? [s/N]: '),false)?'live':'mock';
    const approvals={
      liveBrowser:yes(await rl.question('¿Autorizar navegador live por defecto? [s/N]: '),false),
      providerSpend:yes(await rl.question('¿Autorizar gasto de proveedor por defecto? [s/N]: '),false),
      identityUse:yes(await rl.question('¿Autorizar uso de identidad/avatar por defecto? [s/N]: '),false),
      localRender:yes(await rl.question('¿Autorizar render FFmpeg local por defecto? [s/N]: '),false),
      publication:false
    };
    return saveSuiteConfig(normalizeSuiteConfig({skills,defaults:{mode},approvals}),outputFile);
  } finally { rl.close(); }
}
