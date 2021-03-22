const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const codeKeywords = {
    'blue': ['true', 'false', 'var', 'new', 'const'],
    'orange': ['if', 'for', '{', '}', 'repeat'],
    'red': '0123456789'.split('')
}

// Make js file to auto do this seperately, adds link element to page in this file
// use in chrome extension
// use classes to indicate language

var banner
window.onload = ()=>{
    // Add Favicon
    let favicon  = document.createElement('link')
        favicon.rel  = "shortcut icon"
        favicon.type = "image/x-icon"
        favicon.href = "/favicon.ico?v=2"
    document.head.appendChild(favicon)

    // Put the content into a div#main-content
    let mainContent = document.createElement('div')
    mainContent.id = 'main-content'
    mainContent.innerHTML = document.body.innerHTML
    document.body.innerHTML = ''
    
    banner = document.createElement('div')
    banner.id = 'page-banner'

    document.body.appendChild(banner)
    document.body.appendChild(mainContent)

    // Set the page banner based on the meta tag
    let bannerImage = document.querySelector("meta[name=page-banner]").content
    banner.style.backgroundImage = `url(${bannerImage})`

    // Make every other h1 margin left & right reversed
    let h1s = document.getElementsByTagName('h1')
    for(let i = 1; i < h1s.length; i += 2) {
        let style = getComputedStyle(h1s[i])

        h1s[i].style.marginLeft = style.marginRight
        h1s[i].style.marginRight = 0
    }

    // Add Mobile Stylesheet if on mobile
    if(onMobile) {
        let link = document.createElement('link')
        link.rel  = 'stylesheet'
        link.href = './style-mobile.css'

        document.head.appendChild(link)
    }

    // Add Code Coloring Script
    let script = document.createElement('script')
    script.src = '/lib/syntax-highlighting.js' 
    // can add ./ or ../ for testing, but remove them before 
    // going live, so it matches '/lib/code-coloring.js'
    document.body.appendChild(script)

    // Events
    resize()
    window.addEventListener('resize', resize)
}
function resize() {
    // Resize Page Banner
    banner.style.height = window.innerHeight * 0.666 + 'px'
}