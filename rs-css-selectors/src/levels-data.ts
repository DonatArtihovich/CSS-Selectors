import { type ILevel } from './Types'
import { Level } from './Class'

export const levelDataArr: ILevel[] = [
  {
    correctAnswer: 'plate',
    items: [{
      type: 'plate',
      highlight: ['title-plate1'],
      id: 'plate1'
    },
    {
      type: 'plate',
      highlight: ['title-plate2'],
      id: 'plate2'
    },
    {
      type: 'plate',
      highlight: ['title-plate3'],
      id: 'plate3'
    }
    ],
    viewerTitles: [
      { title: '  <plate />', highlight: ['plate1'], id: 'title-plate1' },
      { title: '  <plate />', highlight: ['plate2'], id: 'title-plate2' },
      { title: '  <plate />', highlight: ['plate3'], id: 'title-plate3' }
    ],
    header: 'Select plates!'
  }
]

export const levelsArr: ILevel[] = []
export function createLevelsArr (): void {
  levelDataArr.forEach(data => {
    const level: ILevel = new Level(data)
    levelsArr.push(level)
  })
}
