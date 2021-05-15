/**
 * Generic GameObject
 */
export interface GameObject {
  id: number
  type: string
}
export interface FieldObject extends GameObject {
  row: number
  column: number
}

/**
 * Specific GameObjects
 */
export interface TileObject extends GameObject {
  type: 'grass' | 'mud' | 'sand'
}
export interface ObstacleObject extends FieldObject {
  type: 'rock' | 'tree'
}
export interface EnemyObject extends FieldObject {
  type: 'wolf' | 'bear'
}
export interface BonusObject extends FieldObject {
  type: 'apple' | 'banana' | 'cherry'
  score: number
}

export type Tiles = TileObject[][]
export type Obstacles = Array<ObstacleObject>
export type Enemies = Array<EnemyObject>
export type Bonuses = Array<BonusObject>

export interface PlayerObject {
  row: number
  column: number
  score: number
  isAlive: boolean
}
