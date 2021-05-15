import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import { Game } from './components'
import GlobalStyles from './styles/global.styles'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <Game />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
