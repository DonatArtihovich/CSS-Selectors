import { levelsArr } from './levels-data'
import { type ITitleObject, type ILevel } from './Types'

export let currentLevelIndex: number = 0
let writerId: NodeJS.Timeout
let isWithHelp: boolean = false

export function startLevel (): void {
  isWithHelp = false
  const enterInput: HTMLInputElement | null = document.querySelector('.css-editor__input')
  if (enterInput === null) throw new Error('Unexpected null instead of input!')
  enterInput.value = ''
  const levelPicturesWrapper: HTMLDivElement | null = document.querySelector('.level-item__pictures-wrapper')
  if (levelPicturesWrapper !== null) levelPicturesWrapper.remove()
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  changeHTMLViewer(currentLevel)
  renderLevel(currentLevel)
  changeHeader(currentLevel)
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

function changeHeader (level: ILevel): void {
  const header: HTMLElement | null = document.querySelector('.main__header')
  if (header == null) throw new Error('Unexpected null instead of header!')

  header.textContent = level.header
}

function changeHTMLViewer (level: ILevel): void {
  const viewer: HTMLElement | null = document.querySelector('.table-tag')
  if (viewer == null) throw new Error('Unexpected null instead of HTML Viewer!')

  viewer.innerHTML = '<p class="table-tag__open">&lt;div class="table"&gt;</p>'
  level.viewerTitles.forEach((item: ITitleObject) => {
    const content = document.createElement('pre')
    content.className = 'table-tag__content table-tag__content_parent'
    content.textContent = item.title
    content.id = item.id
    content.dataset.highlight = JSON.stringify(item.highlight)
    viewer.append(content)
  })
}

export function checkAnswer (answer: string): void {
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  if (currentLevel.allowedAnswers.includes(answer)) {
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
  localStorage.setItem('progress', JSON.stringify(levelStatusArr))
}

export function resetProgress (): void {
  localStorage.clear()
  const levelsArr: HTMLDivElement[] = [...document.querySelectorAll('.level-item')] as HTMLDivElement[]
  levelsArr.forEach((level, index) => {
    level.className = index === 0 ? 'level-item level_active' : 'level-item'
  })
  currentLevelIndex = 0
  startLevel()
}

function finishGame (): void {
  alert('YOU WON')
}
