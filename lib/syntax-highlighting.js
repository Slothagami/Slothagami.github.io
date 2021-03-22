const lang = {
    'js': {
        comment: {
            regex:/\/\/.*/g, 
            color:'green'
            // Multiline "/**/" Comments are not supported yet
        },
        keywords: {
            'blue':   ['var', 'const', 'let', 'this', 'Math', 'document', 'window', 'new'],
            'orange': ['function', 'for', '{', '}', 'if'],
            'red':    [/'.*'/g, /".*"/g, /\d+/g]
        }
    },
    'template': {
        comment: {
            regex:/\/\/.*/g, 
            color:'green'
            // Multiline "/**/" Comments are not supported yet
        },
        keywords: {
            'blue':   ['var', 'const', 'this', 'new'],
            'orange': ['function', 'for', '{', '}', 'if'],
            'red':    [/'.*'/g, /".*"/g, /\d+/g]
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
        let commentRegex = lang[language].comment.regex
        line = line.replaceAll(commentRegex, function(a) {
            comment = a
            return ''
        })

        // Keywords
        let lan = lang[language].keywords
        for(let key of Object.keys(lan)) {
            let list = lan[key]

            for(let keyword of list) {
                if(typeof keyword == 'string') {
                    // Color it 'key'
                    let regex = new RegExp(`( ?)(${keyword})(.| |\\[|\\(|{?)`, 'g')
                    //line = line.replaceAll(regex, `<span class=${key}>${keyword}</span>`)
                    line = line.replaceAll(regex, function(a, b, c, d){
                        // b, c & d are the groups in the regex
                        return `${b}<span class=${key}>${c}</span>${d}`
                    })

                } else if (keyword instanceof RegExp) {

                    // Use the result (group 0) as the content
                    let regex = keyword
                    line = line.replaceAll(regex, function(a){
                        return `<span class=${key}>${a}</span>`
                    })
                }
            }
        }

        line += `<span class=${lang[language].comment.color}>${comment}</span>`
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