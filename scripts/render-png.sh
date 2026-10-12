#!/usr/bin/env bash
# Renders the PNG images with Edge (or Chrome) headless. Run from the repo root
# after `node scripts/render-assets.mjs`. Set BROWSER to override the binary.
set -euo pipefail
BROWSER="${BROWSER:-/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe}"
ROOT="$(pwd -W 2>/dev/null || pwd)"
shot() {
  timeout 60 "$BROWSER" --headless=new --blink-settings=preferredColorScheme=1 --disable-gpu --hide-scrollbars --window-size="$1" --screenshot="$ROOT/$2" "file:///$ROOT/$3" >/dev/null 2>&1 || true
  echo "rendered $2"
}
shot 1200,630 docs/og.png scripts/cards/og.html
shot 1280,640 assets/social-preview.png scripts/cards/social-preview.html
shot 1280,1180 assets/report.png docs/report-example.html
