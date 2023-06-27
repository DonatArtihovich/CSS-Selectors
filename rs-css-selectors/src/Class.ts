import { type ILevel, type IItemObject, type ITitleObject } from './Types'

export class Level implements ILevel {
  public number: number
  public correctAnswer: string
  public allowedAnswers: string[]
  public items: IItemObject[]
  public viewerTitles: ITitleObject[]
  public activeItems: string[]
  public itemElements: HTMLElement[]
  public header: string
  constructor ({
    number,
    correctAnswer,
    allowedAnswers,
    items,
    viewerTitles,
    activeItems,
    header
  }: ILevel) {
    this.number = number
    this.correctAnswer = correctAnswer
    this.allowedAnswers = allowedAnswers
    this.items = items
    this.viewerTitles = viewerTitles
    this.activeItems = activeItems
    this.header = header
    this.itemElements = []
  }

  public createItemElements (): void {
    this.itemElements = []
    this.items.forEach((item: IItemObject) => {
      const itemElement: HTMLElement = document.createElement('img')
      const itemWrapper: HTMLDivElement = document.createElement('div')
      itemElement.className = `level-item__picture ${item.type}-picture`
      itemElement.setAttribute('src', `./assets/img/${item.type}.png`)
      itemElement.id = item.id
      itemElement.dataset.highlight = JSON.stringify(item.highlight)
      itemWrapper.className = `level-item__picture-wrapper level-item__${item.type}-wrapper level-item__${item.type}-wrapper_level-${this.number}`
      if (item.number !== 0 && item.number !== undefined) itemWrapper.classList.add(`level-item__${item.type}-wrapper_level-${this.number}_${item.number}`)
      if (this.activeItems.includes(item.id)) itemWrapper.classList.add('level-item_active')
      itemWrapper.append(itemElement)

      this.itemElements.push(itemWrapper)
    })
  }
}
