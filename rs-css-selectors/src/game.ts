import { levelsArr } from './levels-data'
import { type ITitleObject, type ILevel } from './Types'

export let currentLevelIndex: number = 0
let writerId: NodeJS.Timeout
let isWithHelp: boolean = false

enum ViewerStartInners {
  viewer = '<p class="table-tag__open">&lt;div class="table"&gt;</p>',
  table = '<div class="table"></div><div class="table__side-view"></div><div class="table__table-leg table-left-leg"></div><div class="table__table-leg table-right-leg"></div>'
}

export function startLevel (): void {
  saveProgress()
  isWithHelp = false
  const enterInput: HTMLInputElement | null = document.querySelector('.css-editor__input')
  if (enterInput === null) throw new Error('Unexpected null instead of input!')
  enterInput.value = ''
  const table: HTMLElement | null = document.querySelector('.table__wrapper')
  if (table == null) throw new Error('Unexpected null instead of view section!')
  table.innerHTML = ViewerStartInners.table
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  changeHTMLViewer(currentLevel)
  renderLevel(currentLevel)
  changeHeader(currentLevel.header)
}

function renderLevel (level: ILevel): void {
  const table: HTMLElement | null = document.querySelector('.table__wrapper')
  if (table == null) throw new Error('Unexpected null instead of view section!')
  const itemsWrapper: HTMLElement = document.createElement('div')
  itemsWrapper.classList.add('level-item__pictures-wrapper')
  if (level === undefined ||
    level.createItemElements === undefined) throw new Error('Unexpected undefined!')
  level.createItemElements()

  level.itemElements?.forEach(item => {
    itemsWrapper.append(item)
  })
  table.append(itemsWrapper)
  const titlesArr: NodeListOf<HTMLPreElement> | null = document.querySelectorAll('.table-tag__content_parent')
  const itemsArr: NodeListOf<HTMLImageElement> | null = document.querySelectorAll('.level-item__picture')
  addHighlightListeners(titlesArr)
  addHighlightListeners(itemsArr)
}

function changeHeader (header: string): void {
  const headerElement: HTMLElement | null = document.querySelector('.main__header')
  if (headerElement == null) throw new Error('Unexpected null instead of header!')

  headerElement.textContent = header
}

function changeHTMLViewer (level: ILevel): void {
  const viewer: HTMLElement | null = document.querySelector('.table-tag')
  if (viewer == null) throw new Error('Unexpected null instead of HTML Viewer!')
  const viewerTitlesClassName = 'table-tag__content table-tag__content_parent'
  viewer.innerHTML = ViewerStartInners.viewer
  level.viewerTitles.forEach((item: ITitleObject) => {
    const content = document.createElement('pre')
    content.className = viewerTitlesClassName
    content.textContent = item.title
    content.id = item.id
    content.dataset.highlight = JSON.stringify(item.highlight)
    viewer.append(content)
  })
}

export function checkAnswer (answer: string): void {
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  if (!isNaN(+answer) && +answer > 0 && +answer < 11) {
    changeLevelIndex(Math.floor(+answer) - 1)
    startLevel()
    return
  }
  if (currentLevel.allowedAnswers.includes(answer.toLowerCase())) {
    winLevel()
  } else {
    shakeLevel()
  }
}

export function writeSolution (): void {
  if (writerId !== undefined) clearInterval(writerId)
  const currentLevelData: ILevel = levelsArr[currentLevelIndex]
  const answerLetters: string[] = currentLevelData.correctAnswer.split('')
  const enterInput: HTMLInputElement | null = document.querySelector('.css-editor__input')
  if (enterInput == null) throw new Error('Unexpected null!')
  isWithHelp = true

  enterInput.value = ''
  let idx = 0
  writerId = setInterval(() => {
    enterInput.value += answerLetters[idx]
    idx += 1
    if (idx === answerLetters.length) clearInterval(writerId)
  }, 200)
}

export function changeLevelIndex (index: number): void {
  currentLevelIndex = index
  if (levelsArr.length <= currentLevelIndex) return
  const activeLevel: HTMLDivElement | null = document.querySelector('.level_active')
  const newActiveLevel: HTMLDivElement | null = document.querySelector(`.level-item[data-level="${index}"]`)
  if ((activeLevel == null) || (newActiveLevel == null)) throw new Error('Unexpected null against of active level!')
  activeLevel.classList.remove('level_active')
  newActiveLevel.classList.add('level_active')
}

function addHighlightListeners (nodesArr: NodeListOf<HTMLElement>): void {
  nodesArr.forEach((elem: HTMLElement) => {
    elem.addEventListener('mouseover', () => {
      if (elem.dataset.highlight === undefined) throw new Error('Unexpected undefined')
      const highlightedElements = JSON.parse(elem.dataset.highlight)

      highlightedElements.forEach((id: string) => {
        const hElem: HTMLElement | null = document.getElementById(id)
        if (hElem == null) throw new Error('Unexpected null')

        hElem.classList.add('highlighted')
        hElem.closest('.level-item__picture-wrapper')?.classList.add('highlighted')
      })
    })

    elem.addEventListener('mouseleave', () => {
      if (elem.dataset.highlight === undefined) throw new Error('Unexpected undefined')
      const highlightedElements = JSON.parse(elem.dataset.highlight)
      highlightedElements.forEach((id: string) => {
        const hElem: HTMLElement | null = document.getElementById(id)
        if (hElem == null) throw new Error('Unexpected null')

        hElem.classList.remove('highlighted')
        hElem.closest('.level-item__picture-wrapper')?.classList.remove('highlighted')
      })
    })
  })
}

function winLevel (): void {
  const activeItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.level-item_active')
  const currentLevel: HTMLDivElement | null = document.querySelector(`.level-item[data-level="${currentLevelIndex}"]`)
  if (currentLevel == null) throw new Error('Unexpected null against of current level!')
  activeItems.forEach((item) => {
    item.classList.add('level-item_active-win')
  })

  if (currentLevel.classList.contains('level-item_completed')) currentLevel.classList.remove('level-item_completed')
  if (currentLevel.classList.contains('level-item_help')) currentLevel.classList.remove('level-item_help')
  const statusClassName: string = !isWithHelp ? 'level-item_completed' : 'level-item_help'
  currentLevel.classList.add(statusClassName)

  saveProgress()
  setTimeout(() => {
    changeLevelIndex(currentLevelIndex + 1)
    levelsArr.length > currentLevelIndex ? startLevel() : finishGame()
  }, 320)
}

function shakeLevel (): void {
  const activeItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.level-item_active')
  activeItems.forEach(item => {
    item.classList.add('level-item_active-lose')
    item.addEventListener('animationend', () => {
      item.classList.remove('level-item_active-lose')
    }, { once: true })
  })
}

function saveProgress (): void {
  const levelsArr: NodeListOf<HTMLDivElement> = document.querySelectorAll('.level-item')
  const levelStatusArr: number[] = [...levelsArr].map((level) => {
    if (level.classList.contains('level-item_completed')) return 1
    else if (level.classList.contains('level-item_help')) return 2
    return 0
  }
  )

  if (localStorage.getItem('progress') == null) localStorage.removeItem('progress')
  localStorage.setItem('progress', JSON.stringify({ levelStatusArr, currentLevelIndex }))
}

export function resetProgress (): void {
  localStorage.clear()
  const levelsArr: HTMLDivElement[] = [...document.querySelectorAll('.level-item')] as HTMLDivElement[]
  const levelClassName = 'level-item'
  const activeLevelClassName = 'level-item level_active'
  levelsArr.forEach((level, index) => {
    level.className = index === 0 ? activeLevelClassName : levelClassName
  })
  currentLevelIndex = 0
  startLevel()
}

function finishGame (): void {
  const table: HTMLElement | null = document.querySelector('.table__wrapper')
  if (table == null) throw new Error('Unexpected null instead of view section!')
  const headerText = 'HOORAY!!!'
  const winTableLabelText = 'You Won!'
  const winTableSublabelText = 'Good luck in learning programming!'

  const tableLabel = document.createElement('h2')
  tableLabel.classList.add('table-label')
  tableLabel.textContent = winTableLabelText

  const tableSublabel = document.createElement('h3')
  tableSublabel.classList.add('table-sublabel')
  tableSublabel.textContent = winTableSublabelText

  table.append(tableLabel, tableSublabel)
  changeHeader(headerText)
}
