const languages = {
    'pseudo': {
            'blue': ['true', 'false', 'var', 'new', 'const'],
            'orange': ['if', 'for', '{', '}', 'repeat', 'Vector2', 'Vector3', 'function', 'return'],
            'red': '0123456789'.split('')
    },
    'math': {}
}
const inArray = (value, array) => array.indexOf(value) != -1

// String Functions
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

// Color Code the <code> elements
let codes = document.getElementsByTagName('code')
for(let code of codes) {
    // Determine Language
    let lang
    if(code.className in languages) lang = code.className; else lang = 'pseudo'

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
        for(let color of Object.keys(languages[lang])) {
            ln = colorKeywords(ln, codeKeywords[color], color)
        }
        newLines.push(ln)
    }

    code.innerHTML = newLines.join('\n')

    // Remove anu colors in .green spans
    let greens = document.querySelectorAll('code .green')
    for(let green of greens) {
        spans = green.getElementsByTagName('span')
        for(let span of spans) 
            span.className = 'green'
    }
}