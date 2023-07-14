import { createLevelsArr } from '../utils/init-levels'
import { startLevel, changeLevelIndex } from '../model/game'
import { addListeners } from './listeners'

export default function initGame (): void {
  createLevelsArr()
  addListeners()
  if (localStorage.getItem('progress') != null) rebuildGame()
  startLevel()
}

function rebuildGame (): void {
  const statusObj = JSON.parse(localStorage.getItem('progress') as string)
  const statusArr: number[] = statusObj.levelStatusArr
  statusArr.forEach((status, index) => {
    if (status !== 0) {
      const level: HTMLDivElement | null = document.querySelector(`.level-item[data-level="${index}"]`)
      if (level == null) throw new Error('Unexpected null against level for status adding!')
      const className: string = (status === 1) ? 'level-item_completed' : 'level-item_help'
      level.classList.add(className)
    }
  })
  const activeLevelIndex: number = statusObj.currentLevelIndex
  changeLevelIndex(activeLevelIndex)
}
