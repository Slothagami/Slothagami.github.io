function Anime(name, ops) {
    this.name = name;
    this.ops = ops;

    this.makeElement = function() {
        // if this.ops.length == 1, dont put it inthe .video, Change name to this.name + this.ops[i].name
        var oneSong = this.ops.length <= 2,
            html = oneSong? '': '<div class="anime"><h1>'+ this.name +'</h1>',
            display = oneSong? 'block': 'none'

        for(var i in this.ops){
            var name = oneSong? this.name +' '+ this.ops[i].name: this.ops[i].name

            html += [
                '<div class="video" style="display:'+ display +'">',
                    '<data value="'+ this.ops[i].videoid +'"></data>',
                    '<table>',
                        '<tr>',
                            '<th><img src="'+ this.ops[i].imgUrl +'/0.jpg"></th>',
                            '<th><p>'+ name +'</p></th>',
                        '</tr>',
                    '</table>',
                '</div>'
            ].join('\n')
        }

        html += oneSong? '': '</div>'

        return html
    }
}
function Op(name, videoid) {
    this.name = name
        .replace('OP', 'Opening')
        .replace('ED', 'Ending');

    this.videoid = videoid;
    this.url = 'https://www.youtube.com/watch?v='+ this.videoid
    this.imgUrl = 'http://img.youtube.com/vi/'+ this.videoid
}

const animes = {
    'All': [
        new Anime(
            'Keep Your Hands Off Eisoken',
            [
                new Op('OP', '8-91y7BJ8QA'),
                new Op('ED', 'i2TnlfmzS2I')
            ]
        ),
        new Anime(
            'Tonikawa',
            [
                new Op('OP', 'vQiodbKEW6s'),
                new Op('ED', '1dVfPq0wnrA')
            ]
        ),
        new Anime(
            'Kuma Kuma Kuma Bear',
            [
                new Op('OP', 'VVsZRUQ8YH4'),
                new Op('ED', 'IFxnpQadK48')
            ]
        ),
        new Anime(
            'Cells At Work!',
            [
                new Op('OP', 'QYfdanAahVI'),
                new Op('ED', '')
            ]
        ),
        new Anime(
            'Eromanga Sensei',
            [
                new Op('OP', 'DeGw8-KwxM4'),
                new Op('ED', 'UzFArt9M7JM')
            ]
        ),
        new Anime(
            'Rent a Girfriend',
            [
                new Op('OP', 'cM1WSovcn4I'),
                new Op('ED', 'lYUdHGhxCw4')
            ]
        ),
        new Anime(
            'Sleepy Princess in the Demon Castle',
            [
                new Op('OP', 'Ui-KKFZKIq4'),
                new Op('ED', 'q1cDaXNe_wI')
            ]
        ),
        new Anime(
            'Toilet Bound Hanako-kun',
            [
                new Op('OP', 'OpjAZBjL7_M'),
                new Op('ED', '7wOD-9jwbJQ')
            ]
        ),
        new Anime(
            'How Not to Summon a Demon Lord',
            [
                new Op('OP', 'UcCTFOEls9g'),
                new Op('ED', 'ZHA6k4kZT-g')
            ]
        ),
        new Anime(
            'Kaguya-sama: Love is War',
            [
                new Op('OP 1', '_4NjEOtSQww'),
                new Op('OP 2', 'lTlzDfhPtFA'),
                new Op('Special ED', 'dfzBfJP2MM8')
            ]
        ),
        new Anime(
            'Punch Line!',
            [
                new Op('OP', '3v_USHwhxe8'),
                new Op('ED', 'v2cDzNotFH4')
            ]
        ),
        new Anime(
            'I don\'t want to get Hurt, so I\'ll Max Out my Defence',
            [
                new Op('OP', '78O4fKcbN28'),
                new Op('ED', 'cROnVpARJ0U')
            ]
        ),
        new Anime(
            'That Time I got Reincarnated as a Slime',
            [
                new Op('OP', 'GhGTc6p8sg0'),
                new Op('ED', 'At5CKBz9QJA')
            ]
        ),
        new Anime(
            'No Game No Life',
            [
                new Op('OP', '6CBp4qylX6I')
            ]
        ),
        new Anime(
            'Tower of God',
            [
                new Op('OP', 'apII5VFTce0'),
                new Op('ED', 'udwtU4OtQRM')
            ]
        ),
        new Anime(
            'Assasination Classroom',
            [
                new Op('OP 1', 'KS9UfmCFn_Y'),
                new Op('OP 2', 'iug12DnMNHQ'),
                new Op('OP 3', 'tNZ-6xLUoCA'),
                new Op('OP 4', 'c_J7ybxenOQ')
            ]
        ),
        new Anime(
            'Mob Psycho 100',
            [
                new Op('OP 1', 'Bw-5Lka7gPE'),
                new Op('OP 2', '86I43asqndI')
            ]
        ),
        new Anime(
            'One Punch Man',
            [
                new Op('OP 1', 'atxYe-nOa9w'),
                new Op('OP 2', 'uihJATVggz8')
            ]
        ),
        new Anime(
            'Demon Slayer',
            [
                new Op('OP', 'pmanD_s7G3U'),
                new Op('ED', 'qz9nueM1AZU')
            ]
        ),
        new Anime(
            'Dr. Stone',
            [
                new Op('OP', 'tF4faMbs5oQ')
            ]
        ),
        new Anime(
            'Charlotte',
            [
                new Op('OP', 'VlQSWmzcG58'),
                new Op('ED', 'sLo5ulePYc0')
            ]
        ),
        new Anime(
            'Sword Art Online',
            [
                new Op('OP', 'OsLY7DXWsF4')
            ]
        ),
        new Anime(
            'Darling in the FranXX',
            [
                new Op('ED', 't-p_PZybvCo')
            ]
        ),
        new Anime(
            'Rising of the Shield Hero',
            [
                new Op('OP 1', 'jZvFEtR8RH0'),
                new Op('OP 2', 'HutPrLMPWw0')
            ]
        ),
        new Anime(
            'My Hero Academia',
            [
                new Op('OP 1', '-77UEct0cZM'),
                new Op('OP 2', 'Q7w5IMyJ3pM'),
                new Op('OP 3', '2ieT6Vh7jZE'),
                new Op('OP 4', 'iBRH9Po3gw8'),
                new Op('OP 5', 'W-d3kAf2NYw'),
                new Op('OP 6', '6OJxjAefwXc'),
                new Op('OP 7', 'JY9FLZDicLQ'),
                new Op('ED 1', 'mz5Wk84MDPA'),
                new Op('ED 2', '2jKT40EWHEA'),
                new Op('ED 3', 'hXdCTFmfwOo'),
                new Op('ED 4', 'avaf8qlRaqA'),
                new Op('ED 5', 'JTeI7y-eMpQ'),
                new Op('ED 6', 'efjef5btZqE'),
                new Op('ED 7', 'gvAVB4G26RQ'),
                new Op('Heroes Rising Theme', 'lGfj6kIV_s8')
            ]
        ),
        new Anime(
            'Deca Dense',
            [
                new Op('OP', 'jQZm1wf3O_8'),
                new Op('ED', '285wxlCHung')
            ]
        ),
        new Anime(
            'Overlord',
            [
                new Op('OP 1', 'KOWcj7XKnfQ'),
                new Op('OP 2', '4DpKM9AG2n0'),
                new Op('OP 3', 'pSKc6HubBd4'),
                new Op('ED 1', 'ChayFwyFvPk'),
                new Op('ED 2', 'KFMG_6r4YB4'),
                new Op('ED 3', 'DYKOFBIrzGg')
            ]
        ),
        new Anime(
            'Glepnir',
            [
                new Op('OP', 'l5WY1WcXvIc'),
                new Op('ED', 'UPIn7jexQbI')
            ]
        ),
        new Anime(
            'Re:ZERO',
            [
                new Op('OP 1','0Vwwr3VGsYg'),
                new Op('OP 2','iu_0kOfMGD0'),
                new Op('OP 3','UfI2gE0-Gc0'),
                new Op('ED 1','JhCPPQ5PBdk'),
                new Op('ED 2','b5Nud2MMRo4'),
                new Op('ED 3','lQaufCqi5v4')
            ]
        ),
        new Anime(
            'Ajin',
            [
                new Op('OP 1', '26lUTSV-i1c'),
                new Op('OP 2', '0SZbsHhv59I')
            ]
        ),
        new Anime(
            'Tokyo Ghoul',
            [
                new Op('OP', '7aMOurgDB-o')
            ]
        ),
        new Anime(
            'The Misfit of Demon Academy',
            [
                new Op('OP', '8fQyq6LHiW4'),
                new Op('ED', 'ij3hV0Nt1eE')
            ]
        ),
        new Anime(
            'Blue Exorcist',
            [
                new Op('OP 1', '80-W822k6Vw'),
                new Op('OP 2', 'Pyv3ScHSCmE'),
                new Op('OP 3', 'PzcRgzM7wk8'),
                new Op('ED 1', 'Tr4xOjIgIyM'),
                new Op('ED 2', '5q6vmSGx2qE'),
                new Op('ED 3', 'eJ7h0-o6PMI')
            ]
        ),
        new Anime(
            'Fire Force',
            [
                new Op('OP 1', 'JBqxVX_LXvk'),
                new Op('OP 2', 't0WClcc-aVs'),
                new Op('OP 3', 'xLGtT8WuidM'),
                new Op('OP 4', 'KHCxRK2px1s'),
                new Op('ED 1', 'geE49ne2mQg'),
                new Op('ED 2', 'jbTO40J4ENs'),
                new Op('ED 3', 'RE85eNhqj3g'),
                new Op('ED 4', 'D7ioXBZQbbk')
            ]
        ),
        new Anime(
            'Attack on Titan',
            [
                new Op('OP 1', '8OkpRK2_gVs'),
                new Op('OP 2', 'CID-sYQNCew'),
                new Op('OP 5', '0dK7JgKivQM')
            ]
        ),
        new Anime(
            'Talentless Nana',
            [
                new Op('OP', 'yJPt5t5rpFc'),
                new Op('ED', '3xheGVcLPBQ')
            ]
        ),
        new Anime(
            'The Promised Neverland',
            [
                new Op('OP', '4GDVEl3qw2M'),
                new Op('ED', '')
            ]
        ),
        new Anime(
            'Fullmetal Alchemist',
            [
                new Op('OP 1', 'X59yPeVk_70'),
                new Op('OP 2', 'UqIahGU9ZtY'),
                new Op('OP 3', 'et7oxRRkPEo'),
                new Op('OP 4', 'KMZBauH47Jo')
            ]
        ),
        new Anime(
            'Akudama Drive',
            [
                new Op('OP', 'EX0LwdYVUp4'),
                new Op('ED', 'P4ZPWnPKC0k')
            ]
        ),
        new Anime(
            'The Day I Became a God',
            [
                new Op('OP', 'iQRqhUF1aLw'),
                new Op('ED', 'PvG9JlROtr0')
            ]
        ),
        new Anime(
            'Kakushigoto',
            [
                new Op('OP', 'Wc1QTLk-Kz8'),
                new Op('ED', 'ewlh3iZArhs')
            ]
        ),
        new Anime(
            'ERASED',
            [new Op('OP', 'fodAJ-1dN3I')]
        ),
        new Anime(
            'Anohana',
            [
                new Op('OP', '4HHcnKgOyTQ'),
                new Op('ED', 'JRF5TIhshlo')
            ]
        ),
        new Anime(
            'Your Name',
            [new Op('Theme', 'a2GujJZfXpg')]
        ),
        new Anime(
            'Higarashi: When they Cry',
            [
                new Op('OP', 'soQjR5_GHXI'),
                new Op('ED', 'E4_pLpqerqQ')
            ]
        ),
        new Anime(
            'Love, Chunibyo & other Delusions',
            [
                new Op('OP 1', 'GRNhN8et8WE'),
                new Op('OP 2', 'vuRTsE3z8ks'),
                new Op('ED 1', 'sKRZY-mJQak'),
                new Op('ED 2', 'FIrLn-MaaSU')
            ]
        ),
        
    ],
}

function play(id) {
    var lengthExeptions = ['dfzBfJP2MM8', 'lGfj6kIV_s8'], // Videos longer than 1:30 (in orner of list)
        playFullSong = id in lengthExeptions, // doesn't seem to work
        args = {
            'videoId': id,
            'startSeconds': 0,
            //'endSeconds': 90
        }

    if(!playFullSong) args['endSeconds'] = 90
    player.loadVideoById(args);
}

var vidIds = [], vidPos = 0, keepPlaying = true, lastLoad = new Date().getTime()
window.onload = function() {
    // Make Elements from the list
    var html = '',
        target = document.getElementById('playlist') // where to put the html

    var entries = Object.entries(animes)
    for(var i = 0; i <= entries.length-1; i++) {
        var key = entries[i][0]
        html += `<div class='folder'><h2>${key}</h2><div class='foldercontent'>`// style="display:none">`
        console.log(key)

        for(var j in animes[key])
            html += animes[key][j].makeElement()

        html += '</div></div>'
    }

    target.innerHTML = html;

    // Give the Event Handlers
    // For Titles
    var titles = document.getElementsByTagName('h1')
    for(var i = 0; i < titles.length; i++) {
        titles[i].onclick = function() {
            // Show / Hide all .video elements in the same .anime div
            videos = this.parentNode.getElementsByClassName('video')
            for(var i in videos) {
                videos[i].style.display = 
                    videos[i].style.display == 'none'? 
                        'block': 'none'
            }
        }
    }
    titles = document.getElementsByTagName('h2')
    for(var i = 0; i < titles.length; i++) {
        titles[i].onclick = function() {
            // Show / Hide the .foldercontent div
            content = this.parentNode.getElementsByClassName('foldercontent')[0]
            console.log(content)

            content.style.display = 
                content.style.display == 'none'? 
                    'block': 'none'
        }
    }

    // For Videos
    var videos = document.getElementsByClassName('video')
    for(var i in videos) {
        videos[i].onclick = function() {
            var data = this.getElementsByTagName('data')[0]

            //player.loadVideoById(data.value, 0, 'large')
            play(data.value)

            vidPos = vidIds.indexOf(data.value) + 1
            //console.log(vidPos)
        }
    }

    // For the keepplaying button
    var keepplaying = document.getElementById('keepplaying')

    keepplaying.onclick = function() {
        switch(this.innerHTML) {
            case 'Autoplay - On':
                this.innerHTML = 'Autoplay - Off'
                keepPlaying = false
                break;

            case 'Autoplay - Off':
                this.innerHTML = 'Autoplay - On'
                keepPlaying = true
                break;
        }
    }
    keepplaying.innerHTML = 'Autoplay - On'

    // Display Playlist Length
    var videos = document.getElementsByClassName('video')
    document.getElementById('playlistlength').innerHTML = videos.length

    for(var i = 0; i < videos.length; i++)
        vidIds.push(videos[i].getElementsByTagName('data')[0].value)

    // Mobile CSS
    if(sg.onMobile()) {
        addCss('./resources/opsMobile.css')
    }
}

function addCss(fileName) {

    var head = document.head;
    var link = document.createElement("link");
  
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
  
    head.appendChild(link);
}