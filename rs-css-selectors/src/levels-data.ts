import { type ILevel } from './Types'
import { Level } from './Class'

export const levelDataArr: ILevel[] = [
  {
    correctAnswer: 'plate',
    items: [{
      type: 'plate',
      highlight: ['title-plate1-open', 'title-plate1-close'],
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
      { title: '  <plate>', highlight: ['plate1', 'title-plate1-close'], id: 'title-plate1-open' },
      { title: '    <plate></plate>', highlight: ['plate2'], id: 'title-plate2' },
      { title: '  </plate>', highlight: ['plate1', 'title-plate1-open'], id: 'title-plate1-close' },
      { title: '  <plate />', highlight: ['plate3', 'title-plate3'], id: 'title-plate3' }
    ],
    itemTitles: ['<plate></plate>', '<plate></plate>', '<plate></plate>'],
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
