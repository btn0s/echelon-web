# Pattern: R3F Game Architecture

## Goal

Keep prototype game loops readable, debuggable, and easy to fork.

## Recommended Layers

1. **Input layer**: map device input into semantic actions (`forward`, `crouch`, `prone`).
2. **State layer**: central, minimal state store (posture, speed tier, debug values).
3. **Simulation layer**: physics + movement controller.
4. **Presentation layer**: meshes, camera, HUD, debug controls.

## Folder Pattern

```text
src/
  App.tsx
  components/
  stores/
  systems/
  constants/
  types/
```

## Rules

- Keep movement/physics state in one store to avoid desync between controller and HUD.
- Prefer deterministic constants in `constants/` over ad-hoc magic values in components.
- Keep prototype-specific systems local to each app until used in 2+ prototypes.
