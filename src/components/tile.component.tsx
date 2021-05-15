import React, { memo, useMemo } from 'react'
import styled from '@emotion/styled'

import { TileObject } from '../store'
import { getTexture } from '../textures'

const Wrapper = styled.div<{ texture: string; x: number; y: number }>`
  background: url('${(p) => p.texture}') no-repeat;
  background-position: left ${(p) => -p.x}px top ${(p) => -p.y}px;
  background-size: 256px 256px;
`

interface TileProps {
  tile: TileObject
  row: number
  column: number
  children?: React.ReactNode
}

export const Tile = memo(({ tile, row, column, children }: TileProps) => {
  const { id, type } = tile
  const xOffset = (column % 4) * 64
  const yOffset = (row % 4) * 64
  const texture = useMemo(() => getTexture(type, id), [type, id])

  return (
    <Wrapper texture={texture} x={xOffset} y={yOffset}>
      {children}
    </Wrapper>
  )
})
