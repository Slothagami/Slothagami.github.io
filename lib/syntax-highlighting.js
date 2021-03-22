/* Add this CSS To Color it
code        {color:#d8d8d8}
.-keyword   {color:#3398c4}
.-comment   {color:#2a8a67}
.-builtin   {color:#e97f42}
.-digit,
.-string    {color:#d32626}
.-operator  {color:#999999}
*/

const lang = {
    'js': {
        comment: /\/\/.*/g,
        groups: {
            '-keyword':   [
                'var',    'const', 'let', 
                'this',   'Math',  'document', 
                'window', 'new',   /=>/
            ],
            '-builtin':   ['function', 'for', '{', '}', 'if'],
            '-string':    [/'.*'/, /".*"/],
            '-digit':     [/\-?\d+/]
        }
    },
    'template': {
        comment: /\/\/.*/g, // Multiline "/**/" Comments are not supported yet
        groups: {
            'blue':   ['var', 'const', 'this', 'new'],
            'orange': ['function', 'for', '{', '}', 'if'],
            'red':    [/'.*'/, /".*"/, /\d+/]
        }
    }
}

let codes = document.getElementsByTagName('code')
for(let code of codes) {
    // First split it by lines
    // do comments first remove it from the string, and add agiain at the end
    // Get language from class
    let language = langFromTags(code)

    let lines = code.innerHTML.split('\n')
    let newLines = []
    for(let line of lines) {
        // for each keyword in the language

        // do comments and remove them first, add at end
        let comment = ''
        let commentRegex = lang[language].comment
        line = line.replaceAll(commentRegex, function(a) {
            comment = a
            return ''
        })

        // Keywords
        let lan = lang[language].groups
        for(let key of Object.keys(lan)) {
            let list = lan[key]

            for(let keyword of list) {
                if(typeof keyword == 'string') {
                    //console.log(keyword)
                    // Color it 'key'
                    let regex = new RegExp(`( ?)(${keyword})(.| |\\[|\\(|{?)`, 'g')
                    //line = line.replaceAll(regex, `<span class=${key}>${keyword}</span>`)
                    line = line.replaceAll(regex, function(a, b, c, d){
                        // b, c & d are the groups in the regex
                        return `${b}<span class=${key}>${c}</span>${d}`
                    })

                } else if (keyword instanceof RegExp) {

                    // Use the result (group 0) as the content
                    //let regex = keyword
                    let regex = new RegExp(keyword, 'g')
                    line = line.replaceAll(regex, function(a){
                        return `<span class=${key}>${a}</span>`
                    })
                }
            }
        }

        line += `<span class=-comment>${comment}</span>`
        newLines.push(line)
    }

    let html = newLines.join('\n')
    code.innerHTML = html
}

function langFromTags(element) {
    let tags = element.classList
    if(tags.length == 0) return 'template'

    // find a value in the tags that matches a defined language
    for(tag of tags) {
        let index = Object.keys(lang).indexOf(tag)
        if(index != -1) {
            return Object.keys(lang)[index]
        }
    }
}