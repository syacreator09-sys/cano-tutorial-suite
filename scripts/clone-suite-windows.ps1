param(
  [string]$Base = "$HOME\AI\cano-tutorials",
  [string]$Ref = $(if ($env:CANO_TUTORIAL_REF) { $env:CANO_TUTORIAL_REF } else { "feature/standalone-v1" })
)
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $Base | Out-Null
Set-Location $Base

$skills = @("cano-screen-tutorial-skill","cano-heygen-presenter-skill","cano-hybrid-composer-skill","cano-tutorial-suite")
foreach ($repo in $skills) {
  if (-not (Test-Path "$repo\.git")) {
    git clone --branch $Ref --single-branch "https://github.com/syacreator09-sys/$repo.git"
  } else {
    git -C $repo fetch origin $Ref
    git -C $repo checkout $Ref
    git -C $repo pull --ff-only origin $Ref
  }
}

if (-not (Test-Path "cano-video-vox\.git")) {
  git clone "https://github.com/syacreator09-sys/cano-video-vox.git"
} else {
  git -C cano-video-vox pull --ff-only
}

foreach ($repo in $skills) {
  Push-Location $repo
  npm install
  npm test
  npm run check
  Pop-Location
}
Push-Location cano-screen-tutorial-skill
npx playwright install chromium
Pop-Location
Push-Location cano-tutorial-suite
node .\bin\cano-tutorial.js doctor
Pop-Location
Write-Host "CANO Tutorial Suite installed at $Base"
