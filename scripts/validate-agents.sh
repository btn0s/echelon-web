#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS=0
REQUIRED=("## Purpose" "## Success Criteria" "## Scope")

while IFS= read -r file; do
  for section in "${REQUIRED[@]}"; do
    if ! rg -q "^${section}$" "$file"; then
      echo "[FAIL] $file missing section: $section"
      STATUS=1
    fi
  done
done < <(find "$ROOT_DIR/apps" -type f -name AGENTS.md | sort)

if [[ $STATUS -eq 0 ]]; then
  echo "All AGENTS.md files passed validation."
fi

exit $STATUS
