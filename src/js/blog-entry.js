window.addEventListener('load', () => {
    const anchors = document.getElementsByTagName('a')

    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors.item(i)
        anchor?.setAttribute('target', '_blank')
    }
})