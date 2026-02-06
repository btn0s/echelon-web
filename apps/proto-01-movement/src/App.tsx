import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Leva } from 'leva'
import { Player } from './components/Player'
import { TestLevel } from './components/Environment/TestLevel'
import { DebugUI } from './components/Debug/DebugUI'
import { DebugPanel } from './components/Debug/DebugPanel'
import { FpsTracker } from './components/Debug/FpsTracker'

export function App() {
  return (
    <div className="app-shell">
      <Canvas
        shadows
        camera={{ position: [8, 6, 8], fov: 55, near: 0.1, far: 300 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0a0d12']} />
        <fog attach="fog" args={['#0a0d12', 30, 110]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          castShadow
          intensity={1.15}
          position={[9, 12, 4]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={60}
          shadow-camera-top={18}
          shadow-camera-right={18}
          shadow-camera-bottom={-18}
          shadow-camera-left={-18}
        />

        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]} colliders={false} timeStep={1 / 60}>
            <Player />
            <TestLevel />
            <FpsTracker />
          </Physics>
        </Suspense>
      </Canvas>

      <DebugUI />
      <DebugPanel />
      <Leva collapsed />
    </div>
  )
}
