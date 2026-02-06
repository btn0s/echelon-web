import type { KeyboardControlsEntry } from '@react-three/drei'

export type ControlName =
  | 'forward'
  | 'backward'
  | 'leftward'
  | 'rightward'
  | 'jump'
  | 'run'
  | 'crouch'
  | 'prone'

export const keyboardMap: KeyboardControlsEntry<ControlName>[] = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'leftward', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'rightward', keys: ['KeyD', 'ArrowRight'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['ShiftLeft'] },
  { name: 'crouch', keys: ['KeyC', 'ControlLeft'] },
  { name: 'prone', keys: ['KeyZ'] },
]
