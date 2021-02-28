// Gives a random character or string, you convert it to romaji
var input, question, phrases = [...vocab], japaneeseToEnglish = true

window.onload=function() {
    quest = document.getElementById('phrase')
    input = document.getElementById('translation')

    // Select the input
    input.focus()
    input.select()

    newQuestion()

    input.addEventListener('keydown', function(e) {
        if(e.key == 'Enter'){
            if(question.verify(input.value, japaneeseToEnglish)) {
                input.value = '' 
                newQuestion()
            }
        }
    })
}

function newQuestion() {
    //japaneeseToEnglish = Math.round(Math.random()) // True / False
    japaneeseToEnglish = true // untill I van get jp keyboard @ school

    var q = randomIndex(phrases)
    phrases.splice(phrases.indexOf(q), 1)// remove from list, goes through everything at least once

    question = q
    quest.innerHTML = randomIndex(
        japaneeseToEnglish? question.japaneese: question.english
    )

    if(phrases.length == 0) phrases = [...vocab] // Copy the array
}

function randomIndex(array) {
    return array[ Math.round(Math.random() * (array.length-1)) ]
}