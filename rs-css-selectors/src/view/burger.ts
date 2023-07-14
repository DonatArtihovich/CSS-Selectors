const burger: HTMLDivElement | null = document.querySelector('.burger')
const overlay: HTMLDivElement | null = document.querySelector('.levels-list__overlay')
const menu: HTMLDivElement | null = document.querySelector('.levels-list')

enum ActiveClasses {
  body = 'body_locked',
  burger = 'burger_active',
  overlay = 'overlay_active',
  menu = 'levels-list_active'
}

function toggleMenu (): void {
  burger?.classList.toggle(ActiveClasses.burger)
  menu?.classList.toggle(ActiveClasses.menu)
  overlay?.classList.toggle(ActiveClasses.overlay)
  document.body.classList.toggle(ActiveClasses.body)
}

export default function addBurger (): void {
  burger?.addEventListener('click', toggleMenu)
  overlay?.addEventListener('click', toggleMenu)
  menu?.addEventListener('click', e => {
    if (!menu.classList.contains('levels-list_active')) return
    const target: HTMLElement = e.target as HTMLElement
    if (target.classList.contains('level-item') || target.classList.contains('reset-button') ||
      target.classList.contains('level-item__status-image') || target.classList.contains('level-item__header')) {
      toggleMenu()
    }
  })
}
