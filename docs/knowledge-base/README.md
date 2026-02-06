# Knowledge Base

Quick-reference documents for agents working on Echelon. These are **internal patterns and decisions**, not reusable skills.

## Structure

```
knowledge-base/
├── systems/       # How our game systems work
├── patterns/      # Code patterns we use
├── references/    # External API quick-refs
└── skills/        # Agent skill usage conventions
```

## When to Reference

- **Before implementing**: Check if pattern exists
- **When stuck**: Look for similar solved problems
- **After implementing**: Add new patterns discovered

## vs Other Docs

| Location | Content |
|----------|---------|
| `docs/research/` | External research (SC mechanics, theory) |
| `docs/knowledge-base/` | Our internal patterns and decisions |
| `docs/design/` | Game design specs |
| `apps/*/AGENTS.md` | Prototype-specific scope |
