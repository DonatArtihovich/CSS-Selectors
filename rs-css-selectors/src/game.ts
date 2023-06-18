import { levelsArr } from './levels-data'
import { type ITitleObject, type ILevel } from './Types'

export let currentLevelIndex: number = 0
let writerId: NodeJS.Timeout

export function startLevel (): void {
  const table: HTMLDivElement | null = document.querySelector('.table__wrapper')
  if (table === null) throw new Error('Unexpected null instead of table container!')
  table.innerHTML = '<div class="table"></div><div class="table__side-view"></div><div class="table__table-leg table-left-leg"></div><div class="table__table-leg table-right-leg"></div>'
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  console.log(currentLevel)
  renderLevel(currentLevel)
  changeHeader(currentLevel)
  changeHTMLViewer(currentLevel)
}

function renderLevel (level: ILevel): void {
  const table: HTMLElement | null = document.querySelector('.table__wrapper')
  if (table == null) throw new Error('Unexpected null instead of view section!')
  const itemsWrapper: HTMLElement = document.createElement('div')
  itemsWrapper.classList.add('level-item__pictures-wrapper')
  table.append(itemsWrapper)

  level.itemElements?.forEach(item => {
    itemsWrapper.append(item)
  })
}

function changeHeader (level: ILevel): void {
  const header: HTMLElement | null = document.querySelector('.main__header')
  if (header == null) throw new Error('Unexpected null instead of header!')

  header.textContent = level.header
}

function changeHTMLViewer (level: ILevel): void {
  const viewer: HTMLElement | null = document.querySelector('.table-tag')
  if (viewer == null) throw new Error('Unexpected null instead of HTML Viewer!')

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

  if (answer === currentLevel.correctAnswer) {
    winLevel()
  } else {
    shakeLevel()
  }
}

export function writeSolution (): void {
  if (writerId !== undefined) clearInterval(writerId)
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  const answerLetters: string[] = currentLevel.correctAnswer.split('')
  const enterInput: HTMLInputElement | null = document.querySelector('.css-editor__input')
  if (enterInput === null) throw new Error('Unexpected null instead of input!')

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
}

function winLevel (): void {
  const activeItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.level-item_active')
  activeItems.forEach(item => { item.classList.add('level-item_active-win') })
  currentLevelIndex += 1
  levelsArr.length > currentLevelIndex ? startLevel() : finishGame()
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

function finishGame (): void {
  // alert('YOU WON')
}
