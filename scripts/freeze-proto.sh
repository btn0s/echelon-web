#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: scripts/freeze-proto.sh <prototype-name>"
  echo "Example: scripts/freeze-proto.sh proto-01-movement"
  exit 1
fi

PROTO_NAME="$1"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROTO_DIR="$ROOT_DIR/apps/$PROTO_NAME"
LEARNINGS_FILE="$PROTO_DIR/LEARNINGS.md"
FROZEN_FILE="$PROTO_DIR/FROZEN.md"
APPS_README="$ROOT_DIR/apps/README.md"

if [[ ! -d "$PROTO_DIR" ]]; then
  echo "Prototype not found: $PROTO_NAME"
  exit 1
fi

if [[ ! -f "$LEARNINGS_FILE" ]]; then
  echo "Missing LEARNINGS.md in $PROTO_NAME"
  exit 1
fi

cat > "$FROZEN_FILE" <<MARKER
# FROZEN: $PROTO_NAME

Frozen on: $(date -u +"%Y-%m-%d %H:%M UTC")

This prototype is frozen and should not be modified directly.
Fork it into the next prototype for additional systems.
MARKER

if ! rg -q "\`$PROTO_NAME\`" "$APPS_README"; then
  {
    echo
    echo "- \`$PROTO_NAME\` - frozen on $(date -u +"%Y-%m-%d")"
  } >> "$APPS_README"
fi

echo "Prototype frozen: $PROTO_NAME"
echo "Created: $FROZEN_FILE"
