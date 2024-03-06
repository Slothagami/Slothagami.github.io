var canv, c, 
    ui_canv, uic
    mouse = {x:0, y:0}, 
    path_points = [], 
    mouse_click = false,
    n_constants = 100

/* 
    TODO:
        - save/load files with constants
        - change integation precision
        - arm ghost trail
        - add little description
*/

window.addEventListener("load", () => {
    canv = document.querySelector("canvas")
    c    = canv.getContext("2d")

    ui_canv = document.createElement("canvas")
    uic     = ui_canv.getContext("2d")

    resize()
    window.addEventListener("resize", resize)

    canv.addEventListener("mousemove", e => {
        mouse.x = e.x 
        mouse.y = e.y 

        handle_mouse_move()
    })

    canv.addEventListener("mousedown", () => {
        mouse_click = true
    })
    canv.addEventListener("mouseup", () => {
        mouse_click = false
    })


    set_inputs()
    get_inputs()
    requestAnimationFrame(main)
})

function set_inputs() {
    let n_arms        = document.querySelector("#n_arms")
    let n_arms_slider = document.querySelector("#n_arms_slider")

    n_arms.addEventListener("change", () => {
        n_constants = parseInt(n_arms.value)
        n_arms_slider.value = n_arms.value
        start()
    })
    n_arms_slider.addEventListener("input", () => {
        n_constants = parseInt(n_arms_slider.value)
        n_arms.value = n_arms_slider.value
        start()
    })
}

function get_inputs() {
    n_constants = parseInt(document.querySelector("#n_arms").value)
    start()
}

var global_t = 0
var constants
function main() {
    c.clearRect(0,0, canv.width, canv.height)
    c.drawImage(ui_canv, 0, 0)

    if(constants) {
        global_t += 1.5 / path_points.length
        // draw_apx_path(constants, 400)
        draw_arm(constants, global_t)
    }

    requestAnimationFrame(main)
}

function start() {
    if(path_points.length == 0) return
    constants = calculate_constants(n_constants, 1000)
    t = 0
}
function reset() {
    constants = null 
    uic.clearRect(0,0, ui_canv.width, ui_canv.height)
}

function resize() {
    let canvas_width = .8
    canv.width     = window.innerWidth * canvas_width
    canv.height    = window.innerHeight
    ui_canv.width  = window.innerWidth * canvas_width
    ui_canv.height = window.innerHeight

    document.getElementById("content").style.width = window.innerWidth * (1 - canvas_width) + "px"
}

function handle_mouse_move() {
    if(!mouse_click) return
    path_points.push({...mouse}) // copy not reference

    uic.fillStyle = "white"
    // uic.fillRect(mouse.x, mouse.y, 10, 10)
    uic.beginPath()
    uic.arc(mouse.x, mouse.y, 1, 0, Math.PI*2)
    uic.fill()
}

function lerp(min, max, p) {
    return min + (max - min) * p
}

function plerp(a, b, p) {
    return {
        x: lerp(a.x, b.x, p),
        y: lerp(a.y, b.y, p)
    }
}

function path_point(p) {
    p = p % 1

    // interpolates drawing and remaps points to between 0 and 1
    let npoints = path_points.length 
    if(p >= 1 - 1/(path_points.length)) // if high enough to be rounded to last index, return last point
        return path_points[npoints - 1]

    let low_ind  = Math.floor(p * npoints)
    let high_ind = Math.ceil (p * npoints)
    let start_point = path_points[ low_ind]
    let end_point   = path_points[high_ind]

    // interpolate between the two points
    let perc_between = p * npoints - low_ind // decimal part between indecies
    return plerp(start_point, end_point, perc_between)
}

function draw_path(samples) {
    for(let t = 0; t <= 1; t += 1/samples) {
        let point = path_point(t)

        uic.fillStyle = "green"
        uic.fillRect(point.x, point.y, 4, 4)
    }
}

function calculate_constants(n, samples) {
    // puts constants in order [0, 1, -1, 2, -2, 3, -3 ...]
    let constants = [constant(0, samples)]
    for(let i = 1; i < n; i++) {
        constants.push(
            constant( i, samples),
            constant(-i, samples)
        )
    }
    return constants
}

function constant(constant, samples) {
    // approximate integral(e^(-2*pi*i*t)*path(t)) from 0 to 1
    // returns the constant indexed by the argument
    let dt = 1/samples
    let cx = 0, cy = 0
    let pi = Math.PI

    for(let t = 0; t < 1; t += dt) {
        let point = path_point(t)

        // calculate rotation constant:
        let exp_x = Math.cos(-2 * pi * constant * t)
        let exp_y = Math.sin(-2 * pi * constant * t)

        // complex multiplication
        cx += (point.x * exp_x - point.y * exp_y) * dt
        cy += (point.y * exp_x + point.x * exp_y) * dt
    }

    return {x: cx, y: cy}
}

function draw_apx_path(constants, samples) {
    let x = 0, y = 0
    for(let t = 0; t < 1; t += 1/samples) {
        x = constants[0].x
        y = constants[0].y

        for(let i = 1; i < constants.length; i += 2) {
            let speed = (i + 1)/2 // to correspond with labels in the constants
            let pos_const = constants[i]
            let neg_const = constants[i+1] 
            let cos = Math.cos(speed * t * 2 * Math.PI)
            let sin = Math.sin(speed * t * 2 * Math.PI)

            // complex multiply
            x += cos * pos_const.x - sin * pos_const.y
            y += cos * pos_const.y + sin * pos_const.x
            
            // negative constant
            cos = Math.cos(-speed * t * 2 * Math.PI)
            sin = Math.sin(-speed * t * 2 * Math.PI)

            // complex multiply
            x += cos * neg_const.x - sin * neg_const.y
            y += cos * neg_const.y + sin * neg_const.x
        }

        c.fillStyle = "red"
        c.fillRect(x, y, 3, 3)
    }
}

function draw_arm(constants, t) {
    let x = 0, y = 0

    x = constants[0].x
    y = constants[0].y

    let pos = { x, y }

    for(let i = 1; i < constants.length; i += 2) {
        pos = draw_arm_segment(pos, constants,  1, i, t)
        pos = draw_arm_segment(pos, constants, -1, i, t)
    }
}

function draw_arm_segment(pos, constants, dir, i, t) {
    let speed = (i + 1)/2 // to correspond with labels in the constants

    if(dir == -1) i++

    let this_const = constants[i]
    let cos = Math.cos(dir * speed * t * 2 * Math.PI)
    let sin = Math.sin(dir * speed * t * 2 * Math.PI)

    // draw circle
    if (i < constants.length - 1) {
        let radius = Math.hypot(this_const.x, this_const.y)

        c.strokeStyle = Theme.get("gray-3")
        c.globalAlpha = radius * 2e-3 // fade out smaller circles that clutter the image
        c.beginPath()
        c.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        c.stroke()

        c.globalAlpha = 1
    }

    // draw arm segment
    c.strokeStyle = Theme.get("gray-1")
    c.beginPath()
    c.moveTo(pos.x, pos.y)

        // complex multiply
        pos.x += cos * this_const.x - sin * this_const.y
        pos.y += cos * this_const.y + sin * this_const.x
        

    c.lineTo(pos.x, pos.y)
    c.stroke()

    return pos
}
