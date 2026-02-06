import { GroupProps } from '@react-three/fiber'

export function PlayerModel(props: GroupProps) {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 0.72, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        <meshStandardMaterial color="#1c7ac9" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[0, 1.38, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#d8e7f7" roughness={0.6} metalness={0} />
      </mesh>
    </group>
  )
}
