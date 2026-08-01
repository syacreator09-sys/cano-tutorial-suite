param([string]$Base = "$HOME\AI\cano-tutorials")
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $Base | Out-Null
Set-Location $Base
$repos = @("cano-screen-tutorial-skill","cano-heygen-presenter-skill","cano-video-vox","cano-hybrid-composer-skill","cano-tutorial-suite")
foreach ($repo in $repos) { if (-not (Test-Path "$repo\.git")) { git clone "https://github.com/syacreator09-sys/$repo.git" } }
foreach ($repo in @("cano-screen-tutorial-skill","cano-heygen-presenter-skill","cano-hybrid-composer-skill","cano-tutorial-suite")) { Push-Location $repo; npm install; Pop-Location }
Push-Location cano-tutorial-suite; node .\bin\cano-tutorial.js doctor; Pop-Location
