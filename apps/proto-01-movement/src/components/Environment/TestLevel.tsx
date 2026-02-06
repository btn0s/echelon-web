import { CuboidCollider, RigidBody } from '@react-three/rapier'

function Floor({ position, size }: { position: [number, number, number]; size: [number, number] }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[size[0] / 2, 0.15, size[1] / 2]} />
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <boxGeometry args={[size[0], 0.3, size[1]]} />
        <meshStandardMaterial color="#1a1f25" roughness={0.95} metalness={0} />
      </mesh>
    </RigidBody>
  )
}

function Wall({ position, size, color = '#2a3138' }: { position: [number, number, number]; size: [number, number, number]; color?: string }) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh castShadow receiveShadow position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </mesh>
    </RigidBody>
  )
}

function Steps() {
  return (
    <group>
      {Array.from({ length: 5 }, (_, i) => {
        const width = 2.6
        const depth = 1.1
        const height = 0.22
        return (
          <Wall
            key={`step-${i}`}
            position={[10 + i * depth * 0.9, height * 0.5 + i * height, -10]}
            size={[width, height, depth]}
            color="#2d3740"
          />
        )
      })}
    </group>
  )
}

export function TestLevel() {
  return (
    <group>
      <Floor position={[0, 0, 0]} size={[48, 48]} />

      <Wall position={[15, 1.5, 0]} size={[0.4, 3, 12]} />
      <Wall position={[11, 1.5, 0]} size={[0.4, 3, 12]} />

      <Wall position={[0, 0.7, 10]} size={[4, 1.4, 6]} color="#2f3d49" />
      <Wall position={[0, 1.35, 10]} size={[4, 0.25, 6]} color="#405362" />

      <Wall position={[-10, 0.75, 0]} size={[4, 1.5, 5.6]} color="#24303a" />
      <Wall position={[-10, 1.25, 0]} size={[4, 0.4, 5.6]} color="#415564" />

      <Wall position={[-10, 0.35, 10]} size={[4, 0.7, 5.6]} color="#202d38" />
      <Wall position={[-10, 0.52, 10]} size={[4, 0.34, 5.6]} color="#3f5564" />

      <RigidBody type="fixed" rotation={[0, 0, -Math.PI / 18]}>
        <mesh castShadow receiveShadow position={[0, 1.8, 18]}>
          <boxGeometry args={[4.2, 0.35, 8]} />
          <meshStandardMaterial color="#33414d" roughness={0.9} />
        </mesh>
      </RigidBody>

      <Steps />
    </group>
  )
}
