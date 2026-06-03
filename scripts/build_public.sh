#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

python3 - <<'PY'
from datetime import datetime, timedelta, timezone
import re

updated = (datetime.now(timezone.utc) + timedelta(hours=9)).strftime("%Y-%m-%d")
pattern = re.compile(r"Updated: \d{4}-\d{2}-\d{2} JST")

for path in ("index.html", "docs/reader.html"):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    text, count = pattern.subn(f"Updated: {updated} JST", text)
    if count == 0:
        raise SystemExit(f"missing Updated marker in {path}")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
PY

mkdir -p public
cp index.html styles.css app.js manifest.webmanifest offline.html service-worker.js favicon.ico robots.txt public/
cp -R assets public/
mkdir -p public/docs
cp -R docs/. public/docs/
