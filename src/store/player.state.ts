import { atom, selector } from 'recoil'
import { minBy, shuffle } from 'lodash-es'

import { PlayerObject } from './world.state.types'
import { isMovementAvailable } from './world.ulils'
import { obstaclesSelector } from './obstacles.state'
import { bonusesSelector, bonusesState } from './bonuses.state'
import { enemiesSelector, enemiesState } from './enemies.state'

/**
 * Player
 */
export const playerState = atom<PlayerObject>({
  key: 'playerState',
  default: { row: 0, column: 0, score: 0, isAlive: true },
})

export const playerSelector = selector<PlayerObject>({
  key: 'playerSelector',
  get: ({ get }): PlayerObject => get(playerState),
  set: ({ set, get }, newValue) => {
    const nextRow = (newValue as PlayerObject).row
    const nextColumn = (newValue as PlayerObject).column
    const player = get(playerState)
    const obstacles = get(obstaclesSelector)
    const bonuses = get(bonusesSelector)
    const enemies = get(enemiesSelector)

    if (
      !player.isAlive ||
      !isMovementAvailable([obstacles], nextRow, nextColumn)
    ) {
      return
    }

    // Move player
    set(playerState, (currentPlayer) => ({
      ...currentPlayer,
      row: nextRow,
      column: nextColumn,
    }))

    // Check bonuses
    const bonus = bonuses?.[nextRow]?.[nextColumn]
    if (bonus) {
      set(playerState, (currentPlayer) => ({
        ...currentPlayer,
        score: currentPlayer.score + bonus.score,
        row: nextRow,
        column: nextColumn,
      }))
      set(bonusesState, (currentBonuses) =>
        currentBonuses.filter(
          (x) => x.row !== nextRow || x.column !== nextColumn
        )
      )
    }

    // Check enemy on next tile
    const isNextEnemy = enemies?.[nextRow]?.[nextColumn]
    if (isNextEnemy) {
      set(playerState, (currentPlayer) => ({
        ...currentPlayer,
        isAlive: false,
      }))
    }

    // Move enemies
    set(enemiesState, (currentEnemies) =>
      currentEnemies.map((enemy) => {
        const possibleMoves = [
          { row: enemy.row + 1, column: enemy.column },
          { row: enemy.row - 1, column: enemy.column },
          { row: enemy.row, column: enemy.column + 1 },
          { row: enemy.row, column: enemy.column - 1 },
        ].filter((move) =>
          isMovementAvailable([obstacles, bonuses], move.row, move.column)
        )

        const nextPosition = minBy(
          shuffle(possibleMoves),
          (move) =>
            Math.abs(nextRow - move.row) + Math.abs(nextColumn - move.column)
        )

        if (nextPosition) {
          if (
            nextPosition.row === nextRow &&
            nextPosition.column === nextColumn
          ) {
            set(playerState, (currentPlayer) => ({
              ...currentPlayer,
              isAlive: false,
            }))
          }
          return {
            ...enemy,
            row: nextPosition.row,
            column: nextPosition.column,
          }
        }

        return enemy
      })
    )
  },
})
