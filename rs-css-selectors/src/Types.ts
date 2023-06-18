export interface ILevel {
  correctAnswer: string
  items: IItemObject[]
  viewerTitles: ITitleObject[]
  viewerChildTitle?: string[]
  itemTitles: string[]
  itemElements?: HTMLElement[]
  header: string
}

export type Item = 'plate' | 'apple' | 'cherry' | 'pineapple'

export interface IItemObject {
  type: string
  id: string
}

export interface ITitleObject {
  title: string
  highlight: string[]
  id: string
}
