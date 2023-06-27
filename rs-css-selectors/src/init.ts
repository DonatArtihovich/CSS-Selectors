import { createLevelsArr } from './levels-data'
import { startLevel, changeLevelIndex } from './game'
import { addListeners } from './listeners'

export default function initGame (): void {
  createLevelsArr()
  addListeners()
  if (localStorage.getItem('progress') != null) rebuildGame()
  startLevel()
}

function rebuildGame (): void {
  const statusArr: number[] = JSON.parse(localStorage.getItem('progress') as string)
  statusArr.forEach((status, index) => {
    if (status !== 0) {
      const level: HTMLDivElement | null = document.querySelector(`.level-item[data-level="${index}"]`)
      if (level == null) throw new Error('Unexpected null against level for status adding!')
      const className: string = (status === 1) ? 'level-item_completed' : 'level-item_help'
      level.classList.add(className)
    }
  })
  const activeLevelIndex: number = statusArr.includes(0) ? statusArr.indexOf(0) : 9
  changeLevelIndex(activeLevelIndex)
}
