// Gives a random character or string, you convert it to romaji
var input, question, phrases = [...vocab]

window.onload=function(){
    quest = document.getElementById('phrase')
    input = document.getElementById('translation')

    // Select the input
    input.focus()
    input.select()

    newQuestion()

    input.addEventListener('keydown', function(e) {
        if(e.key == 'Enter'){
            if(question.verify(input.value)) {
                input.value = '' 
                newQuestion()
            }
        }
    })
}

function newQuestion() {
    var q = randomIndex(phrases)
    phrases.splice( phrases.indexOf(q), 1 )// remove from list, goes through everything at least once

    question = q
    quest.innerHTML = randomIndex(question.japaneese)

    if(phrases.length == 0) phrases = [...vocab] // Copy the array
}

function randomIndex(array) {
    return array[ Math.round(Math.random() * (array.length-1)) ]
}