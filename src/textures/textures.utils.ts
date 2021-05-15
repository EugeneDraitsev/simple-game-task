/**
 *  Tiles
 */
import grass1 from './tiles/grass1.png'
import grass2 from './tiles/grass2.png'
import mud1 from './tiles/mud1.png'
import mud2 from './tiles/mud2.png'
import sand1 from './tiles/sand1.png'
import sand2 from './tiles/sand2.png'
/**
 *  Objects
 */
import rock1 from './objects/rock1.png'
import rock2 from './objects/rock2.png'
import tree1 from './objects/tree1.png'
import tree2 from './objects/tree2.png'

const textures = {
  grass1,
  grass2,
  mud1,
  mud2,
  sand1,
  sand2,
  rock1,
  rock2,
  tree1,
  tree2,
}

export const getTexture = (type: string, id: number) => {
  const textureId = (type + id) as keyof typeof textures

  return textures[textureId] || grass1
}
