# Proto-01: Movement System

## Purpose

Validate core player movement for a Splinter Cell-style stealth game. This prototype focuses ONLY on movement feel - no enemies, no stealth detection, no objectives.

## Success Criteria

- [ ] Movement feels **precise and deliberate**, not floaty or twitchy
- [ ] Speed tiers are **distinct and meaningful** (each tier should feel different)
- [ ] Posture changes feel **responsive but not instant** (slight transition time)
- [ ] Player can navigate tight spaces confidently
- [ ] Controls feel good on both keyboard and gamepad

## Scope

### In Scope
- Player character with capsule collider
- 4 speed tiers: crouch-slow, crouch-fast, walk, sprint
- 3 postures: standing, crouching, prone
- Third-person camera with collision
- Basic test environment (corridors, ramps, obstacles)
- Movement sound feedback (footstep audio cues)

### Out of Scope
- Enemies / AI
- Light/shadow detection
- Stealth mechanics
- Gadgets or abilities
- Combat
- UI beyond debug info

## Tech Stack

- React Three Fiber
- @react-three/rapier (physics)
- ecctrl (forked/customized for stealth)
- Zustand (local state, may migrate to ECS later)

## Key Design Decisions

### Speed Tiers

| Tier | Speed Mult | Noise Level | Use Case |
|------|------------|-------------|----------|
| Crouch-Slow | 0.3x | Silent | Maximum stealth |
| Crouch-Fast | 0.5x | Quiet | Stealth with urgency |
| Walk | 1.0x | Moderate | Default movement |
| Sprint | 2.0x | Loud | Emergency only |

### Postures

| Posture | Height | Speed Cap | Notes |
|---------|--------|-----------|-------|
| Standing | 100% | Sprint | Default |
| Crouching | 60% | Crouch-Fast | Under obstacles, quieter |
| Prone | 30% | Crouch-Slow | Vents, maximum concealment |

### Controls (Keyboard)

| Action | Key | Notes |
|--------|-----|-------|
| Move | WASD | Direction |
| Sprint | Shift (hold) | While moving |
| Crouch | C (toggle) | Or Ctrl hold |
| Prone | Z (toggle) | From crouch only |
| Camera | Mouse | Look around |

### Controls (Gamepad)

| Action | Input | Notes |
|--------|-------|-------|
| Move | Left Stick | Analog speed control |
| Sprint | L3 (click stick) | Toggle |
| Crouch | B / Circle | Toggle |
| Prone | B (hold) | From crouch |
| Camera | Right Stick | Look around |

## Test Environment Requirements

1. **Flat area** - Baseline movement testing
2. **Corridors** - Tight space navigation
3. **Ramps/stairs** - Slope handling
4. **Low obstacles** - Crouch-only passages
5. **Vents** - Prone-only passages
6. **Height variations** - Ledges, drops

## Implementation Notes

### ecctrl Modifications Needed

1. **Posture system** - Collider height swapping
2. **Speed tiers** - Replace binary run with enum
3. **Analog speed** - Gamepad stick magnitude → speed
4. **Transition timing** - Slight delay on posture changes

### File Structure

```
proto-01-movement/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Player/
│   │   │   ├── PlayerController.tsx  # Modified ecctrl
│   │   │   ├── PlayerModel.tsx       # Placeholder capsule
│   │   │   └── usePlayerInput.ts     # Input handling
│   │   ├── Environment/
│   │   │   └── TestLevel.tsx         # Test geometry
│   │   └── Debug/
│   │       └── DebugUI.tsx           # Speed/posture display
│   └── stores/
│       └── usePlayerStore.ts         # Player state
├── package.json
├── AGENTS.md                         # This file
└── LEARNINGS.md                      # Post-completion insights
```

## Questions to Answer

1. Does ecctrl's spring-based physics feel right for tactical movement?
2. What transition times feel best for posture changes?
3. How does analog stick input map to speed tiers?
4. What's the right camera distance/angle for stealth gameplay?
5. Does prone movement feel useful or tedious?

## Definition of Done

- [ ] All speed tiers implemented and feel distinct
- [ ] All postures implemented with smooth transitions
- [ ] Keyboard + gamepad controls working
- [ ] Test environment covers all movement scenarios
- [ ] LEARNINGS.md documents findings and recommendations
- [ ] No major physics jank or edge cases
