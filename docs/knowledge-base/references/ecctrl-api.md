# ecctrl Quick Reference

## Source

https://github.com/pmndrs/ecctrl

## Installation

```bash
pnpm add ecctrl @react-three/rapier
```

## Basic Usage

```tsx
import Ecctrl, { EcctrlAnimation } from 'ecctrl'

<Ecctrl>
  <YourCharacterModel />
</Ecctrl>
```

## Key Props

### Movement

| Prop | Default | Description |
|------|---------|-------------|
| `maxVelLimit` | 2.5 | Base movement speed |
| `sprintMult` | 2 | Sprint speed multiplier |
| `turnSpeed` | 15 | Rotation speed |
| `turnVelMultiplier` | 0.2 | Turn velocity factor |
| `moveImpulsePointY` | 0.5 | Impulse application height |

### Physics

| Prop | Default | Description |
|------|---------|-------------|
| `capsuleHalfHeight` | 0.35 | Half-height of capsule |
| `capsuleRadius` | 0.3 | Capsule radius |
| `springK` | 1.2 | Spring constant |
| `dampingC` | 0.08 | Damping coefficient |
| `autoBalanceSpringK` | 0.3 | Auto-balance spring |
| `autoBalanceDampingC` | 0.02 | Auto-balance damping |

### Camera

| Prop | Default | Description |
|------|---------|-------------|
| `camInitDis` | -5 | Initial camera distance |
| `camMaxDis` | -7 | Max camera distance |
| `camMinDis` | -0.7 | Min camera distance |
| `camTargetPos` | {x:0,y:0,z:0} | Camera target offset |

## Keyboard Map

```tsx
const keyboardMap = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'leftward', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'rightward', keys: ['KeyD', 'ArrowRight'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['ShiftLeft'] },
]
```

## Animation Integration

```tsx
<Ecctrl>
  <EcctrlAnimation
    characterURL="/model.glb"
    animationSet={{
      idle: 'Idle',
      walk: 'Walk',
      run: 'Run',
      jump: 'Jump',
      jumpIdle: 'JumpIdle',
      jumpLand: 'JumpLand',
      fall: 'Fall',
    }}
  />
</Ecctrl>
```

## Forking Notes

For stealth game, we need to modify:

1. **src/Ecctrl.tsx** line ~1141: Replace `run` boolean with speed enum
2. **src/Ecctrl.tsx** line ~54-55: Make capsule dimensions dynamic for postures
3. **src/stores/useGame.ts**: Add posture state to store
4. Add transition timing logic for posture changes
