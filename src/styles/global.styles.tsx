import React from 'react'
import { Global, css } from '@emotion/react'

export default () => (
  <Global
    styles={css`
      body {
        margin: 0;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
)
