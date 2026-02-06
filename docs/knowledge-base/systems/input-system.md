# Input System

## Objective

Normalize keyboard and gamepad input into shared gameplay actions so systems do not depend on raw device APIs.

## Action Set (Movement Prototype)

- `forward`
- `backward`
- `leftward`
- `rightward`
- `run`
- `crouch`
- `prone`
- `jump`

## Design Notes

- Use semantic actions, not key codes, in gameplay code.
- Keep key/gamepad mapping data-driven in `src/systems/inputSystem.ts`.
- Preserve consistent action semantics across prototypes to reduce relearning.

## Prototype 01 Mapping

See `apps/proto-01-movement/src/systems/inputSystem.ts`.
