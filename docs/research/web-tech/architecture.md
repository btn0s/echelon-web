# Web-Based 3D Stealth Game Architecture

## Executive Summary

For building Splinter Cell-style stealth game prototypes on the web with future C++/C# portability in mind:

**Recommended Stack**: React Three Fiber + Rapier Physics + Miniplex ECS  
**Rationale**: Best balance of developer experience, performance, and architectural clarity for rapid prototyping while maintaining patterns that translate to traditional game engines.

---

## 1. Tech Stack Recommendations

### 1.1 Rendering: React Three Fiber (R3F)

**Why R3F over alternatives:**

The core principle of R3F game development is separating game logic from rendering. React components are views, not the source of truth.

**Advantages:**
- **Declarative 3D**: JSX makes scene composition intuitive
- **Ecosystem**: Drei helpers, post-processing, ready-made components
- **React integration**: Leverage React's component model for UI/HUD
- **Performance**: Direct Three.js access when needed, no overhead
- **Debugging**: React DevTools work for scene inspection

**vs Vanilla Three.js:**
- R3F adds minimal overhead (~6kb)
- Automatic memory management (cleanup on unmount)
- Better for rapid iteration

**vs PlayCanvas/Babylon.js:**
- More flexible architecture (not opinionated)
- Better TypeScript support
- Easier to port logic (ECS is separate from renderer)

### 1.2 Physics: Rapier

**Why Rapier:**
- **Performance**: Rust-based, compiled to WASM
- **Features**: Character controllers, CCD, sensors (critical for stealth)
- **Integration**: Official R3F bindings with React hooks
- **Deterministic**: Important for replays/networking later

**Stealth-specific features:**
- Sensor colliders for detection zones
- Raycasting for line-of-sight checks
- Character controller for smooth movement

### 1.3 ECS: Miniplex

**Why Miniplex over bitECS:**

| Feature | Miniplex | bitECS |
|---------|----------|--------|
| **DX** | Entities are plain objects | SoA arrays (harder to debug) |
| **TypeScript** | Excellent inference | Manual typing |
| **React** | Official bindings | Manual integration |
| **Learning curve** | Gentle | Steeper |
| **Performance** | Good enough for web | Faster (data-oriented) |

**For prototyping**: Miniplex wins on developer experience  
**For production**: bitECS if you need max performance (10k+ entities)

**Note**: Consider [Koota](https://github.com/hmans/koota) (Miniplex successor) for long-term projects.

---

## 2. Performance Patterns

### 2.1 Instancing & LOD

**Pattern for stealth games:**
- **Instanced props**: Rocks, crates, foliage (100s-1000s)
- **LOD for guards**: High-poly when close, low-poly at distance
- **Culling**: Frustum culling (automatic in Three.js) + manual occlusion

```tsx
// LOD pattern
const GuardModel = ({ distance }) => {
  const lod = distance < 10 ? 'high' : distance < 30 ? 'medium' : 'low'
  return <primitive object={models[lod]} />
}
```

### 2.2 Web Workers for AI/Physics

```tsx
// Main thread: Rendering only
// Worker thread: AI pathfinding, behavior trees

// worker.ts
self.onmessage = (e) => {
  const { guards, player } = e.data
  const decisions = guards.map(g => calculateAI(g, player))
  self.postMessage(decisions)
}
```

**Gotcha**: Rapier already runs in a worker (via WASM), don't double-wrap.

### 2.3 Memory Management

```tsx
// Automatic cleanup with R3F
const Model = () => {
  const gltf = useGLTF('/model.glb')
  return <primitive object={gltf.scene} />
  // Automatically disposed on unmount
}
```

**Stealth game specifics:**
- **Texture atlases**: Combine guard textures
- **Geometry sharing**: Reuse meshes across instances
- **Audio pooling**: Limit concurrent sounds (footsteps, etc.)

### 2.4 Asset Streaming

```tsx
// Lazy load levels
const Level2 = lazy(() => import('./levels/Level2'))

<Suspense fallback={<LoadingScreen />}>
  <Level2 />
</Suspense>
```

---

## 3. Stealth-Specific Architecture

### 3.1 Dynamic Lighting (Critical!)

**Challenge**: Real-time shadows are expensive on web.

**Solutions:**

1. **Baked lighting + dynamic shadows for player only**
2. **Light/shadow detection system**

```tsx
type Entity = {
  inShadow?: boolean
  lightLevel?: number  // 0-1
}

const LightingSystem = () => {
  useFrame(() => {
    for (const entity of world.with('position', 'isCharacter')) {
      entity.lightLevel = calculateLightAtPosition(entity.position)
      entity.inShadow = entity.lightLevel < 0.3
    }
  })
}
```

3. **Visibility cones** (cheaper than full lighting)
```tsx
// Use Rapier sensors for guard vision cones
<ConeCollider 
  args={[2, 5]}  // radius, height
  sensor
  onIntersectionEnter={(e) => guardSpotted(e)}
/>
```

### 3.2 Pathfinding/Navmesh

**Recommended approach:**

1. **Yuka.js** for navmesh generation
```tsx
import { NavMesh, AStar } from 'yuka'

const navMesh = new NavMesh()
navMesh.fromPolygons(levelGeometry)

const path = AStar.search(navMesh, start, goal)
```

2. **Alternative**: Recast Navigation (C++ library, WASM bindings)

**For prototyping**: Start with simple waypoint graphs, add navmesh later.

### 3.3 Sound Propagation

```tsx
type Entity = {
  soundEmitter?: { radius: number; volume: number }
  soundListener?: { hearingRange: number }
}

const SoundSystem = () => {
  useFrame(() => {
    for (const emitter of world.with('position', 'soundEmitter')) {
      for (const listener of world.with('position', 'soundListener')) {
        const distance = emitter.position.distanceTo(listener.position)
        if (distance < emitter.soundEmitter.radius) {
          listener.heardSound = true
        }
      }
    }
  })
}
```

**Advanced**: Raycasting for occlusion (walls block sound).

### 3.4 AI Behavior Trees

```tsx
type GuardState = 'patrol' | 'investigate' | 'chase' | 'search'

type GuardEntity = {
  aiState?: GuardState
  patrolPath?: Vector3[]
  target?: Entity
}

const GuardAISystem = () => {
  useFrame(() => {
    for (const guard of world.with('aiState', 'position')) {
      switch (guard.aiState) {
        case 'patrol':
          followPath(guard)
          if (canSeePlayer(guard)) guard.aiState = 'chase'
          break
        case 'chase':
          moveTowards(guard, guard.target)
          if (!canSeePlayer(guard)) guard.aiState = 'search'
          break
      }
    }
  })
}
```

---

## 4. Headless-First Architecture

```
┌─────────────────────────────────────────┐
│            Game Logic Layer             │
│  (Systems, ECS, World State, Entities)  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│            View Layer (optional)        │
│   React Three Fiber / DOM / Headless    │
└─────────────────────────────────────────┘
```

**Benefits:**
- **Testable**: Run game logic without renderer
- **Portable**: Core logic works in any engine
- **Debuggable**: Step through systems without GPU

**Implementation:**
```tsx
// System (pure logic)
const MovementSystem = () => {
  useFrame((_, dt) => {
    for (const e of world.with('position', 'velocity')) {
      e.position.x += e.velocity.x * dt
    }
  })
  return null
}

// View (rendering only)
const CharacterView = ({ entity }) => (
  <mesh position={[entity.position.x, entity.position.y, 0]}>
    <sphereGeometry />
  </mesh>
)
```

### ModelContainer Pattern

```tsx
// Smart wrapper - connects ECS to Three.js
const CharacterEntity = (entity: CharacterEntity) => (
  <ModelContainer entity={entity}>
    <CharacterModel />
  </ModelContainer>
)

// ModelContainer.tsx
const ModelContainer = ({ entity, children }) => {
  const ref = useRef<Object3D>()
  
  useEffect(() => {
    entity.three = ref.current  // Store Three.js ref on entity
    return () => { entity.three = null }
  }, [])
  
  return <group ref={ref}>{children}</group>
}
```

---

## 5. Monorepo Architecture

### Recommended Structure

```
echelon/
├── packages/
│   ├── core/              # Shared ECS, types, utilities
│   │   ├── src/
│   │   │   ├── ecs/       # Entity definitions, systems
│   │   │   ├── physics/   # Rapier wrappers
│   │   │   └── ai/        # Behavior trees, pathfinding
│   │   └── package.json
│   │
│   ├── renderer-r3f/      # R3F-specific rendering
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── systems/   # ThreeSystem (sync ECS → Three.js)
│   │   └── package.json
│   │
│   └── prototypes/
│       ├── prototype-01-movement/
│       ├── prototype-02-stealth/
│       └── prototype-03-ai/
│
├── pnpm-workspace.yaml
└── turbo.json
```

### Shared vs Copying

**Rule of thumb:**
- **Shared library** (`packages/core`): ECS definitions, physics logic, AI
- **Copy/fork**: Prototype-specific tweaks, experiments

**Why**: Prototypes should be independent. Don't let prototype-01 break prototype-03.

---

## 6. Key Gotchas

### Performance Gotchas

1. **Don't use `useFrame` in view components**
   - Put logic in systems
   - Views should only render

2. **Reuse queries**
   ```tsx
   // Define once at module scope
   const movingEntities = world.with('position', 'velocity')
   
   // Don't recreate every frame
   useFrame(() => {
     for (const e of movingEntities) { }
   })
   ```

3. **Physics in fixed timestep**
   ```tsx
   let accumulator = 0
   const FIXED_DT = 1/60
   
   useFrame((_, delta) => {
     accumulator += delta
     while (accumulator >= FIXED_DT) {
       physicsStep(FIXED_DT)
       accumulator -= FIXED_DT
     }
   })
   ```

### Smooth Interpolation

```tsx
// Frame-rate independent smoothing
const addSmoothExp = (current: number, target: number, speed: number, dt: number) =>
  (target - current) * (1 - Math.exp(-speed * dt))

useFrame((_, delta) => {
  camera.position.x += addSmoothExp(camera.position.x, target.x, 3, delta)
})

// Don't use lerp (frame-rate dependent)
// camera.position.lerp(target, 0.1)  // BAD
```

---

## 7. Portability to C++/C#

### Architecture Translation

| Web (R3F + Miniplex) | Unity (C#) | Unreal (C++) |
|---------------------|-----------|--------------|
| `World<Entity>` | ECS framework (Entities package) | Custom ECS or Gameplay Framework |
| `world.with('position', 'velocity')` | `EntityQuery` | `TArray<AActor*>` with filtering |
| `useFrame` | `Update()` | `Tick()` |
| Rapier | PhysX | Chaos |

### What Ports Easily

- **Game logic**: AI, pathfinding, state machines
- **Entity definitions**: Component structure
- **System architecture**: Update loops

### What Doesn't Port

- **Rendering code**: Completely different
- **Physics API**: Different but similar concepts

### Recommended Approach

1. **Keep core logic pure TypeScript**
   - No Three.js in systems
   - No React in game logic

2. **Document entity schemas**
   ```tsx
   // entities.ts - This translates directly to C# structs
   type Entity = {
     position: { x: number; y: number; z: number }
     health: { current: number; max: number }
     aiState: 'patrol' | 'chase' | 'search'
   }
   ```

3. **Use JSON for data**
   - Level layouts
   - AI parameters
   - Same files work in Unity/Unreal

---

## 8. Resources

**Essential Reading:**
- [verekia's r3f-gamedev](https://github.com/verekia/r3f-gamedev) - Architecture patterns
- [Miniplex docs](https://github.com/hmans/miniplex) - ECS fundamentals
- [react-three-rapier examples](https://github.com/pmndrs/react-three-rapier/tree/main/demo/src/examples)

**Reference Projects:**
- [FPS sample](https://github.com/icurtis1/fps-sample-project) - Character controller
- [Character controller sample](https://github.com/icurtis1/character-controller-sample-project) - Third-person

**Performance:**
- [Exponential smoothing](https://lisyarus.github.io/blog/posts/exponential-smoothing.html)
- [Lerp smoothing is broken](https://www.youtube.com/watch?v=LSNQuFEDOyQ)

---

## Conclusion

For Splinter Cell-style prototypes, **React Three Fiber + Rapier + Miniplex** provides the best balance of:
- **Developer experience**: Fast iteration, great debugging
- **Performance**: Good enough for web stealth games
- **Architecture**: Clean separation, portable to C++/C#
- **Ecosystem**: Mature tools, active community

Start with the headless-first architecture, implement stealth mechanics as ECS systems, and keep rendering separate. This approach will serve you well for rapid prototyping and future engine ports.
