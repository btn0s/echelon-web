import { usePlayerStore } from '../../stores/usePlayerStore'

export function DebugUI() {
  const posture = usePlayerStore((state) => state.posture)
  const speedTier = usePlayerStore((state) => state.speedTier)
  const isTransitioning = usePlayerStore((state) => state.isTransitioning)
  const fps = usePlayerStore((state) => state.fps)

  return (
    <div className="debug-overlay">
      <div className="debug-row">
        <span className="debug-label">Posture</span>
        <span className="debug-value">{posture}</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">Speed Tier</span>
        <span className="debug-value">{speedTier}</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">Transitioning</span>
        <span className="debug-value">{isTransitioning ? 'yes' : 'no'}</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">FPS</span>
        <span className="debug-value">{fps}</span>
      </div>
      <div style={{ marginTop: 8, opacity: 0.8 }}>
        WASD move, Shift sprint, C crouch toggle, Z prone toggle
      </div>
    </div>
  )
}
