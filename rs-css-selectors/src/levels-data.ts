import { type ILevel } from './Types'
import { Level } from './Class'

export const levelDataArr: ILevel[] = [
  {
    number: 1,
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
    activeItems: ['plate1', 'plate2', 'plate3'],
    header: 'Select plates!'
  },
  {
    number: 2,
    correctAnswer: '.orange',
    items: [{
      type: 'plate',
      highlight: ['title-plate-open', 'title-plate-close'],
      id: 'plate'
    },
    {
      type: 'orange',
      highlight: ['title-orange'],
      id: 'orange'
    }
    ],
    viewerTitles: [
      { title: '  <plate>', highlight: ['plate', 'title-plate-close'], id: 'title-plate-open' },
      { title: '     <orange class="orange" />', highlight: ['orange'], id: 'title-orange' },
      { title: '  </plate>', highlight: ['plate', 'title-plate-open'], id: 'title-plate-close' }
    ],
    activeItems: ['orange'],
    header: 'Select orange!'
  }
]

export const levelsArr: ILevel[] = []
export function createLevelsArr (): void {
  levelDataArr.forEach(data => {
    const level: ILevel = new Level(data)
    levelsArr.push(level)
  })
}
