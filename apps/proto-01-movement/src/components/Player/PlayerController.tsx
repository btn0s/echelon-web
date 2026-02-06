import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import Ecctrl from 'ecctrl'
import { usePlayerStore } from '../../stores/usePlayerStore'
import { BASE_MAX_VELOCITY, POSTURE_HEIGHT, SPEED_MULTIPLIER } from '../../constants/movement'
import type { ControlName } from '../../systems/inputSystem'
import { PlayerModel } from './PlayerModel'

function getSpeedTier(posture: 'standing' | 'crouching' | 'prone', sprint: boolean) {
  if (posture === 'prone') {
    return 'crouchSlow' as const
  }

  if (posture === 'crouching') {
    return sprint ? ('crouchFast' as const) : ('crouchSlow' as const)
  }

  return sprint ? ('sprint' as const) : ('walk' as const)
}

export function PlayerController() {
  const crouchPrev = useRef(false)
  const pronePrev = useRef(false)

  const crouch = useKeyboardControls<ControlName>((state) => state.crouch)
  const prone = useKeyboardControls<ControlName>((state) => state.prone)
  const run = useKeyboardControls<ControlName>((state) => state.run)

  const posture = usePlayerStore((state) => state.posture)
  const isTransitioning = usePlayerStore((state) => state.isTransitioning)
  const requestPosture = usePlayerStore((state) => state.requestPosture)
  const setSpeedTier = usePlayerStore((state) => state.setSpeedTier)

  const speedTier = useMemo(() => getSpeedTier(posture, run), [posture, run])

  const capsule = POSTURE_HEIGHT[posture]
  const maxVelLimit = BASE_MAX_VELOCITY * SPEED_MULTIPLIER[speedTier]

  useFrame(() => {
    if (!isTransitioning) {
      if (crouch && !crouchPrev.current) {
        requestPosture(posture === 'standing' ? 'crouching' : 'standing')
      }

      if (prone && !pronePrev.current) {
        if (posture === 'crouching') {
          requestPosture('prone')
        } else if (posture === 'prone') {
          requestPosture('crouching')
        }
      }
    }

    crouchPrev.current = crouch
    pronePrev.current = prone
    setSpeedTier(getSpeedTier(usePlayerStore.getState().posture, run))
  })

  return (
    <Ecctrl
      maxVelLimit={maxVelLimit}
      sprintMult={1}
      capsuleHalfHeight={capsule.halfHeight}
      capsuleRadius={capsule.radius}
      camInitDis={-3.8}
      camMaxDis={-5.5}
      camMinDis={-2.2}
      camCollision
      camCollisionOffset={0.7}
      camTargetPos={{ x: 0, y: capsule.cameraY, z: 0 }}
      turnSpeed={14}
      springK={1.35}
      dampingC={0.1}
      autoBalanceSpringK={0.35}
      autoBalanceDampingC={0.03}
    >
      <PlayerModel />
    </Ecctrl>
  )
}
