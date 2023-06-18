import { type ILevel, type IItemObject, type ITitleObject } from './Types'

export class Level implements ILevel {
  public correctAnswer: string
  public items: IItemObject[]
  public viewerTitles: ITitleObject[]
  public viewerChildTitle?: string[]
  public itemTitles: string[]
  public itemElements: HTMLElement[]
  public childItemElements: HTMLElement[]
  public header: string
  constructor ({
    correctAnswer,
    items,
    viewerTitles,
    itemTitles,
    header
  }: ILevel) {
    this.correctAnswer = correctAnswer
    this.items = items
    this.viewerTitles = viewerTitles
    this.itemTitles = itemTitles
    this.header = header
    this.itemElements = []
    this.childItemElements = []
    this.createItemElements()
  }

  private createItemElements (): void {
    this.items.forEach((item: IItemObject) => {
      const itemElement: HTMLElement = document.createElement('img')
      itemElement.className = `level-item__picture ${item.type}-picture`
      itemElement.setAttribute('src', `./assets/img/${item.type}.png`)
      itemElement.id = item.id

      this.itemElements.push(itemElement)
    })

    // if (this.childItems != null) {
    //   this.childItems.forEach(item => {
    //     const itemElement: HTMLElement = document.createElement('img')
    //     itemElement.className = `level-item__picture ${item}-picture`
    //     itemElement.setAttribute('src', `./assets/img/${item}.png`)

    //     this.childItemElements.push(itemElement)
    //   })
    // }
  }
}
