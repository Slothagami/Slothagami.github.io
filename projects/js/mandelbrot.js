var canv, c, 
    frame = {x: -.3, y:0, width: 4, height: 2},
    screen_ratio,
    resolution = 600,
    depth = 200,
    render_mandelbrot = true,
    move_speed = .1,
    zoom_speed = .9,
    julia_x = frame.x,
    julia_y = frame.y
    
window.addEventListener("load", () => {
    canv = document.querySelector("canvas")
    c    = canv.getContext("2d")

    c.imageSmoothingEnabled = false

    resize()
    document.addEventListener("resize", resize)

    // render canvas on settings update 
    document.getElementById("settings").querySelectorAll("select, input").forEach(el => {
        el.addEventListener("change", () => {
            update_parameters()
            render_frame()
        })

        el.addEventListener("input", e => {
            update_parameters()
        })
    })

    window.addEventListener("keydown", e => {
        handle_keypress(e.key, e.shiftKey)
    })

    show_parameters()
    render_frame()
})

function resize() {
    let height = .9
    screen_ratio = (window.innerHeight * height) / window.innerWidth
    frame.height = screen_ratio * frame.width
    
    canv.width  = window.innerWidth
    canv.height = window.innerHeight * height
}

function render_frame() {
    let start_x = frame.x - frame.width / 2
    let start_y = frame.y - frame.height/ 2

    let x_step  = frame.width  / resolution
    let y_step  = frame.height / resolution

    let screen_xstep = canv.width  / resolution + .1
    let screen_ystep = canv.height / resolution + .1

    let screen_px_width  = Math.ceil(screen_xstep)
    let screen_px_height = Math.ceil(screen_ystep)

    for(let xi = 0; xi < resolution; xi++) {
        for(let yi = 0; yi < resolution; yi++) {
            // in mandelbrot cordinates
            let x = start_x + xi * x_step
            let y = start_y + yi * y_step

            // in screen cordinates
            let screen_x = Math.ceil(screen_xstep * xi)
            let screen_y = Math.ceil(screen_ystep * yi)
            
            // color the pixel
            let color
            if(render_mandelbrot) {
                color = mandelbrot(0, 0, x, y)
            } else {
                color = mandelbrot(x, y, julia_x, julia_y)
            }

            // nice looking, but removes sharp details
            // color = color / depth
            // c.fillStyle = `hsl(${Math.cos(color) * 40}, 70%, ${Math.sqrt((-Math.cos(color * 5)+1) * 100*100)}%)`

            color = color / depth // follows that generally it gets brighter in interesting places, and in the other places, you don't need as high depth since those parts already escaped the set
            // c.fillStyle = `rgb(${color*255},${color*255},${color*255})`
            c.fillStyle = `hsl(${Math.cos(color) * 40},70%,${color*100}%)`


            if(color == 0 && x*x+y*y<4) c.fillStyle = "black" // in the set 

            c.fillRect(screen_x, screen_y, screen_px_width, screen_px_height)
        }
    }
}

function mandelbrot(zx, zy, cx, cy) {
    // calculates mandelbrot value at that point
    let new_zx = 0, new_zy = 0
    for(let i = 0; i < depth; i++) {
        // z = (z^2) + c
        new_zx = (zx*zx - zy*zy) + cx
        new_zy = (2 * zx * zy)   + cy

        zx = new_zx
        zy = new_zy

        // check for explosion
        if(zx*zx + zy*zy > 4) {
            return i
        }
    }
    return 0
}

function update_parameters() {
    let s_render     = document.getElementById("render_type").value
    let s_depth      = document.getElementById("depth").value
    let s_resolution = document.getElementById("resolution").value

    depth = s_depth
    resolution = s_resolution

    let p_render = render_mandelbrot
    render_mandelbrot = (s_render == "mandelbrot")

    if(!render_mandelbrot && p_render) {
        // transition into julia set
        frame.x = 0
        frame.y = 0
        frame.width = 4
    } else if(render_mandelbrot && !p_render) {
        // transition into mandelbrot set
        frame.x = julia_x
        frame.y = julia_y
        frame.width = .5
    }
    resize()
    show_parameters()
}

function show_parameters() {
    let s_render     = document.getElementById("render_type")
    let s_depth      = document.getElementById("depth")
    let s_resolution = document.getElementById("resolution")

    document.getElementById("res-prev").innerText = `${Math.round(resolution)} x ${Math.round(resolution * screen_ratio)}`
    document.getElementById("depth-prev").innerText = depth
    update_cordinates()
}

function handle_keypress(key, shift) {
    if(!shift) {
        switch (key) {
            case "w": frame.y -= move_speed * frame.height; break
            case "a": frame.x -= move_speed * frame.width;  break
            case "s": frame.y += move_speed * frame.height; break
            case "d": frame.x += move_speed * frame.width;  break
    
            case "=":
                frame.width  *= zoom_speed
                frame.height *= zoom_speed
                break
    
            case "-":
                frame.width  /= zoom_speed
                frame.height /= zoom_speed
                break
        }
        if(render_mandelbrot) {
            julia_x = frame.x 
            julia_y = frame.y
        }
    } else {
        switch (key) {
            case "W": julia_y -= .001; break
            case "A": julia_x -= .001; break
            case "S": julia_y += .001; break
            case "D": julia_x += .001; break
        }
    }

    update_cordinates()
    render_frame()
}

function update_cordinates() {
    let position_prev = document.getElementById("position-prev")
    let julia_prev    = document.getElementById("julia-prev")

    position_prev.innerText = `Looking at: ${frame.x} + ${frame.y}i`

    if(!render_mandelbrot) {
        julia_prev.innerText = `Julia Set: ${julia_x} + ${julia_y}i`
    } else {
        julia_prev.innerText = ""
    }
}


function download_canvas() {
    // https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
    let a = document.createElement("a")

    let name = "mandelbrot.png"
    if(!render_mandelbrot) {
        name = `julia_${julia_x}_${julia_y}__${frame.x}_${frame.y}_${frame.width}.png`
    } else {
        name = `mandelbrot_${frame.x}_${frame.y}_${frame.width}.png`
    }

    a.setAttribute("download", name)

    canv.toBlob(function(blob) {
      let url = URL.createObjectURL(blob)
      
      a.setAttribute('href', url)
      a.click()
    })
}
