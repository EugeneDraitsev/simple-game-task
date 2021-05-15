import React, { memo } from 'react'
import styled from '@emotion/styled'

import { BonusObject } from '../store'

const Wrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const getBonus = (type: BonusObject['type']) => {
  switch (type) {
    case 'apple':
      return '🍏'
    case 'banana':
      return '🍌'
    case 'cherry':
      return '🍒'
    default:
      return '🚫'
  }
}

interface BonusProps {
  bonus: BonusObject
}

export const Bonus = memo(({ bonus }: BonusProps) => {
  const { type } = bonus
  const emoji = getBonus(type)

  return <Wrapper>{emoji}</Wrapper>
})
