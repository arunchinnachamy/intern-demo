---
description: Prepares the current changes for a pull request - summary, independent review, fixes, and a PR description.
disable-model-invocation: true
---

# PR prep

Run these steps in order.

1. **Summarize.** Use the `summarize-changes` skill to summarize the current diff.
2. **Review.** Hand the diff to the `code-reviewer` sub-agent. Give it a full brief: which files changed, what the change is meant to do, and what "done" looks like. It does not see this conversation.
3. **Fix.** Fix every item under "Must fix". Skip "Nice to have" unless it takes under a minute.
4. **Verify.** Run `npm test`. If anything fails, fix it and run the tests again.
5. **Describe.** Write a PR description:

```markdown
## What
One or two sentences.

## Why
One sentence.

## How it was checked
- Tests run
- Reviewer verdict
```

Never delete files with `rm -rf`. Use `npm run clean` for build output.
