# intern-demo

The demo repo from **The Agent Intern** video *"Learn 80% of Claude Code Sub-agents, Skills and Hooks in 20 Minutes"*.

A tiny TypeScript cart API plus a complete Claude Code setup you can copy into your own project:

| What | Where | Job |
| --- | --- | --- |
| CLAUDE.md | `CLAUDE.md` | **Suggests** – always-true house rules (kept short on purpose) |
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

## The one rule

**CLAUDE.md suggests, skills teach, sub-agents delegate, hooks enforce.**

Channel: [youtube.com/@theagentintern](https://www.youtube.com/@theagentintern)
