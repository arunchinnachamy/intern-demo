# intern-demo

The demo repo from **The Agent Intern** video *"Learn 80% of Claude Code Sub-agents, Skills and Hooks in 20 Minutes"*.

A tiny TypeScript cart API plus a complete Claude Code setup you can copy into your own project:

| What | Where | Job |
| --- | --- | --- |
| AGENTS.md | `AGENTS.md` | **Shared rules** – read by Codex, and by Claude Code through the import in CLAUDE.md |
| CLAUDE.md | `CLAUDE.md` | **Suggests** – `@AGENTS.md` on line one, plus Claude-only notes |
| Skill | `.claude/skills/summarize-changes/` | **Teaches** – summarizes your diff and flags risks |
| Skill | `.claude/skills/pr-prep/` | **Teaches** – the PR-prep crew conductor (`/pr-prep`) |
| Sub-agent | `.claude/agents/code-reviewer.md` | **Delegates** – read-only reviewer in its own context |
| Hook | `.claude/hooks/format.mjs` | **Enforces** – formats every file Claude edits |
| Hook | `.claude/hooks/block-rm.mjs` | **Enforces** – denies `rm -rf` |
| Hook config | `.claude/settings.json` | Wires both hooks up |

## Try it

```bash
npm install
npm test
claude            # then try: /summarize-changes  or  /pr-prep
```

Test the safety hook without Claude at all:

```bash
echo '{"tool_input":{"command":"ls"}}'          | node .claude/hooks/block-rm.mjs   # no output: allowed
echo '{"tool_input":{"command":"rm -rf dist"}}' | node .claude/hooks/block-rm.mjs   # prints a deny decision
```

## One rules file for Claude Code and Codex (`agents-md` branch)

Codex reads `AGENTS.md`. Claude Code reads `CLAUDE.md`, and only falls back to `AGENTS.md` when no `CLAUDE.md` exists. So the shared rules live in `AGENTS.md`, and `CLAUDE.md` starts with `@AGENTS.md`, which imports it.

Check each tool loaded it:

```bash
# Claude Code: run /context and look under Memory files, or ask for the test command
# Codex:
codex --ask-for-approval never "Summarize the current instructions."
```

## The one rule

**CLAUDE.md suggests, skills teach, sub-agents delegate, hooks enforce.**

Channel: ΔTheta, [youtube.com/@deltathetaai](https://www.youtube.com/@deltathetaai)
