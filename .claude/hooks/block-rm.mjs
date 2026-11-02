#!/usr/bin/env node
// PreToolUse hook: deny `rm -rf` before it runs.
// Input arrives as JSON on stdin; we answer with a JSON decision on stdout.
let raw = "";
for await (const chunk of process.stdin) raw += chunk;

const command = JSON.parse(raw || "{}").tool_input?.command ?? "";

if (/\brm\s+-[a-zA-Z]*r[a-zA-Z]*f|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r/.test(command)) {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason:
          "rm -rf is blocked in this repo. Use `npm run clean` for build output.",
      },
    }),
  );
}
// No output + exit 0 = no decision; the normal permission flow applies.
process.exit(0);
