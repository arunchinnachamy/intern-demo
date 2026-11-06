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
| Hook | `.claude/hooks/guard.sh` | **Enforces** – blocks `rm -rf` and force-pushing main (exit 2) |
| Settings | `.claude/settings.json` | Permission rules (allow / ask / deny) and both hooks |
| Sandbox | `examples/laptop-settings.json` | Sandbox settings for `~/.claude/settings.json` on your own machine |

## Try it

```bash
npm install
npm test
claude            # then try: /summarize-changes  or  /pr-prep
```

Test the safety hook without Claude at all:

```bash
echo '{"tool_input":{"command":"ls"}}'          | bash .claude/hooks/guard.sh; echo $?   # 0: allowed
echo '{"tool_input":{"command":"rm -rf dist"}}' | bash .claude/hooks/guard.sh; echo $?   # 2: blocked
```

## The one rule

**CLAUDE.md suggests, skills teach, sub-agents delegate, hooks enforce.**

Channel: [youtube.com/@theagentintern](https://www.youtube.com/@theagentintern)

## ΔTheta: "Your AI Coding Agent Needs a Leash" (`leash` branch)

The four layers from the video:

1. **Permission rules** in `.claude/settings.json`: allow the safe commands, ask before `git push`, deny reading `.env`, secrets and keys, deny `curl`/`wget`.
2. **Sandbox**: copy `examples/laptop-settings.json` into `~/.claude/settings.json`. `failIfUnavailable` makes Claude Code stop instead of running unprotected.
3. **Hook**: `.claude/hooks/guard.sh` runs before every Bash command and exits 2 to block.
4. **Approvals**: run `/auto-mode-setup` and use auto mode on top of the other three, never instead of them.

The `.env` here holds fake demo values and is committed only so the deny rule has something to block.

Channel: ΔTheta (@deltathetaai)
