#!/usr/bin/env bash
set -euo pipefail
base="${1:-$HOME/AI/cano-tutorials}"
ref="${CANO_TUTORIAL_REF:-main}"
mkdir -p "$base"
cd "$base"

skills=(cano-screen-tutorial-skill cano-heygen-presenter-skill cano-hybrid-composer-skill cano-tutorial-suite)
for repo in "${skills[@]}"; do
  if [ ! -d "$repo/.git" ]; then
    git clone --branch "$ref" --single-branch "https://github.com/syacreator09-sys/$repo.git"
  else
    git -C "$repo" fetch origin "$ref"
    git -C "$repo" checkout "$ref"
    git -C "$repo" pull --ff-only origin "$ref"
  fi
done

if [ ! -d cano-video-vox/.git ]; then
  git clone "https://github.com/syacreator09-sys/cano-video-vox.git"
else
  git -C cano-video-vox pull --ff-only
fi

for repo in "${skills[@]}"; do
  (cd "$repo" && npm install && npm run verify)
done
(cd cano-screen-tutorial-skill && npx playwright install chromium)
(cd cano-tutorial-suite && node bin/cano-tutorial.js doctor)

echo "CANO Tutorial Suite installed and locally verified at $base"
