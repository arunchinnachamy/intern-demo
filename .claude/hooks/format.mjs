#!/usr/bin/env node
// PostToolUse hook: format whatever file Claude just edited or wrote.
import { execFileSync } from "node:child_process";

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

const file = JSON.parse(raw || "{}").tool_input?.file_path;
if (file && /\.(ts|js|mjs|json|md)$/.test(file)) {
  try {
    execFileSync("npx", ["--no-install", "prettier", "--write", file], {
      stdio: "ignore",
    });
  } catch {
    // Formatting is best-effort; never block the edit (exit 0).
  }
}
process.exit(0);
