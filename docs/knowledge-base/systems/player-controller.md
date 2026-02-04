# Player Controller System

## Overview

Tactical stealth movement using forked ecctrl + Rapier physics.

## Architecture

```
Input Layer (keyboard/gamepad)
    ↓
Player State (posture, speed tier)
    ↓
ecctrl Physics (capsule, forces)
    ↓
Visual Layer (mesh, animations)
```

## Speed Tiers

| Tier | Multiplier | Noise | Input |
|------|------------|-------|-------|
| CROUCH_SLOW | 0.3x | Silent | C + slow move |
| CROUCH_FAST | 0.5x | Quiet | C + normal move |
| WALK | 1.0x | Moderate | Normal move |
| SPRINT | 2.0x | Loud | Shift + move |

## Postures

| Posture | Capsule Height | Max Speed | Transition |
|---------|---------------|-----------|------------|
| Standing | 1.8m | Sprint | - |
| Crouching | 1.0m | Crouch Fast | 0.2s |
| Prone | 0.4m | Crouch Slow | 0.4s |

## ecctrl Modifications

### Key Changes from Base ecctrl

1. **Speed enum** instead of boolean `run`
2. **Posture state machine** with collider swapping
3. **Transition timing** for posture changes
4. **Noise emission** hooks for sound system

### Collider Swapping

Rapier colliders can't resize at runtime. Solution:
- Pre-create colliders for each posture
- Enable/disable based on current posture
- Sync position during swap

## Input Mapping

See `apps/proto-01-movement/AGENTS.md` for full mapping.

## Integration Points

- **Sound System**: Emits noise events based on speed + surface
- **Visibility System**: Posture affects silhouette size
- **Animation System**: Triggers based on state changes
