import React, { memo } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

export const Player = memo(() => <Wrapper>🐒</Wrapper>)
