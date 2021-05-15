import { times } from 'lodash-es'
import { selector } from 'recoil'

import { tilesState } from './tiles.state'
import { obstaclesSelector } from './obstacles.state'
import { enemiesSelector } from './enemies.state'
import { bonusesSelector } from './bonuses.state'
import { playerState } from './player.state'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants'

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
