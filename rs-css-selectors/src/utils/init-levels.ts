import { type ILevel } from './Types'
import { Level } from '../view/Class'
import { levelDataArr, levelsArr } from './const'

export function createLevelsArr (): void {
  levelDataArr.forEach(data => {
    const level: ILevel = new Level(data)

    levelsArr.push(level)
  })
}
