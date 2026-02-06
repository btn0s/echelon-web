import type { Posture, SpeedTier } from '../types'

export const BASE_MAX_VELOCITY = 2.5

export const SPEED_MULTIPLIER: Record<SpeedTier, number> = {
  crouchSlow: 0.3,
  crouchFast: 0.5,
  walk: 1,
  sprint: 2,
}

export const POSTURE_HEIGHT: Record<Posture, { halfHeight: number; radius: number; cameraY: number }> = {
  standing: { halfHeight: 0.5, radius: 0.3, cameraY: 0.95 },
  crouching: { halfHeight: 0.2, radius: 0.3, cameraY: 0.65 },
  prone: { halfHeight: 0.05, radius: 0.25, cameraY: 0.38 },
}

export const POSTURE_TRANSITIONS: Record<Posture, Posture[]> = {
  standing: ['crouching'],
  crouching: ['standing', 'prone'],
  prone: ['crouching'],
}

export const TRANSITION_MS: Record<`${Posture}->${Posture}`, number> = {
  'standing->standing': 0,
  'standing->crouching': 200,
  'standing->prone': 0,
  'crouching->standing': 200,
  'crouching->crouching': 0,
  'crouching->prone': 400,
  'prone->standing': 0,
  'prone->crouching': 400,
  'prone->prone': 0,
}
