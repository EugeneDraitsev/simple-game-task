import { times } from 'lodash-es'
import { FieldObject } from './world.state.types'
import { WORLD_HEIGHT, WORLD_WIDTH } from './world.state'

export const mapObjectsToField = <T extends FieldObject>(objects: Array<T>) => {
  const mappedObstacles = times(WORLD_HEIGHT, () =>
    times(WORLD_WIDTH, () => null as T | null)
  )
  objects.forEach((object) => {
    mappedObstacles[object.row][object.column] = object
  })
  return mappedObstacles
}
