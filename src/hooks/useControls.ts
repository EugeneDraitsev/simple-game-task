import { useKey } from 'react-use'
import { useRecoilState } from 'recoil'

import { playerSelector } from '../store'

export const useControls = () => {
  const [player, setPlayer] = useRecoilState(playerSelector)

  const movePlayer = (y: number, x: number) => {
    const nextRow = player.row - y
    const nextColumn = player.column + x
    setPlayer((currentPlayer) => ({
      ...currentPlayer,
      row: nextRow,
      column: nextColumn,
    }))
  }

  const moveUp = () => movePlayer(1, 0)
  const moveDown = () => movePlayer(-1, 0)
  const moveLeft = () => movePlayer(0, -1)
  const moveRight = () => movePlayer(0, 1)

  useKey((event) => ['KeyW', 'ArrowUp'].includes(event.code), moveUp)
  useKey((event) => ['KeyS', 'ArrowDown'].includes(event.code), moveDown)

  useKey((event) => ['KeyA', 'ArrowLeft'].includes(event.code), moveLeft)
  useKey((event) => ['KeyD', 'ArrowRight'].includes(event.code), moveRight)
}
