import { atom, selector } from 'recoil'
import { times } from 'lodash-es'
import {
  Bonuses,
  Enemies,
  Obstacles,
  PlayerObject,
  Tiles,
} from './world.state.types'
import { mapObjectsToField } from './world.ulils'

export const WORLD_WIDTH = 16
export const WORLD_HEIGHT = 8

/**
 * Tiles
 */
export const tilesState = atom<Tiles>({
  key: 'tilesState',
  default: times(WORLD_HEIGHT, () =>
    times(WORLD_WIDTH, () => ({
      id: 1,
      type: 'grass',
    }))
  ),
})

/**
 * Obstacles
 */
export const obstaclesState = atom<Obstacles>({
  key: 'obstaclesState',
  default: [
    { id: 1, type: 'rock', row: 4, column: 4 },
    { id: 1, type: 'rock', row: 5, column: 4 },
    { id: 1, type: 'tree', row: 6, column: 4 },
    { id: 2, type: 'tree', row: 7, column: 4 },
    { id: 2, type: 'rock', row: 5, column: 5 },
    { id: 2, type: 'rock', row: 6, column: 5 },
    { id: 1, type: 'tree', row: 6, column: 11 },
    { id: 2, type: 'tree', row: 5, column: 11 },
    { id: 1, type: 'rock', row: 1, column: 11 },
    { id: 2, type: 'rock', row: 2, column: 11 },
  ],
})
export const obstaclesSelector = selector({
  key: 'obstaclesSelector',
  get: ({ get }) => mapObjectsToField(get(obstaclesState)),
})
/**
 * Enemies
 */
export const enemiesState = atom<Enemies>({
  key: 'enemiesState',
  default: [
    { id: 1, type: 'bear', row: 0, column: 14 },
    { id: 1, type: 'wolf', row: 7, column: 14 },
  ],
})
export const enemiesSelector = selector({
  key: 'enemiesSelector',
  get: ({ get }) => mapObjectsToField(get(enemiesState)),
})

/**
 * Bonuses
 */
export const bonusesState = atom<Bonuses>({
  key: 'bonusesState',
  default: [
    { id: 1, type: 'apple', row: 0, column: 7, score: 100 },
    { id: 1, type: 'banana', row: 3, column: 7, score: 200 },
    { id: 1, type: 'cherry', row: 7, column: 7, score: 300 },
  ],
})
export const bonusesSelector = selector({
  key: 'bonusesSelector',
  get: ({ get }) => mapObjectsToField(get(bonusesState)),
})

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
    const enemies = get(enemiesState)
    const mappedEnemies = get(enemiesSelector)

    const isMovementAvailable =
      !obstacles?.[nextRow]?.[nextColumn] &&
      nextRow >= 0 &&
      nextRow < WORLD_HEIGHT &&
      nextColumn >= 0 &&
      nextColumn < WORLD_WIDTH

    if (!player.isAlive || !isMovementAvailable) {
      return
    }

    if (isMovementAvailable) {
      set(playerState, (currentPlayer) => ({
        ...currentPlayer,
        row: nextRow,
        column: nextColumn,
      }))
    }

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

    const enemy = mappedEnemies?.[nextRow]?.[nextColumn]
    if (enemy) {
      set(playerState, (currentPlayer) => ({
        ...currentPlayer,
        row: nextRow,
        column: nextColumn,
        isAlive: false,
      }))
    }

    const newEnemies = enemies.map((enemy) => {
      const rowDistance = Math.abs(enemy.row - nextRow)
      const columnDistance = Math.abs(enemy.row - nextColumn)
      if (rowDistance > columnDistance) {
        return {
          ...enemy,
          row: nextRow > enemy.row ? enemy.row + 1 : enemy.row - 1,
        }
      } else {
        return {
          ...enemy,
          column:
            nextColumn > enemy.column ? enemy.column + 1 : enemy.column - 1,
        }
      }
    })
    set(enemiesState, newEnemies)
  },
})

export const worldState = selector({
  key: 'worldState',
  get: ({ get }) => {
    const tiles = get(tilesState)
    const obstacles = get(obstaclesSelector)
    const enemies = get(enemiesSelector)
    const bonuses = get(bonusesSelector)
    const player = get(playerState)

    return times(WORLD_HEIGHT, (row) =>
      times(WORLD_WIDTH, (column) => ({
        row,
        column,
        obstacle: obstacles[row][column],
        tile: tiles[row][column],
        enemy: enemies[row][column],
        bonus: bonuses[row][column],
        player: player.row === row && player.column === column ? player : null,
      }))
    )
  },
})
