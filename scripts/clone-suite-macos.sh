#!/usr/bin/env bash
set -euo pipefail
base="${1:-$HOME/AI/cano-tutorials}"
mkdir -p "$base"; cd "$base"
for repo in cano-screen-tutorial-skill cano-heygen-presenter-skill cano-video-vox cano-hybrid-composer-skill cano-tutorial-suite; do
  test -d "$repo/.git" || git clone "https://github.com/syacreator09-sys/$repo.git"
done
for repo in cano-screen-tutorial-skill cano-heygen-presenter-skill cano-hybrid-composer-skill cano-tutorial-suite; do (cd "$repo" && npm install); done
(cd cano-tutorial-suite && node bin/cano-tutorial.js doctor)
