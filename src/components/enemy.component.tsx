import React, { memo } from 'react'
import styled from '@emotion/styled'

import { EnemyObject } from '../store'

const Wrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const getEnemy = (type: EnemyObject['type']) => {
  switch (type) {
    case 'wolf':
      return '🐺'
    case 'bear':
      return '🐻'
    default:
      return '🚫'
  }
}

interface EnemyProps {
  enemy: EnemyObject
}

export const Enemy = memo(({ enemy }: EnemyProps) => {
  const { type } = enemy
  const emoji = getEnemy(type)

  return <Wrapper>{emoji}</Wrapper>
})
