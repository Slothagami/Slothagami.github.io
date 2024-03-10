function init_demo(canv) {
    canv.coord_width = 1
}

var vectors = []
function demo(canv) {
    canv.draw.axes()
    let n  = canv.controls.n
    let dt = canv.controls.dt

    let y  = 0
    let x  = -.1

    for(let i = 0; i < n; i++) {
        let t = i * dt
        let p_point = new Point(x, y)
        y += v_y(t) * dt
        x += v_x(t) * dt
        canv.draw.vector(p_point, new Point(x, y), "blue")
    }
    canv.draw.point(new Point(x, y))
}

function v_y(t) {
    return Math.sin(2*Math.PI*t)
}
function v_x(t) {
    return Math.cos(2*Math.PI*t*4)
}
