# Proto-01 Movement: Execution Plan

> Step-by-step implementation guide for AI agents.

---

## Phase 1: Project Setup (Day 1)

### 1.1 Initialize Package

```bash
cd apps/proto-01-movement
pnpm init
```

**package.json dependencies:**
```json
{
  "dependencies": {
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "@react-three/rapier": "^1.2.0",
    "ecctrl": "^1.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "zustand": "^4.4.0",
    "leva": "^0.9.35"
  },
  "devDependencies": {
    "@types/three": "^0.160.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

### 1.2 Create Directory Structure

```
proto-01-movement/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Player/
│   │   │   ├── index.tsx
│   │   │   ├── PlayerController.tsx
│   │   │   └── usePlayerState.ts
│   │   ├── Environment/
│   │   │   └── TestLevel.tsx
│   │   └── Debug/
│   │       └── DebugPanel.tsx
│   ├── systems/
│   │   └── inputSystem.ts
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── movement.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── AGENTS.md
└── EXECUTION_PLAN.md
```

### 1.3 Validation

- [ ] `pnpm install` succeeds
- [ ] `pnpm dev` starts Vite server
- [ ] Empty R3F canvas renders

---

## Phase 2: Basic Movement (Day 1-2)

### 2.1 Integrate ecctrl

```tsx
// src/components/Player/index.tsx
import Ecctrl from 'ecctrl'
import { KeyboardControls } from '@react-three/drei'

const keyboardMap = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'leftward', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'rightward', keys: ['KeyD', 'ArrowRight'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['ShiftLeft'] },
]

export const Player = () => (
  <KeyboardControls map={keyboardMap}>
    <Ecctrl>
      <mesh>
        <capsuleGeometry args={[0.3, 1.0]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </Ecctrl>
  </KeyboardControls>
)
```

### 2.2 Add Test Floor

```tsx
// src/components/Environment/TestLevel.tsx
import { RigidBody } from '@react-three/rapier'

export const TestLevel = () => (
  <RigidBody type="fixed">
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#444" />
    </mesh>
  </RigidBody>
)
```

### 2.3 Validation

- [ ] Character moves with WASD
- [ ] Camera follows character
- [ ] No physics glitches on flat ground

---

## Phase 3: Speed Tiers (Day 2-3)

### 3.1 Define Constants

```typescript
// src/constants/movement.ts
export enum MovementSpeed {
  CROUCH_SLOW = 0.3,
  CROUCH_FAST = 0.5,
  WALK = 1.0,
  SPRINT = 2.0,
}

export const MOVEMENT_CONFIG = {
  baseSpeed: 2.5,
  speeds: MovementSpeed,
}
```

### 3.2 Create Player State Store

```typescript
// src/components/Player/usePlayerState.ts
import { create } from 'zustand'
import { MovementSpeed } from '../../constants/movement'

type Posture = 'standing' | 'crouching' | 'prone'

interface PlayerState {
  posture: Posture
  speedTier: MovementSpeed
  setPosture: (p: Posture) => void
  setSpeedTier: (s: MovementSpeed) => void
}

export const usePlayerState = create<PlayerState>((set) => ({
  posture: 'standing',
  speedTier: MovementSpeed.WALK,
  setPosture: (posture) => set({ posture }),
  setSpeedTier: (speedTier) => set({ speedTier }),
}))
```

### 3.3 Fork ecctrl (or Wrap)

**Option A: Wrap ecctrl** (simpler, start here)
```tsx
// Override maxVelLimit based on speedTier
const speedMultiplier = usePlayerState((s) => s.speedTier)
<Ecctrl maxVelLimit={2.5 * speedMultiplier}>
```

**Option B: Fork ecctrl** (more control, if needed)
- Clone pmndrs/ecctrl
- Modify `src/Ecctrl.tsx` to accept speedTier enum
- Publish as `@echelon/ecctrl` in packages/

### 3.4 Add Crouch/Sprint Input

```typescript
// Add to keyboard map
{ name: 'crouch', keys: ['KeyC', 'ControlLeft'] },
{ name: 'sprint', keys: ['ShiftLeft'] },
```

### 3.5 Validation

- [ ] Walk speed is default
- [ ] Shift makes character sprint (faster)
- [ ] C makes character crouch (slower)
- [ ] Each speed tier feels distinct

---

## Phase 4: Posture System (Day 3-4)

### 4.1 Posture State Machine

```typescript
// Valid transitions
const POSTURE_TRANSITIONS = {
  standing: ['crouching'],
  crouching: ['standing', 'prone'],
  prone: ['crouching'],
}

// Transition times (seconds)
const TRANSITION_TIMES = {
  'standing->crouching': 0.2,
  'crouching->standing': 0.2,
  'crouching->prone': 0.4,
  'prone->crouching': 0.4,
}
```

### 4.2 Capsule Height by Posture

```typescript
const CAPSULE_CONFIG = {
  standing: { halfHeight: 0.5, radius: 0.3 },   // ~1.8m total
  crouching: { halfHeight: 0.2, radius: 0.3 },  // ~1.0m total
  prone: { halfHeight: 0.05, radius: 0.25 },    // ~0.4m total
}
```

### 4.3 Implement Collider Swap

**Challenge**: Rapier colliders can't resize at runtime.

**Solution**: Multiple collider approach
```tsx
const PlayerColliders = ({ posture }) => (
  <>
    <CapsuleCollider 
      args={[CAPSULE_CONFIG.standing.halfHeight, CAPSULE_CONFIG.standing.radius]}
      sensor={posture !== 'standing'}
    />
    <CapsuleCollider 
      args={[CAPSULE_CONFIG.crouching.halfHeight, CAPSULE_CONFIG.crouching.radius]}
      sensor={posture !== 'crouching'}
    />
    <CapsuleCollider 
      args={[CAPSULE_CONFIG.prone.halfHeight, CAPSULE_CONFIG.prone.radius]}
      sensor={posture !== 'prone'}
    />
  </>
)
```

### 4.4 Add Transition Animation

```typescript
// Smooth height transition during posture change
const [displayHeight, setDisplayHeight] = useState(1.8)
useFrame((_, dt) => {
  const targetHeight = CAPSULE_CONFIG[posture].halfHeight * 2 + CAPSULE_CONFIG[posture].radius * 2
  setDisplayHeight(THREE.MathUtils.lerp(displayHeight, targetHeight, dt * 5))
})
```

### 4.5 Validation

- [ ] C toggles crouch (standing ↔ crouching)
- [ ] Z from crouch goes prone
- [ ] Z from prone returns to crouch
- [ ] Transitions have slight delay (not instant)
- [ ] Camera height follows posture

---

## Phase 5: Test Environment (Day 4-5)

### 5.1 Environment Geometry

```tsx
// src/components/Environment/TestLevel.tsx
export const TestLevel = () => (
  <group>
    {/* Flat area */}
    <Floor position={[0, 0, 0]} size={[20, 20]} />
    
    {/* Corridor */}
    <Corridor position={[15, 0, 0]} width={2} length={10} />
    
    {/* Ramp */}
    <Ramp position={[0, 0, 10]} angle={15} length={5} />
    
    {/* Low obstacle (crouch only) */}
    <LowCeiling position={[-10, 0, 0]} height={1.2} />
    
    {/* Vent (prone only) */}
    <Vent position={[-10, 0, 10]} height={0.5} />
    
    {/* Steps */}
    <Steps position={[10, 0, -10]} count={5} />
  </group>
)
```

### 5.2 Validation Scenarios

| Scenario | Test | Expected |
|----------|------|----------|
| Flat ground | Walk, run, crouch | Smooth movement |
| Corridor | Navigate without bumping | Tight control |
| Ramp | Walk up/down | No sliding |
| Low ceiling | Approach standing | Blocked |
| Low ceiling | Approach crouched | Pass through |
| Vent | Approach crouched | Blocked |
| Vent | Approach prone | Pass through |
| Steps | Walk up | Smooth climb |

---

## Phase 6: Debug UI (Day 5)

### 6.1 Leva Debug Panel

```tsx
import { useControls, folder } from 'leva'

export const DebugPanel = () => {
  const playerState = usePlayerState()
  
  useControls({
    State: folder({
      posture: { value: playerState.posture, editable: false },
      speed: { value: playerState.speedTier, editable: false },
    }),
    Tuning: folder({
      baseSpeed: { value: 2.5, min: 1, max: 5, step: 0.1 },
      sprintMult: { value: 2.0, min: 1, max: 3, step: 0.1 },
      crouchMult: { value: 0.5, min: 0.1, max: 1, step: 0.1 },
    }),
  })
  
  return null
}
```

### 6.2 On-Screen HUD

```tsx
// Simple HTML overlay showing current state
<div className="fixed top-4 left-4 bg-black/50 text-white p-2 font-mono text-sm">
  <div>Posture: {posture}</div>
  <div>Speed: {speedTier}</div>
  <div>FPS: {fps}</div>
</div>
```

---

## Phase 7: Polish & Documentation (Day 5-6)

### 7.1 Feel Tuning

- Adjust `springK`, `dampingC` for weight
- Tune acceleration curves for responsiveness
- Adjust camera smoothing

### 7.2 Gamepad Support

```typescript
// Add gamepad handling
// Left stick → movement direction + speed (analog)
// B button → crouch toggle
// L3 → sprint toggle
```

### 7.3 Write LEARNINGS.md

Document:
- What ecctrl settings worked best
- Any unexpected physics behavior
- Posture transition timing that felt good
- Recommendations for next prototype

### 7.4 Final Validation

- [ ] All speed tiers feel distinct
- [ ] All postures work with smooth transitions
- [ ] Keyboard controls feel good
- [ ] Gamepad controls feel good
- [ ] 60fps on mid-range hardware
- [ ] No physics jank in test environment
- [ ] LEARNINGS.md complete

---

## Agent Instructions

### When Working on This Prototype

1. **Load skills**: `r3f-fundamentals`, `r3f-physics`
2. **Read first**: This file, then `AGENTS.md`
3. **Stay in scope**: Movement only, no enemies/stealth
4. **Use Leva**: For quick iteration on values
5. **Test frequently**: Run after each change

### Delegation Pattern

```typescript
// For implementation work
delegate_task(
  category="visual-engineering",
  load_skills=["r3f-fundamentals", "r3f-physics"],
  prompt="Implement Phase 3 (Speed Tiers) for proto-01-movement. 
         Follow EXECUTION_PLAN.md section 3.1-3.5.
         Validate each checkpoint before proceeding."
)
```

### When Stuck

1. Check `docs/knowledge-base/references/ecctrl-api.md`
2. Check `docs/research/web-tech/architecture.md`
3. Consult Oracle for physics/architecture questions
