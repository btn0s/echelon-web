import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'

export function App() {
  return (
    <Canvas camera={{ position: [5, 5, 6], fov: 50 }}>
      <color attach="background" args={['#0f141c']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      <Physics>
        <RigidBody type="fixed">
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#1f2731" />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  )
}
