# Shared Packages

Reusable code extracted from prototypes. Only extract when:

1. Code is used by 2+ prototypes
2. The API has stabilized
3. It's truly reusable, not just similar

## Package Guidelines

- Keep packages focused and small
- Document public API thoroughly
- Include usage examples
- Maintain backward compatibility once used

## Planned Packages

### `@echelon/types`
Shared TypeScript types and interfaces.

### `@echelon/game-core`
Core game infrastructure:
- Game loop management
- ECS setup (bitECS or similar)
- Input handling
- Scene management

### `@echelon/stealth`
Stealth mechanics:
- Visibility calculation
- Light meter system
- Sound propagation
- Detection states

### `@echelon/ai`
Enemy AI systems:
- Behavior trees/state machines
- Patrol system
- Investigation behavior
- Alert propagation

### `@echelon/level`
Level tools:
- Navmesh utilities
- Spawn point management
- Objective system

## Extraction Process

1. Identify repeated code across prototypes
2. Design clean API (may differ from prototype implementation)
3. Create package with tests
4. Migrate prototypes to use package
5. Document breaking changes
