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
  },
  {
    number: 3,
    correctAnswer: '#watermelon',
    items: [{
      type: 'plate',
      highlight: ['title-plate-open', 'title-plate-close'],
      id: 'plate'
    },
    {
      type: 'watermelon',
      highlight: ['title-watermelon'],
      id: 'watermelon'
    }
    ],
    viewerTitles: [
      { title: '  <plate>', highlight: ['plate', 'title-plate-close'], id: 'title-plate-open' },
      { title: '     <watermelon id="watermelon" />', highlight: ['watermelon'], id: 'title-watermelon' },
      { title: '  </plate>', highlight: ['plate', 'title-plate-open'], id: 'title-plate-close' }
    ],
    activeItems: ['watermelon'],
    header: 'Select watermelon!'
  },
  {
    number: 4,
    correctAnswer: 'plate + cucumber',
    items: [{
      type: 'plate',
      highlight: ['title-plate'],
      id: 'plate'
    },
    {
      type: 'cucumber',
      highlight: ['title-cucumber'],
      id: 'cucumber'
    }
    ],
    viewerTitles: [
      { title: '  <plate />', highlight: ['plate'], id: 'title-plate' },
      { title: '  <cucumber />', highlight: ['cucumber'], id: 'title-cucumber' }
    ],
    activeItems: ['cucumber'],
    header: 'Select the cucumber next to the plate!'
  },
  {
    number: 5,
    correctAnswer: 'board .orange',
    items: [{
      type: 'board',
      highlight: ['title-board-open', 'title-board-close'],
      id: 'board'
    },
    {
      type: 'orange',
      highlight: ['title-orange'],
      id: 'orange'
    }
    ],
    viewerTitles: [
      { title: '  <board>', highlight: ['board', 'title-board-close'], id: 'title-board-open' },
      { title: '    <orange class="orange" />', highlight: ['orange'], id: 'title-orange' },
      { title: '  </board>', highlight: ['board', 'title-board-open'], id: 'title-board-close' }
    ],
    activeItems: ['orange'],
    header: 'Select orange on the board!'
  },
  {
    number: 6,
    correctAnswer: 'board + plate #watermelon',
    items: [{
      type: 'board',
      highlight: ['title-board'],
      id: 'board'
    },
    {
      type: 'plate',
      highlight: ['title-plate-open', 'title-plate-close'],
      id: 'plate'
    },
    {
      type: 'watermelon',
      highlight: ['title-watermelon'],
      id: 'watermelon'
    }
    ],
    viewerTitles: [
      { title: '  <board>', highlight: ['board'], id: 'title-board' },
      { title: '  <plate>', highlight: ['plate', 'title-plate-close'], id: 'title-plate-open' },
      { title: '    <watermelon id="watermelon" />', highlight: ['watermelon'], id: 'title-watermelon' },
      { title: '  </plate>', highlight: ['plate', 'title-plate-open'], id: 'title-plate-close' }
    ],
    activeItems: ['watermelon'],
    header: 'Select watermelon on plate!'
  },
  {
    number: 7,
    correctAnswer: 'plate .cucumber',
    items: [{
      type: 'plate',
      highlight: ['title-plate1-open', 'title-plate1-close'],
      id: 'plate1'
    },
    {
      type: 'plate',
      highlight: ['title-plate2-open', 'title-plate2-close'],
      id: 'plate2'
    },
    {
      type: 'board',
      highlight: ['title-board-open', 'title-board-close'],
      id: 'board'
    },
    {
      type: 'cucumber',
      highlight: ['title-cucumber1'],
      id: 'cucumber1',
      number: 1
    },
    {
      type: 'cucumber',
      highlight: ['title-cucumber2'],
      id: 'cucumber2',
      number: 2
    },
    {
      type: 'cucumber',
      highlight: ['title-cucumber3'],
      id: 'cucumber3',
      number: 3
    }
    ],
    viewerTitles: [
      { title: '  <plate>', highlight: ['plate1', 'title-plate1-close'], id: 'title-plate1-open' },
      { title: '    <cucumber class="cucumber" />', highlight: ['cucumber1'], id: 'title-cucumber1' },
      { title: '  </plate>', highlight: ['plate1', 'title-plate1-open'], id: 'title-plate1-close' },
      { title: '  <plate>', highlight: ['plate2', 'title-plate2-close'], id: 'title-plate2-open' },
      { title: '    <cucumber class="cucumber" />', highlight: ['cucumber2'], id: 'title-cucumber2' },
      { title: '  </plate>', highlight: ['plate2', 'title-plate2-open'], id: 'title-plate2-close' },
      { title: '  <board>', highlight: ['board', 'title-board-close'], id: 'title-board-open' },
      { title: '    <cucumber class="cucumber" />', highlight: ['cucumber3'], id: 'title-cucumber3' },
      { title: '  <board>', highlight: ['board', 'title-board-open'], id: 'title-board-close' }
    ],
    activeItems: ['cucumber1', 'cucumber2'],
    header: 'Select cucumbers in plates!'
  }
]

export const levelsArr: ILevel[] = []
export function createLevelsArr (): void {
  levelDataArr.forEach(data => {
    const level: ILevel = new Level(data)
    levelsArr.push(level)
  })
}
