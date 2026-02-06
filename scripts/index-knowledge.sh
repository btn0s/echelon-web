#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_FILE="$ROOT_DIR/docs/INDEX.md"

{
  echo "# Documentation Index"
  echo
  echo "Generated: $(date -u +"%Y-%m-%d %H:%M UTC")"
  echo

  echo "## Research"
  echo
  find "$ROOT_DIR/docs/research" -type f -name '*.md' | sort | sed "s|$ROOT_DIR/|- |"
  echo

  echo "## Knowledge Base"
  echo
  find "$ROOT_DIR/docs/knowledge-base" -type f -name '*.md' | sort | sed "s|$ROOT_DIR/|- |"
  echo

  echo "## Plans"
  echo
  find "$ROOT_DIR/docs/plans" -type f -name '*.md' | sort | sed "s|$ROOT_DIR/|- |"
  echo

  echo "## Prototypes"
  echo
  find "$ROOT_DIR/apps" -maxdepth 2 -type f \( -name 'AGENTS.md' -o -name 'README.md' -o -name 'LEARNINGS.md' -o -name 'EXECUTION_PLAN.md' \) | sort | sed "s|$ROOT_DIR/|- |"
} > "$OUT_FILE"

echo "Wrote $OUT_FILE"
