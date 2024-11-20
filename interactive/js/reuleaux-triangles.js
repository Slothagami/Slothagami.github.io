var canv
window.addEventListener("load", () => {
    canv = document.querySelector("canvas")
    
    const resize = ()=> {
        canv.width  = window.innerWidth
        canv.height = window.innerHeight
    }
    resize()
    document.addEventListener("resize", resize)
})

function render(canv) {
    // setup
    canv.disable_auto_resize()
    canv.set_scale(1.5)

    let r = canv.controls.r
    let R = 1 // Math.sqrt(3) - 1
    
    // solution
    let p = r/R
    let a = (p**2 - 2) / 2
    let angle = Math.atan(Math.sqrt(p**2-a**2)/a) - pi/3
    // angle *= -1 // for the second solution

    // drawing
    let triangle_rot = pi
    let vertex = new Vector(0, 1)
    let R_vertex = vertex.scale(R).rotate(triangle_rot + 2*pi/3)
    let r_vertex = vertex.scale(r).rotate(triangle_rot + angle - 2*pi/3)

    canv.draw.angle_between(r_vertex, R_vertex, Vector.zero, 50)
    canv.draw.vector(Vector.zero, R_vertex, "gray-4", "R")
    if(show_solution) canv.draw.circle(Vector.zero, r, "gray-4")
    canv.draw.vector(Vector.zero, r_vertex, "blue", "r", -1)

    draw_releaux(canv, Vector.zero, R, triangle_rot, "white", true)
    draw_releaux(canv, Vector.zero, r, angle + triangle_rot, "blue")
}

function draw_releaux(canv, pos, size, angle, color="white", scribe=false) {
    let corner1 = new Vector(0, 1).scale(size).rotate(angle).add(pos)
    let corner2 = corner1.rotate(2*pi/3).add(pos)
    let corner3 = corner2.rotate(2*pi/3).add(pos)

    color = get_color(color)
    canv.c.lineWidth = 2

    // draw inscribed triangle
    // canv.draw.line(corner1, corner2, "gray-3")
    // canv.draw.line(corner2, corner3, "gray-3")
    // canv.draw.line(corner3, corner1, "gray-3")

    // first arc 
    let ang1 = -corner3.sub(corner1).angle()
    let ang2 = -corner2.sub(corner1).angle()

    if(scribe && show_solution) canv.draw.arc(corner1, size * Math.sqrt(3), 0, 2*pi, "gray-4")
    canv.draw.arc(corner1, size * Math.sqrt(3), ang1, ang2, color)
    
    // second arc 
    ang1 = -corner1.sub(corner2).angle()
    ang2 = -corner3.sub(corner2).angle()

    canv.draw.arc(corner2, size * Math.sqrt(3), ang1, ang2, color)

    // third arc 
    ang1 = -corner2.sub(corner3).angle()
    ang2 = -corner1.sub(corner3).angle()

    canv.draw.arc(corner3, size * Math.sqrt(3), ang1, ang2, color)
}
