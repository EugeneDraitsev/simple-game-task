import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import Game from './Game'
import GlobalStyles from './styles/global.styles'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <RecoilRoot>
      <Game />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
