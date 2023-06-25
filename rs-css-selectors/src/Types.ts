export interface ILevel {
  number: number
  correctAnswer: string
  items: IItemObject[]
  viewerTitles: ITitleObject[]
  activeItems: string[]
  itemElements?: HTMLElement[]
  header: string
  createItemElements?: () => void
}

export type Item = 'plate' | 'apple' | 'cherry' | 'pineapple'

export interface IItemObject {
  type: string
  highlight: string[]
  id: string
  number?: number
}

export interface ITitleObject {
  title: string
  highlight: string[]
  id: string
}
