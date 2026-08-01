# Computer tests pending

## macOS

```bash
./scripts/clone-suite-macos.sh
node bin/cano-tutorial.js init
node bin/cano-tutorial.js doctor
node bin/cano-tutorial.js run examples/image-generator-short.request.json --mock
```

## Windows 11

```powershell
.\scripts\clone-suite-windows.ps1
node .\bin\cano-tutorial.js init
node .\bin\cano-tutorial.js doctor
node .\bin\cano-tutorial.js run .\examples\image-generator-short.request.json --mock
```

After mock succeeds, configure private providers and produce one approved short before testing long-form output.
