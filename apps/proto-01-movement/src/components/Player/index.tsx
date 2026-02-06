import { KeyboardControls } from '@react-three/drei'
import { PlayerController } from './PlayerController'
import { keyboardMap } from '../../systems/inputSystem'

export function Player() {
  return (
    <KeyboardControls map={keyboardMap}>
      <PlayerController />
    </KeyboardControls>
  )
}
