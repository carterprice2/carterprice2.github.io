#!/usr/bin/env bash
# Regenerates public/resume.pdf from the /resume page.
#
# The résumé's content lives in src/data/experience.ts, so the PDF is a
# derived artifact — re-run this after editing that file, then commit the PDF.
# Committed rather than built in CI so the deploy needs no browser.
#
# Usage: ./scripts/make-resume-pdf.sh
set -euo pipefail

cd "$(dirname "$0")/.."

BROWSE="${BROWSE:-$HOME/.claude/skills/gstack/browse/dist/browse}"
PORT="${PORT:-4399}"

if [ ! -x "$BROWSE" ]; then
  echo "error: gstack browse not found at $BROWSE" >&2
  echo "       set BROWSE=/path/to/browse, or print /resume to PDF by hand." >&2
  exit 1
fi

echo "Building…"
pnpm build >/dev/null

pnpm preview --port "$PORT" >/tmp/resume-pdf-preview.log 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

# Wait for the preview server rather than sleeping a fixed amount.
for _ in $(seq 1 30); do
  if curl -sf -o /dev/null "http://localhost:$PORT/resume/"; then break; fi
  sleep 0.5
done

"$BROWSE" goto "http://localhost:$PORT/resume/" >/dev/null
"$BROWSE" pdf public/resume.pdf --format letter --margins 0.6in

echo "Wrote public/resume.pdf"
