import React from 'react'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'

import { fieldState, WORLD_HEIGHT, WORLD_WIDTH } from './store'

const Content = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: azure;
`
const Field = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 20px);
  grid-template-rows: repeat(${(p) => p.height}, 20px);
`

function Game() {
  const [field] = useRecoilState(fieldState)

  return (
    <Content>
      <Field width={WORLD_WIDTH} height={WORLD_HEIGHT}>
        {field.map((row) => row.map((cell) => <div>{cell.symbol}</div>))}
      </Field>
    </Content>
  )
}

export default Game
