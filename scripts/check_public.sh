#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

fail() {
  printf 'NG: %s\n' "$1" >&2
  exit 1
}

ok() {
  printf 'OK: %s\n' "$1"
}

require_file() {
  [[ -f "$1" ]] || fail "missing file: $1"
}

require_dir() {
  [[ -d "$1" ]] || fail "missing directory: $1"
}

require_file index.html
require_file styles.css
require_file app.js
require_file manifest.webmanifest
require_file offline.html
require_file service-worker.js
require_file favicon.ico
require_file robots.txt
require_file docs/reader.html
require_file docs/reader.css
require_file docs/reader.js
require_file assets/app-icon-192.png
require_file assets/app-icon-512.png
require_dir assets
require_dir docs
require_dir public
require_dir public/docs
ok "required files exist"

if git ls-files -co --exclude-standard | rg -i '\.pdf$'; then
  fail "PDF files must not be committed"
fi
ok "no PDF files"

if git ls-files | rg -i '(^|/)(private|local-private|reservations|tickets|wallet|insurance|cards|passports|esta|screenshots-private)/'; then
  fail "private directory files must not be tracked"
fi
ok "no tracked private directories"

sensitive_pattern='CHDMN9VPN|Shota|Suguru|Hirai|Okamura|reservations@nationalparkexpress.com|702-948-4190|グランドキャニオン.pdf|08/01/2027|2025年発行|Expiration Date|PDFを画像化'
if rg -n --glob '!scripts/check_public.sh' "$sensitive_pattern" .; then
  fail "sensitive private booking data found"
fi
ok "no known private booking data"

stale_trip_pattern='05:15[[:space:]]*\|[[:space:]]*起床|05:15.*起床|10:30-11:00集合|10:30-11:00|11:00荷物|11:00目安[[:space:]]*\|[[:space:]]*荷物|どこで徴収|カードでfee支払い|入場時カード払い|非米国居住者fee.*カード払い|非米国居住者fee.*カードで払|Grand Canyon fee.*カードで払|\$100/人.*カード払い|\$100/人.*カードで払|クレジットカード/デビットカード.*非米国居住者fee|非米国居住者fee用|ツアーページに預けて|連絡が来ると思う|未公開の詳細'
if rg -n --glob '!scripts/check_public.sh' "$stale_trip_pattern" README.md index.html docs/*.md .gitlab/**/*.md; then
  fail "stale trip logistics wording found"
fi
ok "no stale trip logistics wording"

public_context_pattern='GitHub|github|Spehe'
if rg -n --glob '!scripts/check_public.sh' "$public_context_pattern" README.md index.html docs/*.md .gitlab/**/*.md .gitlab-ci.yml; then
  fail "stale public context wording found"
fi
ok "no stale public context wording"

while IFS= read -r template; do
  rg -q '## 公開ルール' "$template" || fail "issue template missing public rule section: $template"
  rg -q 'confirmation-intake-form\.md' "$template" || fail "issue template missing intake form reminder: $template"
done < <(find .gitlab/issue_templates -type f -name '*.md' | sort)

while IFS= read -r template; do
  rg -q './scripts/build_public\.sh' "$template" || fail "MR template missing build_public check: $template"
  rg -q './scripts/check_public\.sh' "$template" || fail "MR template missing check_public check: $template"
  rg -q 'validate_public' "$template" || fail "MR template missing validate_public check: $template"
done < <(find .gitlab/merge_request_templates -type f -name '*.md' | sort)
ok "gitlab templates include public safety checks"

node --check app.js >/dev/null
node --check service-worker.js >/dev/null
node --check docs/reader.js >/dev/null
python3 -m json.tool manifest.webmanifest >/dev/null
ok "javascript and manifest syntax"

rg -q 'const CACHE_NAME = "wsop-2026-trip-guide-v[0-9]+";' service-worker.js || fail "service worker cache name must include numeric version"
ok "service worker cache name is versioned"
rg -q 'navigator\.serviceWorker\.register\("service-worker\.js"\)' app.js || fail "service worker registration missing from app.js"
ok "service worker registration exists"

python3 - <<'PY'
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs

manifest = json.loads(Path("manifest.webmanifest").read_text())
shortcut_docs = []
for shortcut in manifest.get("shortcuts", []):
    url = shortcut.get("url", "")
    parsed = urlparse(url)
    if parsed.scheme or parsed.netloc:
        continue
    target = Path(parsed.path or ".")
    if not target.exists():
        raise SystemExit(f"manifest shortcut target missing: {url}")
    doc = parse_qs(parsed.query).get("doc", [""])[0]
    if doc:
        shortcut_docs.append(doc)
    if doc and not Path("docs", doc).exists():
        raise SystemExit(f"manifest shortcut doc missing: docs/{doc}")
    for icon in shortcut.get("icons", []):
        src = icon.get("src", "")
        if src and not Path(src).exists():
            raise SystemExit(f"manifest shortcut icon missing: {src}")

expected_shortcut_docs = [
    "today-command.md",
    "confirmed-bookings.md",
    "daily-concierge.md",
    "sos-quick-card.md",
    "pocket-itinerary.md",
]
if shortcut_docs != expected_shortcut_docs:
    raise SystemExit("manifest shortcut docs changed: " + ", ".join(shortcut_docs))
PY
ok "manifest shortcuts exist"

rg -q 'Updated: [0-9]{4}-[0-9]{2}-[0-9]{2} JST' index.html || fail "missing updated date in index.html"
rg -q 'Updated: [0-9]{4}-[0-9]{2}-[0-9]{2} JST' docs/reader.html || fail "missing updated date in docs/reader.html"
ok "updated dates exist"

png_size() {
  python3 -c 'import struct, sys
path = sys.argv[1]
with open(path, "rb") as f:
    data = f.read(24)
if len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n" or data[12:16] != b"IHDR":
    raise SystemExit(f"{path} is not a valid PNG")
width, height = struct.unpack(">II", data[16:24])
print(f"{width}x{height}")' "$1"
}

icon_192_size="$(png_size assets/app-icon-192.png)"
icon_512_size="$(png_size assets/app-icon-512.png)"
[[ "$icon_192_size" == "192x192" ]] || fail "assets/app-icon-192.png must be 192x192"
[[ "$icon_512_size" == "512x512" ]] || fail "assets/app-icon-512.png must be 512x512"
ok "app icons are square"

python3 - <<'PY'
import posixpath
import re
from pathlib import Path
from urllib.parse import urlparse

sources = [
    "index.html",
    "offline.html",
    "styles.css",
    "docs/reader.html",
    "docs/reader.css",
    "manifest.webmanifest",
]
attr_re = re.compile(r'\b(?:src|href)=["\']([^"\']+)["\']')
url_re = re.compile(r'url\(([^)]+)\)')


def normalize_ref(raw):
    ref = raw.strip().strip('"\'')
    if not ref or ref.startswith("#"):
        return ""
    parsed = urlparse(ref)
    if parsed.scheme in {"http", "https", "mailto", "tel", "data"} or parsed.netloc:
        return ""
    path = parsed.path
    if path in {"", ".", "./"}:
        return ""
    return path


def resolve(source, ref):
    base = posixpath.dirname(source)
    return posixpath.normpath(posixpath.join(base, ref))


missing = []
out_of_sync = []
for source in sources:
    text = Path(source).read_text(encoding="utf-8")
    refs = [m.group(1) for m in attr_re.finditer(text)]
    refs.extend(m.group(1) for m in url_re.finditer(text))
    for raw_ref in refs:
        path = normalize_ref(raw_ref)
        if not path:
            continue
        target = resolve(source, path)
        if not Path(target).exists():
            missing.append(f"{source} -> {raw_ref}")
            continue
        public_target = Path("public", target)
        if not public_target.exists():
            missing.append(f"public/{target} from {source} -> {raw_ref}")
            continue
        if Path(target).is_file() and public_target.is_file():
            if Path(target).read_bytes() != public_target.read_bytes():
                out_of_sync.append(f"public/{target}")

if missing:
    raise SystemExit("missing static references:\n" + "\n".join(missing))
if out_of_sync:
    raise SystemExit("static references out of sync:\n" + "\n".join(sorted(set(out_of_sync))))
PY
ok "static html css asset references exist"

cmp -s index.html public/index.html || fail "public/index.html is out of sync"
cmp -s styles.css public/styles.css || fail "public/styles.css is out of sync"
cmp -s app.js public/app.js || fail "public/app.js is out of sync"
cmp -s manifest.webmanifest public/manifest.webmanifest || fail "public/manifest.webmanifest is out of sync"
cmp -s offline.html public/offline.html || fail "public/offline.html is out of sync"
cmp -s service-worker.js public/service-worker.js || fail "public/service-worker.js is out of sync"
cmp -s favicon.ico public/favicon.ico || fail "public/favicon.ico is out of sync"
cmp -s robots.txt public/robots.txt || fail "public/robots.txt is out of sync"
ok "public root files are in sync"

while IFS= read -r doc; do
  [[ -f "docs/$doc" ]] || fail "reader target missing: docs/$doc"
  [[ -f "public/docs/$doc" ]] || fail "public reader target missing: public/docs/$doc"
done < <(rg -o 'reader\.html\?doc=[^" ]+' index.html | sed 's/^reader\.html?doc=//' | sort -u)
ok "reader targets exist"

python3 - <<'PY'
import re
from pathlib import Path
from urllib.parse import parse_qs, urlparse

mobile_expected = ["#today", "#itinerary", "#bookings", "#sos"]
reader_expected = [
    "today-command.md",
    "confirmed-bookings.md",
    "sos-quick-card.md",
    "pocket-itinerary.md",
]


def dock_refs(source, pattern, label):
    match = re.search(pattern, source, re.S)
    if not match:
        raise SystemExit(f"{label} missing")
    return re.findall(r'href=["\']([^"\']+)["\']', match.group(1))

index_source = Path("index.html").read_text(encoding="utf-8")
mobile_refs = dock_refs(
    index_source,
    r'<nav class="mobile-dock"[^>]*>(.*?)</nav>',
    "mobile dock",
)
if mobile_refs != mobile_expected:
    raise SystemExit("mobile dock refs changed: " + ", ".join(mobile_refs))
for ref in mobile_refs:
    if f'id="{ref[1:]}"' not in index_source:
        raise SystemExit(f"mobile dock target missing: {ref}")

reader_refs = dock_refs(
    Path("docs/reader.html").read_text(encoding="utf-8"),
    r'<nav class="reader-dock"[^>]*>(.*?)</nav>',
    "reader dock",
)
reader_docs = []
for href in reader_refs:
    parsed = urlparse(href)
    doc = parse_qs(parsed.query).get("doc", [""])[0]
    if doc:
        reader_docs.append(doc)
if reader_docs != reader_expected:
    raise SystemExit("reader dock docs changed: " + ", ".join(reader_docs))
for doc in reader_docs:
    if not Path("docs", doc).is_file():
        raise SystemExit(f"reader dock doc missing: docs/{doc}")
    if not Path("public/docs", doc).is_file():
        raise SystemExit(f"reader dock public doc missing: public/docs/{doc}")
PY
ok "mobile and reader dock targets exist"

rg -q 'data-print-doc' docs/reader.html || fail "reader print button missing"
rg -q 'window\.print\(\)' docs/reader.js || fail "reader print handler missing"
rg -q '\.reader-actions' docs/reader.css || fail "reader print actions CSS missing"
rg -q 'grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);' docs/reader.css || fail "reader mobile print actions must fit two columns"
ok "reader print action exists"

rg -q 'grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);' docs/reader.css || fail "reader dock desktop columns must not overflow"
rg -q 'grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);' docs/reader.css || fail "reader dock mobile columns must fit two rows"
rg -q 'padding-bottom: 142px;' docs/reader.css || fail "reader mobile dock needs bottom padding"
ok "reader mobile dock layout exists"

python3 - <<'PY'
import re
from pathlib import Path

reader_js = Path("docs/reader.js").read_text()
docs = set(re.findall(r'"([a-z0-9-]+\.md)"', reader_js))
missing = sorted(doc for doc in docs if not Path("docs", doc).is_file())
if missing:
    raise SystemExit("reader.js references missing docs: " + ", ".join(missing))

for doc in sorted(docs):
    if not Path("public/docs", doc).is_file():
        raise SystemExit(f"reader.js public doc missing: public/docs/{doc}")

root_docs = {p.name for p in Path("docs").glob("*.md")}
untitled = sorted(
    doc for doc in root_docs
    if f'"{doc}":' not in reader_js and doc not in {"decisions.md", "planning-board.md", "trip-guide.md"}
)
if untitled:
    raise SystemExit("docs missing reader title entries: " + ", ".join(untitled))
PY
ok "reader js doc references exist"

while IFS=: read -r source line href; do
  case "$href" in
    http://*|https://*|mailto:*|tel:*|\#*|"") continue ;;
  esac
  target="${href%%#*}"
  target="${target%%\?*}"
  [[ -n "$target" ]] || continue
  if [[ "$source" == docs/* ]]; then
    base_dir="$(dirname "$source")"
  else
    base_dir="."
  fi
  [[ -e "$base_dir/$target" ]] || fail "broken local link in $source:$line -> $href"
done < <(rg -n -o '\[[^]]+\]\([^)]+\)' README.md docs/*.md | sed -E 's/^([^:]+):([0-9]+):.*\]\(([^)]+)\).*$/\1:\2:\3/')
ok "local markdown links exist"

while IFS= read -r source_doc; do
  public_doc="public/${source_doc}"
  [[ -f "$public_doc" ]] || fail "public doc missing: $public_doc"
  cmp -s "$source_doc" "$public_doc" || fail "$public_doc is out of sync"
done < <(find docs -type f | sort)
ok "public docs are in sync"

while IFS= read -r public_asset; do
  source_asset="${public_asset#public/}"
  [[ -f "$source_asset" ]] || fail "stale public asset without source: $public_asset"
  cmp -s "$source_asset" "$public_asset" || fail "$public_asset is out of sync"
done < <(find public/assets -type f | sort)
ok "public assets mirror source assets"

while IFS= read -r asset; do
  [[ -e "$asset" ]] || fail "service worker cache target missing: $asset"
  [[ -e "public/$asset" ]] || fail "public service worker cache target missing: public/$asset"
done < <(rg -o '"(assets/[^"]+|docs/[^"]+|offline\.html|manifest\.webmanifest|favicon\.ico|index\.html|styles\.css|app\.js)"' service-worker.js | tr -d '"')
ok "service worker cache targets exist"

while IFS= read -r doc; do
  rg -q "\"$doc\"" service-worker.js || fail "service worker cache missing doc: $doc"
done < <(find docs -maxdepth 1 -type f -name '*.md' | sort)
ok "service worker caches markdown docs"

printf 'All public checks passed.\n'
