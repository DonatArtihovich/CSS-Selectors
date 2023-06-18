import { checkAnswer } from './game'

export function addListeners (): void {
  const titlesArr: NodeListOf<HTMLPreElement> | null = document.querySelectorAll('.table-tag__content_parent')
  const itemsArr: NodeListOf<HTMLImageElement> | null = document.querySelectorAll('.level-item__picture')
  addHighlightListeners(titlesArr)
  addHighlightListeners(itemsArr)
  addCheckAnswerListener()
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
      })
    })

    elem.addEventListener('mouseleave', () => {
      if (elem.dataset.highlight === undefined) throw new Error('Unexpected undefined')
      const highlightedElements = JSON.parse(elem.dataset.highlight)
      highlightedElements.forEach((id: string) => {
        const hElem: HTMLElement | null = document.getElementById(id)
        if (hElem == null) throw new Error('Unexpected null')

        hElem.classList.remove('highlighted')
      })
    })
  })
}

function addCheckAnswerListener (): void {
  const enterButton: HTMLButtonElement | null = document.querySelector('.css-editor__enter-button')
  if (enterButton === null) throw new Error('Unexpected null instead of enter button!')
  const enterInput: HTMLInputElement | null = document.querySelector('.css-editor__input')
  if (enterInput === null) throw new Error('Unexpected null instead of input!')

  enterButton.addEventListener('click', () => {
    checkAnswer(enterInput.value)
  })
  enterInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    checkAnswer(enterInput.value)
  })
}
