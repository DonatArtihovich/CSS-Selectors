import { checkAnswer, writeSolution, changeLevelIndex, startLevel } from './game'

export function addListeners (): void {
  addCheckAnswerListener()
  addHelperListener()
  addLevelsMenuListeners()
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

function addHelperListener (): void {
  const helpButton: HTMLButtonElement | null = document.querySelector('.help-button')
  if (helpButton === null) throw new Error('Unexpected null instead of Help button!')

  helpButton.addEventListener('click', writeSolution)
}

function addLevelsMenuListeners (): void {
  const levelsList: NodeListOf<HTMLLIElement> = document.querySelectorAll('.level-item')

  levelsList.forEach((item: HTMLLIElement) => {
    item.addEventListener('click', e => {
      const target: HTMLElement = e.currentTarget as HTMLElement
      if (target.dataset.level === undefined) throw new Error('Unexpected undefined!')
      changeLevelIndex(+target.dataset.level - 1)
      startLevel()
    })
  })
}
