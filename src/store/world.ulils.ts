import { times } from 'lodash-es'

import { FieldObject } from './world.state.types'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants'

export const mapObjectsToField = <T extends FieldObject>(objects: Array<T>) => {
  const mappedObstacles = times(WORLD_HEIGHT, () =>
    times(WORLD_WIDTH, () => null as T | null)
  )
  objects.forEach((object) => {
    mappedObstacles[object.row][object.column] = object
  })
  return mappedObstacles
}

export const isMovementAvailable = (
  obstacles: Array<Array<Array<FieldObject | null>>>,
  nextRow: number,
  nextColumn: number
) =>
  !obstacles.some((obstacle) => obstacle?.[nextRow]?.[nextColumn]) &&
  nextRow >= 0 &&
  nextRow < WORLD_HEIGHT &&
  nextColumn >= 0 &&
  nextColumn < WORLD_WIDTH
