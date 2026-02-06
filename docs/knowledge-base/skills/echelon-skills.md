# Echelon Skill Usage

## Default Skill Selection

- Use `r3f-fundamentals` for scene setup, frame loop, and camera wiring.
- Use `r3f-physics` for Rapier world setup, colliders, and rigid body behavior.
- Add domain-specific skills only when the task requires them.

## Selection Heuristic

1. Choose the smallest skill set that fully covers the task.
2. Prefer official/primary docs and local project docs over secondary summaries.
3. Record any reusable pattern discovered into `docs/knowledge-base/`.

## Current Baseline for Prototypes

- `r3f-fundamentals`
- `r3f-physics`
