import React, { memo } from 'react'
import styled from '@emotion/styled'

import { ObstacleObject } from '../store'
import { getTexture } from '../textures'

const Rock = styled.div<{ texture: string }>`
  height: 64px;
  background: url('${(p) => p.texture}') 0 0 no-repeat;
  background-size: 64px 64px;
`
const Tree = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const getTree = (id: number) => {
  switch (id) {
    case 1:
      return '🌳'
    case 2:
      return '🎄'
    default:
      return '🚫'
  }
}

interface ObstacleProps {
  obstacle: ObstacleObject
}

export const Obstacle = memo(({ obstacle }: ObstacleProps) => {
  const { id, type } = obstacle

  if (type === 'tree') {
    const emoji = getTree(id)
    return <Tree>{emoji}</Tree>
  }

  const texture = getTexture(type, id)
  return <Rock texture={texture} />
})
