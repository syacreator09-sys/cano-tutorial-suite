import { spawn } from 'node:child_process';
import path from 'node:path';

export async function runNodeJson({cwd, bin, args = [], env = process.env, allowNonJson = false}) {
  const absoluteBin = path.resolve(cwd, bin);
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [absoluteBin, ...args], {cwd, env, shell:false});
    let stdout=''; let stderr='';
    child.stdout.on('data',(chunk)=>{stdout+=chunk;});
    child.stderr.on('data',(chunk)=>{stderr+=chunk;});
    child.on('error',reject);
    child.on('close',(code)=>{
      if(code!==0) return reject(new Error(stderr.trim() || stdout.trim() || `command failed with code ${code}`));
      const text=stdout.trim();
      if(!text) return resolve({ok:true,stdout:'',stderr:stderr.trim()});
      try { resolve(JSON.parse(text)); }
      catch(error) {
        if(allowNonJson) resolve({ok:true,stdout:text,stderr:stderr.trim()});
        else reject(new Error(`command did not return JSON: ${error.message}\n${text}`));
      }
    });
  });
}
