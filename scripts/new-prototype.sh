#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: pnpm create-proto <proto-name>"
  echo "Example: pnpm create-proto proto-02-light-shadow"
  exit 1
fi

PROTO_NAME="$1"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_DIR="$ROOT_DIR/packages/proto-template/template"
TARGET_DIR="$ROOT_DIR/apps/$PROTO_NAME"

if [[ ! -d "$TEMPLATE_DIR" ]]; then
  echo "Template directory not found: $TEMPLATE_DIR"
  exit 1
fi

if [[ -e "$TARGET_DIR" ]]; then
  echo "Target already exists: $TARGET_DIR"
  exit 1
fi

if [[ ! "$PROTO_NAME" =~ ^proto-[0-9]{2}-[a-z0-9-]+$ ]]; then
  echo "Invalid prototype name: $PROTO_NAME"
  echo "Expected format: proto-XX-name (example: proto-02-light-shadow)"
  exit 1
fi

cp -R "$TEMPLATE_DIR" "$TARGET_DIR"

find "$TARGET_DIR" -type f -print0 | xargs -0 perl -pi -e "s/__PROTO_NAME__/$PROTO_NAME/g"

echo "Created $TARGET_DIR"
echo "Next steps:"
echo "  1) pnpm install"
echo "  2) pnpm --filter $PROTO_NAME dev"
