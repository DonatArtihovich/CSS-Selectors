import { levelsArr } from './levels-data'
import { type ITitleObject, type ILevel } from './Types'

const currentLevelIndex: number = 0

export function startGame(): void {
  const currentLevel: ILevel = levelsArr[currentLevelIndex]
  console.log(currentLevel)
  renderLevel(currentLevel)
  changeHeader(currentLevel)
  changeHTMLViewer(currentLevel)
}

function renderLevel(level: ILevel): void {
  const table: HTMLElement | null = document.querySelector('.table__wrapper')
  if (table == null) throw new Error('Unexpected null instead of view section!')
  const itemsWrapper: HTMLElement = document.createElement('div')
  itemsWrapper.classList.add('level-item__pictures-wrapper')
  table.append(itemsWrapper)

  level.itemElements?.forEach(item => {
    itemsWrapper.append(item)
  })
}

function changeHeader(level: ILevel): void {
  const header: HTMLElement | null = document.querySelector('.main__header')
  if (header == null) throw new Error('Unexpected null instead of header!')

  header.textContent = level.header
}

function changeHTMLViewer(level: ILevel): void {
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
