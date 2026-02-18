#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKFLOW_DIR="$(dirname "$SCRIPT_DIR")"

cd "$WORKFLOW_DIR"

# Compile TypeScript config to JavaScript
bunx tsc "$SCRIPT_DIR/config.ts" --outDir "$SCRIPT_DIR" --esModuleInterop --module ESNext --moduleResolution bundler 2>/dev/null || true

export SMITHERS_PROJECT="$SCRIPT_DIR/config.js"

# Check for existing runs
EXISTING=$(bunx smithers list 2>/dev/null | grep -E "running|cancelled" | head -1 || true)
if [[ -n "$EXISTING" ]]; then
    echo "Found existing run: $EXISTING"
    read -p "Resume (r), Discard (d), or Cancel (c)? " choice
    case "$choice" in
        r|R) bunx smithers resume ;;
        d|D) bunx smithers discard && bunx smithers run workflow.tsx ;;
        c|C) exit 0 ;;
        *) echo "Invalid choice"; exit 1 ;;
    esac
else
    bunx smithers run workflow.tsx
fi
