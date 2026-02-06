import { create } from 'zustand'
import { POSTURE_TRANSITIONS, TRANSITION_MS } from '../constants/movement'
import type { Posture, SpeedTier } from '../types'

type TransitionKey = `${Posture}->${Posture}`

interface PlayerStore {
  posture: Posture
  targetPosture: Posture | null
  speedTier: SpeedTier
  isTransitioning: boolean
  fps: number
  setSpeedTier: (tier: SpeedTier) => void
  requestPosture: (next: Posture) => void
  setFps: (fps: number) => void
}

let postureTimer: number | null = null

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  posture: 'standing',
  targetPosture: null,
  speedTier: 'walk',
  isTransitioning: false,
  fps: 0,
  setSpeedTier: (tier) =>
    set((state) => (state.speedTier === tier ? state : { speedTier: tier })),
  setFps: (fps) => set({ fps }),
  requestPosture: (next) => {
    const { posture, isTransitioning } = get()
    if (isTransitioning || posture === next) {
      return
    }

    const canTransition = POSTURE_TRANSITIONS[posture].includes(next)
    if (!canTransition) {
      return
    }

    const transitionKey = `${posture}->${next}` as TransitionKey
    const duration = TRANSITION_MS[transitionKey]

    if (postureTimer !== null) {
      window.clearTimeout(postureTimer)
    }

    set({ isTransitioning: true, targetPosture: next })

    postureTimer = window.setTimeout(() => {
      set({ posture: next, targetPosture: null, isTransitioning: false })
      postureTimer = null
    }, duration)
  },
}))
