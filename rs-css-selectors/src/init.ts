import { createLevelsArr } from './levels-data'
import { startGame } from './game'
import { addListeners } from './listeners'

export default function initGame (): void {
  createLevelsArr()
  startGame()
  addListeners()
}
