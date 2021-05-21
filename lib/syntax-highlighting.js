class Language {
    constructor(keywords, builtins, commentMarker, func=Language.standard) {
        let kwList = Language.cleanList(keywords).join('|')
        let biList = Language.cleanList(builtins).join('|')

        this.keywordsRegex = new RegExp(`(.?)(${kwList})([ .;\[(])`, 'g')
        this.builtinsRegex = new RegExp(`(.?)(${biList})([ .;\[(])`, 'g')

        this.commentMarker = Language.cleanString(commentMarker)

        this.func = func
    }
    static cleanList(list) {
        let nList = []
        for(let item of list) {
            nList.push(Language.cleanString(item))
        }
        return nList
    }
    static cleanString(str) {
        return str.replaceAll(/[\^*\-+?]/g, (a)=>{
            return '\\' + a
        })
    }
    static classRegex(str, regex, class_) {
        return str.replaceAll(regex, (a, b, c, d)=>{
            if(/\t|\s|[:;.,/*-=+\\()\[\]]/.test(b) || b == '')
                return `${b}<span class=${class_}>${c}</span>${d}`
            else
                return b + c + d
        })
    }
    static simpleClassRegex(str, regex, class_) {
        return str.replaceAll(regex, (a)=>{
            return `<span class=${class_}>${a}</span>`
        })
    }
    static standard(str) {
        // Strings & Digits
        str = Language.simpleClassRegex(str, /-?\d(\d|\.)*/g, '-digit')
        str = Language.simpleClassRegex(str, /('.*?'|".*?"|`.*?`)/g, '-string')

        str = Language.simpleClassRegex(str, /{|}/g, '-builtin')
        str = Language.classRegex(str, /(\s|\S?)(\w+)(\(.*\))/g, '-function')

        return str
    }

    colorCode(str) {
        // Remove Comments from every line
        let lines = str.split('\n')
        let comments = []
        let commentRegex = new RegExp(`${this.commentMarker}.*`, 'g')

        for(let i = 0; i < lines.length; i++) {
            let comment = ''
            lines[i] = lines[i].replace(commentRegex, (a)=>{
                comment = `<span class=-comment>${a}</span>`
                return ''
            })
            comments.push(comment)
        }
        str = lines.join('\n')

        // Keywords & Builtins
        str = Language.classRegex(str, this.keywordsRegex, '-keyword')
        str = Language.classRegex(str, this.builtinsRegex, '-builtin')

        // Custom Parts
        str = this.func(str)

        // Add comments back
        lines = str.split('\n')
        for(let i = 0; i < lines.length; i++)
            lines[i] += comments[i]

        str = lines.join('\n')

        return str
    }
}

const languages = {
    'js': new Language(
        [
            'var',        'const',  'let', 
            'this',       'Math',   'document', 
            'window',     'new',    'static',
            'instanceof', 'typeof', 'in',
            'of',         'true',   'false',
            'return',     'class'
        ],
        ['function', 'for', 'if'],
        '//'
    ),
    'pseudo': new Language(
        [
            'var', 'const', 'this', 'new', 'true', 'false', 'return'
        ],
        ['function', 'for', 'if', 'repeat'],
        '//'
    ),
    'math': new Language([],[],'#', str=>str)
}

let codes = document.getElementsByTagName('code')
for(let code of codes) {
    // Get first class that matches a language
    let lang = 'pseudo'
    let langs = Object.keys(languages)
    for(let class_ of code.classList) {
        let index = langs.indexOf(class_)
        if(index != -1) {
            // if in the list
            lang = langs[index]
        }
    }

    let html = code.innerHTML.trim()
    code.innerHTML = languages[lang].colorCode(html)
}
