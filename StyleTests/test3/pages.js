const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

var banner

window.onload = ()=>{
    // Set the page banner based on the meta tag
    let bannerImage = document.querySelector("meta[name=page-banner]").content
    banner = document.getElementById('page-banner')
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

    // Events
    resize()
    window.addEventListener('resize', resize)
}
function resize() {
    // Resize Page Banner
    banner.style.height = window.innerHeight * 0.666 + 'px'
}