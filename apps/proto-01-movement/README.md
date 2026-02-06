# proto-01-movement

Movement feel prototype for Echelon.

## Scope

- 4 speed tiers: crouch-slow, crouch-fast, walk, sprint
- 3 postures: standing, crouching, prone
- Third-person camera with collision
- Movement test environment with corridors, ramps, low clearances, steps
- Debug UI (Leva + overlay)

## Run

```bash
pnpm install
pnpm --filter proto-01-movement dev
```

## Controls

- `WASD` / arrows: move
- `Shift`: sprint
- `C` / `Ctrl`: crouch toggle
- `Z`: prone toggle (from crouch)
- Mouse: camera orbit
