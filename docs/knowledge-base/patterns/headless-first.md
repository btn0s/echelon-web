# Headless-First Architecture

## Principle

Separate game logic from rendering. Logic should run without a renderer.

## Why

1. **Testable**: Unit test game logic without GPU
2. **Portable**: Core logic ports to Unity/Unreal
3. **Debuggable**: Step through systems without visual noise
4. **Performant**: Logic in systems, not scattered in components

## Pattern

```
┌─────────────────────────────────────────┐
│            Game Logic Layer             │
│  (Systems, State, Entities)             │
│  - No Three.js imports                  │
│  - No React imports (except hooks)      │
│  - Pure TypeScript                      │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│            View Layer                   │
│  (React components, R3F meshes)         │
│  - Reads from game state                │
│  - No game logic                        │
└─────────────────────────────────────────┘
```

## Implementation

### Systems (Logic Only)

```typescript
// systems/movementSystem.ts
// NO: import { useFrame } from '@react-three/fiber'
// NO: import * as THREE from 'three'

export function updateMovement(entity: Entity, dt: number) {
  entity.position.x += entity.velocity.x * dt
  entity.position.y += entity.velocity.y * dt
}

// React wrapper to call system
export const MovementSystem = () => {
  useFrame((_, dt) => {
    for (const entity of world.with('position', 'velocity')) {
      updateMovement(entity, dt)
    }
  })
  return null
}
```

### Views (Rendering Only)

```typescript
// views/CharacterView.tsx
export const CharacterView = ({ entity }: { entity: Entity }) => {
  // Only reads state, no logic
  return (
    <mesh position={[entity.position.x, entity.position.y, entity.position.z]}>
      <capsuleGeometry args={[0.3, entity.capsuleHeight]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
```

## Testing

```typescript
// Can test without renderer
describe('movementSystem', () => {
  it('updates position based on velocity', () => {
    const entity = { position: { x: 0, y: 0 }, velocity: { x: 1, y: 0 } }
    updateMovement(entity, 1.0)
    expect(entity.position.x).toBe(1)
  })
})
```

## Migration Path

When porting to Unity/Unreal:
1. Systems → MonoBehaviour.Update() / AActor::Tick()
2. Entity types → C# structs / UStructs
3. Views → completely rewritten for engine
