const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const codeKeywords = {
    'blue': ['true', 'false'],
    'orange': ['if', 'for', '{', '}', 'repeat'] 
}

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

    // Color Code the <code> elements
    let codes = document.getElementsByTagName('code')
    for(let code of codes) {
        let lines = code.innerHTML.trim().split('\n')
        let newLines = []

        for(line of lines) {
            // Color Code Text
            let s = line.search('//')
            let ln = line

            if(s != -1) {
                // Insert <span class=green> at spot, and append /span
                ln = ln.insert(s, '<span class="green">')
                ln += '</span>'
            }

            // Color text based on codeKeywords const
            for(let color of Object.keys(codeKeywords)) {
                ln = colorKeywords(ln, codeKeywords[color], color)
            }

            newLines.push(ln)
        }

        code.innerHTML = newLines.join('\n')
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

String.prototype.insert = function(index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substr(index);

    return string + this
}

function colorKeyword(str, keyword, color) {
    // Colors all instances of a single word
    return str.replaceAll(keyword, `<span class="${color}">${keyword}</span>`)
}
function colorKeywords(str, keywords, color) {
    // Colors a list of words the same color
    for(let word of keywords) 
        str = colorKeyword(str, word, color)
    return str
}