const navBtn = document.getElementById('nav-btn')
const navItems = document.getElementById('nav-items')
const navHeader = document.getElementById('nav-header')
const nav = document.querySelector('nav')
const navMd = document.getElementById('nav-md')
const navMdTitle = document.getElementById('nav-md-title')
navItems.style.display = 'none'

navBtn.addEventListener('click', () => {
    if (navItems.style.display == 'none') {
        navItems.style.display = 'flex'
        navItems.setAttribute('aria-expanded', 'true')
        navItems.setAttribute('aria-hidden', 'false')
    } else if (navItems.style.display == 'flex') {
        navItems.style.display = 'none'
        navItems.setAttribute('aria-expanded', 'false')
        navItems.setAttribute('aria-hidden', 'true')
    }
})

function navIcon(icon) {
    icon.classList.toggle('change')
}

window.addEventListener('load', () => {
    document.getElementById('date').innerText = new Date().getFullYear()
})