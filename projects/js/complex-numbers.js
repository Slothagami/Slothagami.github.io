var multicanv = new MultiCanv()
const FPS = 30
window.addEventListener("load", () => {
    multicanv.add(".powers-of-minus-one", rotplane, 5, powers_of_minus_one_init, 1/3)
    multicanv.add(".complex-plane", rotplane, 5, complex_plane_init, .4)

    setInterval(() => {multicanv.update()}, 1000 / FPS)
})

function rotplane_init(canv) {
    canv.rotate = true
    canv.rotateDir = 1
    canv.angle  = 0
    canv.real = 1
    canv.imag = 0
    canv.length = 1
    canv.label = new Complex(1)

    canv.readAngle = () => Math.atan2(Math.sin(canv.angle), Math.cos(canv.angle))
    canv.rotSettings = (rotating, reverse=false) => {
        canv.rotate = rotating
        canv.rotateDir = reverse? -1: 1
    }
}
function powers_of_minus_one_init(canv) {
    let controls = canv.controls.querySelectorAll("*")
    let timesMinusOne = controls[0]
    let timesMinusTwo = controls[1]
    let timesTwo      = controls[2]
    let plusOne       = controls[3]
    let minusOne      = controls[4]
    let reset         = controls[5]

    rotplane_init(canv)

    reset        .addEventListener("click", e=>{ canv.label = new Complex(1)})
    timesMinusOne.addEventListener("click", e=>{ canv.label = Complex.mult(canv.label, -1);canv.rotSettings(true)})
    timesMinusTwo.addEventListener("click", e=>{ canv.label = Complex.mult(canv.label, -2);canv.rotSettings(true)})
    timesTwo     .addEventListener("click", e=>{ canv.label = Complex.mult(canv.label, 2) ;canv.rotSettings(true)})
    plusOne      .addEventListener("click", e=>{ canv.label = Complex.sum(canv.label, 1) ;canv.rotSettings(false)})
    minusOne     .addEventListener("click", e=>{ canv.label = Complex.sum(canv.label, -1);canv.rotSettings(false)})
}
function complex_plane_init(canv) {
    let controls = canv.controls.querySelectorAll("*")
    let timesMinusOne = controls[0]
    let timesMinusI   = controls[1]
    let timesI        = controls[2]
    let plusOne       = controls[3]
    let minusOne      = controls[4]
    let plusI         = controls[5]
    let minusI        = controls[6]
    let reset         = controls[7]

    rotplane_init(canv)

    reset        .addEventListener("click", e=>{ canv.label = new Complex(1)})
    timesMinusOne.addEventListener("click", e=>{ canv.label = Complex.mult(canv.label, -1)                ;canv.rotSettings(true)})
    timesMinusI  .addEventListener("click", e=>{ canv.label = Complex.mult(canv.label, new Complex(0, -1));canv.rotSettings(true, true)})
    timesI       .addEventListener("click", e=>{ canv.label = Complex.mult(canv.label, Complex.i)         ;canv.rotSettings(true)})
    plusOne      .addEventListener("click", e=>{ canv.label = Complex.sum(canv.label, 1)                  ;canv.rotSettings(false)})
    minusOne     .addEventListener("click", e=>{ canv.label = Complex.sum(canv.label, -1)                 ;canv.rotSettings(false)})
    plusI        .addEventListener("click", e=>{ canv.label = Complex.sum(canv.label, Complex.i)          ;canv.rotSettings(false)})
    minusI       .addEventListener("click", e=>{ canv.label = Complex.sum(canv.label, new Complex(0, -1)) ;canv.rotSettings(false)})
}

function rotplane(canv) {
    let draw = new CDraw(canv)
    draw.axes(true, false)

    let lerpsp = .3

    let targetAngle  = canv.label.angle()
    let targetLength = Complex.abs(canv.label)

    if(canv.rotate){
        // always rotate counter clockwise
        if(canv.rotateDir ==  1) while (targetAngle < canv.angle) targetAngle += Math.PI * 2
        if(canv.rotateDir == -1) while (targetAngle > canv.angle) targetAngle -= Math.PI * 2

        canv.angle = lerp(canv.angle, targetAngle, lerpsp)
        canv.length = lerp(canv.length, targetLength, lerpsp)

        canv.real = Math.cos(canv.angle) * canv.length
        canv.imag = Math.sin(canv.angle) * canv.length
    } else {
        canv.angle = targetAngle
        canv.length = Math.hypot(canv.real, canv.imag)

        canv.real = lerp(canv.real, canv.label.real, lerpsp)
        canv.imag = lerp(canv.imag, canv.label.imag, lerpsp)
    }

    let gradient = canv.c.createRadialGradient(
        canv.canvas.width / 2, canv.canvas.height/2, 0,
        canv.canvas.width / 2, canv.canvas.height/2, 
        Math.abs(draw.point_x(canv.length) - canv.canvas.width/2)
    )
    gradient.addColorStop(0, Theme.get("dgreen"))
    gradient.addColorStop(1, Theme.get("green"))

    draw.line(0,0, canv.real,canv.imag, gradient, 3)
    draw.point(canv.real, canv.imag, Theme.get("green"), 5)
    draw.text(
        clamp(canv.real, -canv.coord_width * .9, canv.coord_width * .9), 
        canv.imag + .2, canv.label
    )

    draw.point(0,0, "#ffffff88", 2)
}
