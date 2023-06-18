import { createLevelsArr } from './levels-data'
import { startLevel } from './game'
import { addListeners } from './listeners'

export default function initGame (): void {
  createLevelsArr()
  startLevel()
  addListeners()
}
