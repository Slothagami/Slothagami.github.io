/*
    Preload next song in playlist, some delay when choosing song, 
    but should be none when playing in sequence
*/

var video, progress, playImg, playTitle
const onMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent)
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
            let id    = this.querySelector("data").value
            let img   = this.querySelector("img").src
            let title = this.querySelector("h1").innerText

            playImg.src         = img
            playTitle.innerText = title
            video.src           = Create.videoUrl(id)
        }
    })
}

window.addEventListener("load", ()=>{
    progress  = document.getElementById('progress')
    playImg   = document.getElementById('playing-image')
    playTitle = document.querySelector('#controls h1')
    video     = document.querySelector('video')

    video.volume = 1
    // video.duration video.currentTime video.paused video.pause() video.play()
    let control = document.getElementById('controls')
    control.onclick = ()=> {
        if(video.paused) video.play(); else video.pause()
    }
    setInterval(()=>{
        let perc    = video.currentTime / video.duration,
            elemWid = window.innerWidth * .82,
            wid     = elemWid * perc

        progress.style.width = wid + "px"
        if(onMobile) moveControls()
    }, 250)

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

    if(onMobile) {
        let link = document.createElement("link")
            link.rel  = "stylesheet"
            link.href = "./playlist-mobile.css"
        document.head.appendChild(link)
    }
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
        return `https://drive.google.com/uc?export=download&id=${id}`
    }
}

function forElements(selector, func) {
    let elements = document.querySelectorAll(selector)
    for(element of elements)
        func(element)
}

function moveControls() {
    // move controls to not be behind the video
    let vidHeight = video.getBoundingClientRect().height,
        sourceVidHeight = video.videoHeight

    if(sourceVidHeight > 0) {
        forElements("#playing-image, #controls", e =>{
            e.style.transform = `translate(0, ${-vidHeight}px)`
        })
        // Show Video
        forElements("video", e => {e.style.display = "block"})
    } else {
        forElements("#playing-image, #controls", e =>{
            e.style.transform = `translate(0, 0)`
        })
        // Hide video so it doesn't cover buttons
        forElements("video", e => {e.style.display = "none"})
    }

    console.log(vidHeight)
}