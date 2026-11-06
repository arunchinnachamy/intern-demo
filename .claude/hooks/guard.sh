#!/usr/bin/env bash
# PreToolUse guard: block destructive commands before they run.
# Exit 2 + a reason on stderr = blocked. Exit 1 does NOT block.
command -v jq >/dev/null || { echo "guard.sh needs jq installed" >&2; exit 2; }

cmd=$(jq -r '.tool_input.command // empty')

if grep -Eq 'rm[[:space:]]+-[a-zA-Z]*(rf|fr)|git push[^|;&]*(--force|-f)[^|;&]*main' <<<"$cmd"; then
  echo "Blocked by project guard: use 'npm run clean' instead of rm -rf, and never force-push main." >&2
  exit 2
fi
exit 0
