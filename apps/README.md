# Prototypes

This directory contains iterative prototypes for Echelon systems. Each prototype is a self-contained, freezable experiment.

## Iteration Strategy

We follow a **freeze-and-fork** approach:

1. **Build** - Create a focused prototype testing ONE system or mechanic
2. **Polish** - Get it to a "feels good" state with minimal scope creep
3. **Document** - Write a LEARNINGS.md capturing what worked, what didn't, key decisions
4. **Freeze** - Lock the prototype (no more changes)
5. **Fork** - Copy to new directory, layer on next system

## Naming Convention

```
proto-{number}-{system}[-{variant}]
```

Examples:
- `proto-01-movement` - Basic player movement
- `proto-02-light-shadow` - Light/shadow detection system
- `proto-03-movement-light` - Movement + light combined
- `proto-03-movement-light-v2` - Variant with different approach

## Prototype Structure

Each prototype should contain:

```
proto-XX-name/
├── package.json          # Dependencies for this prototype
├── src/
│   ├── index.tsx         # Entry point
│   └── ...               # Implementation
├── README.md             # What this prototype tests
├── LEARNINGS.md          # Post-completion: what we learned
└── FROZEN.md             # Created when frozen, explains final state
```

## Shared Code

If code proves useful across prototypes, extract it to `packages/`:

- `@echelon/game-core` - Core game loop, ECS setup
- `@echelon/stealth` - Stealth mechanics (visibility, sound)
- `@echelon/ai` - Enemy AI systems
- `@echelon/types` - Shared TypeScript types

## Current Prototypes

*None yet - starting from scratch!*

## Planned Prototype Sequence

1. **Movement** - Player controller with speed tiers, postures
2. **Light/Shadow** - Basic visibility system with light meter
3. **Sound Propagation** - Noise system with surface types
4. **Enemy Perception** - AI that responds to light/sound
5. **Patrol AI** - Basic patrol routes and investigation
6. **Integration** - Combine systems into playable stealth loop
