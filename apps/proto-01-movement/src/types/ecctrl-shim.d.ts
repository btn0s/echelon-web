declare module 'ecctrl' {
  import type { RapierRigidBody } from '@react-three/rapier'
  import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

  export interface EcctrlProps {
    children?: ReactNode
    maxVelLimit?: number
    sprintMult?: number
    capsuleHalfHeight?: number
    capsuleRadius?: number
    camInitDis?: number
    camMaxDis?: number
    camMinDis?: number
    camCollision?: boolean
    camCollisionOffset?: number
    camTargetPos?: { x: number; y: number; z: number }
    turnSpeed?: number
    springK?: number
    dampingC?: number
    autoBalanceSpringK?: number
    autoBalanceDampingC?: number
  }

  const Ecctrl: ForwardRefExoticComponent<EcctrlProps & RefAttributes<RapierRigidBody>>
  export default Ecctrl
}
