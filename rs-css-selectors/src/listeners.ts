export function addListeners(): void {
    addViewerTitleListeners()
}

function addViewerTitleListeners(): void {
    const titlesArr: NodeListOf<HTMLPreElement> | null = document.querySelectorAll('.table-tag__content_parent')

    titlesArr.forEach((elem: HTMLPreElement) => {
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
