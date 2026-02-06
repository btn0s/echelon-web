import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePlayerStore } from '../../stores/usePlayerStore'

export function FpsTracker() {
  const setFps = usePlayerStore((state) => state.setFps)
  const elapsed = useRef(0)
  const frames = useRef(0)

  useFrame((_, delta) => {
    elapsed.current += delta
    frames.current += 1

    if (elapsed.current >= 0.3) {
      setFps(Math.round(frames.current / elapsed.current))
      elapsed.current = 0
      frames.current = 0
    }
  })

  return null
}
