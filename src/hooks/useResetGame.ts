import { useResetRecoilState } from 'recoil'

import { bonusesState, enemiesState, playerState } from '../store'

export const useResetGame = () => {
  const resetPlayer = useResetRecoilState(playerState)
  const resetEnemies = useResetRecoilState(enemiesState)
  const resetBonuses = useResetRecoilState(bonusesState)

  return () => {
    resetPlayer()
    resetEnemies()
    resetBonuses()
  }
}
