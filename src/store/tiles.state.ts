import { atom } from 'recoil'
import { times } from 'lodash-es'

import { Tiles } from './world.state.types'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants'

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
