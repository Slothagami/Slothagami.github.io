/*
    if len > 2 {
        div.group-header
            h1 "name"
    }
        div.group
            <songElements>
*/
var video, audio, progress
function setupEvents() {
    forElements(".group-title", e => {
        e.parentNode.querySelector('div.group').style.display = "flex"
        
        e.onclick = function(){
            let node = this.parentNode.querySelector('div.group').style
            node.display = node.display=="none"? "flex": "none"
        }
    })
    forElements(".section-title", e => {
        e.parentElement.querySelector('div.section').style.display = "block"

        e.onclick = function(){
            let node = this.parentElement.querySelector('div.section').style
            node.display = node.display=="none"? "block": "none"
        }
    })
    forElements(".song", e => {
        e.onclick = function() {
            let id = this.querySelector("data").value
            video.src = Create.videoUrl(id)
        }
    })
}

window.addEventListener("load", ()=>{
    progress = document.getElementById('progress')
    audio = document.querySelector('audio')
    audio.volume = 1
    // audio.duration audio.currentTime audio.paused audio.pause() audio.play()
    let control = document.querySelector('.audio-controls')
    control.onclick = ()=> {
        if(audio.paused) audio.play(); else audio.pause()
    }
    setInterval(()=>{
        let perc    = audio.currentTime / audio.duration,
            elemWid = window.innerWidth * .82,
            wid     = elemWid * perc

        progress.style.width = wid + "px"
    }, 250)

    video = document.getElementById("video")

    // Start generating
    let keys = Object.keys(playlist)
    for(let key of keys) {
        let container = document.createElement('div')

        let section = document.createElement("div")
            section.className = "section"

        let title = document.createElement("h1")
            title.innerText = key
            title.className = "section-title"

        container.appendChild(title)

        for(let _group of playlist[key].groups)
            section.appendChild(Create.group(_group.name, _group.songs))

        container.appendChild(section)
        document.body.appendChild(container)
    }

    setupEvents()
})

class Create {
    static song(name, cover, id) {
        let div = document.createElement("div")
            div.className = "song"

        let img = document.createElement("img")
            img.src       = `./images/covers/${cover}`
            img.className = "song-cover"

        let h1 = document.createElement('h1')
            h1.innerText = name

        let data = document.createElement('data')
            data.value = id

        div.appendChild(img)
        div.appendChild(h1)
        div.appendChild(data)

        return div
    }
    static group(name, songs) {
        let container = document.createElement("div")
        
        let title = document.createElement("h1")
            title.innerText = name
            title.className = 'group-title'
        
        container.appendChild(title)
    
        let _group = document.createElement('div')
            _group.className = "group"
    
        for(let songArray of songs) {
            _group.appendChild(Create.song(songArray[0], songArray[1], songArray[2]))
        }
    
        container.appendChild(_group)
        return container
    }
    static videoUrl(id) {
        return `https://drive.google.com/uc?id=${id}`
    }
}

function forElements(selector, func) {
    let elements = document.querySelectorAll(selector)
    for(element of elements)
        func(element)
}