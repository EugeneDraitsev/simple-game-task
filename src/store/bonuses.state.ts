import { atom, selector } from 'recoil'

import { Bonuses } from './world.state.types'
import { mapObjectsToField } from './world.ulils'

/**
 * Bonuses
 */
export const bonusesState = atom<Bonuses>({
  key: 'bonusesState',
  default: [
    { id: 1, type: 'apple', row: 0, column: 6, score: 100 },
    { id: 1, type: 'banana', row: 3, column: 6, score: 200 },
    { id: 1, type: 'cherry', row: 7, column: 6, score: 300 },
  ],
})

export const bonusesSelector = selector({
  key: 'bonusesSelector',
  get: ({ get }) => mapObjectsToField(get(bonusesState)),
})
