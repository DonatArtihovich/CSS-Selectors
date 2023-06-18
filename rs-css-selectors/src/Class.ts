import { type ILevel, type IItemObject, type ITitleObject } from './Types'

export class Level implements ILevel {
  public correctAnswer: string
  public items: IItemObject[]
  public viewerTitles: ITitleObject[]
  public viewerChildTitle?: string[]
  public itemElements: HTMLElement[]
  public childItemElements: HTMLElement[]
  public header: string
  constructor ({
    correctAnswer,
    items,
    viewerTitles,
    header
  }: ILevel) {
    this.correctAnswer = correctAnswer
    this.items = items
    this.viewerTitles = viewerTitles
    this.header = header
    this.itemElements = []
    this.childItemElements = []
    this.createItemElements()
  }

  private createItemElements (): void {
    this.items.forEach((item: IItemObject) => {
      const itemElement: HTMLElement = document.createElement('img')
      const itemWrapper: HTMLDivElement = document.createElement('div')
      itemElement.className = `level-item__picture ${item.type}-picture`
      itemElement.setAttribute('src', `./assets/img/${item.type}.png`)
      itemElement.id = item.id
      itemElement.dataset.highlight = JSON.stringify(item.highlight)
      itemWrapper.className = `level-item__picture-wrapper level-item__${item.type}-wrapper`
      itemWrapper.append(itemElement)

      this.itemElements.push(itemWrapper)
    })
  }
}
