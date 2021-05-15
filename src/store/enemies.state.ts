import { atom, selector } from 'recoil'

import { Enemies } from './world.state.types'
import { mapObjectsToField } from './world.ulils'

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
