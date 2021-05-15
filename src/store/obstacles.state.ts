import { atom, selector } from 'recoil'

import { Obstacles } from './world.state.types'
import { mapObjectsToField } from './world.ulils'

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
