import { folder, useControls } from 'leva'
import { usePlayerStore } from '../../stores/usePlayerStore'

export function DebugPanel() {
  const posture = usePlayerStore((state) => state.posture)
  const speedTier = usePlayerStore((state) => state.speedTier)
  const isTransitioning = usePlayerStore((state) => state.isTransitioning)

  useControls('Proto01 State', {
    Runtime: folder(
      {
        posture: { value: posture, editable: false },
        speedTier: { value: speedTier, editable: false },
        transitioning: { value: isTransitioning, editable: false },
      },
      { collapsed: false },
    ),
  })

  return null
}
