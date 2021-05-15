import React, { memo } from 'react'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'

import {
  bonusesState,
  playerState,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  worldState,
} from '../store'
import { Tile } from './tile.component'
import { Obstacle } from './obstacle.component'
import { Enemy } from './enemy.component'
import { Player } from './player.component'
import { useControls, useResetGame } from '../hooks'
import { Bonus } from './bonus.component'
import { isEmpty } from 'lodash-es'

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
`
const Score = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`
const Field = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 64px);
  grid-template-rows: repeat(${(p) => p.height}, 64px);
`
const Button = styled.button`
  cursor: pointer;
  height: 40px;
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  background: rgb(74, 144, 226);
  color: rgb(250, 250, 250);
  padding: 0 16px;
  transition: background 0.125s ease-in-out 0s;
  &:hover {
    background: rgb(27, 93, 171);
  }
`

export const Game = memo(() => {
  const world = useRecoilValue(worldState)
  const bonuses = useRecoilValue(bonusesState)
  const player = useRecoilValue(playerState)

  useControls()
  const resetGame = useResetGame()

  if (isEmpty(bonuses)) {
    return (
      <Content>
        <Score>Congratulation!</Score>
        <Score>You win !!</Score>
        <Score>
          Your final score: <strong>{player.score}</strong>
        </Score>
        <Button onClick={resetGame}>Play again</Button>
      </Content>
    )
  }

  if (!player.isAlive) {
    return (
      <Content>
        <Score>Oh no!</Score>
        <Score>You lose!!</Score>
        <Score>
          Your final score: <strong>{player.score}</strong>
        </Score>
        <Button onClick={resetGame}>Play again</Button>
      </Content>
    )
  }

  return (
    <Content>
      <Score>
        <strong>Score:</strong> {player.score}
      </Score>
      <Field width={WORLD_WIDTH} height={WORLD_HEIGHT}>
        {world.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Tile
              key={`${rowIndex}${columnIndex}`}
              tile={cell.tile}
              row={rowIndex}
              column={columnIndex}
            >
              {cell.obstacle && <Obstacle obstacle={cell.obstacle} />}
              {cell.enemy && <Enemy enemy={cell.enemy} />}
              {cell.player && <Player />}
              {cell.bonus && <Bonus bonus={cell.bonus} />}
            </Tile>
          ))
        )}
      </Field>
    </Content>
  )
})
