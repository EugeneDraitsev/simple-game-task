import { atom } from 'recoil'
import { times } from 'lodash-es'

interface GameObject {
  symbol: string
}

type Field = GameObject[][]

export const WORLD_WIDTH = 50
export const WORLD_HEIGHT = 20

const getInitialField = () => {
  return times(WORLD_WIDTH, () =>
    times(WORLD_HEIGHT, () => ({
      symbol: '@',
    }))
  )
}

export const fieldState = atom<Field>({
  key: 'fieldState',
  default: getInitialField(),
})
