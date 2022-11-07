var multicanv = new MultiCanv()
const FPS = 30
var cam_dist = 4
var gray, green
window.addEventListener("load", () => {
    multicanv.add("#no-proj", no_projection, 4, undefined, 1/3)
    multicanv.add("#perspective", perspective, 4, undefined, 1/2)
    multicanv.add("#spin", spin, 4, undefined, 1/2)
    multicanv.add("#hypercube", hypercube, 5, undefined, 1/2)

    setInterval(() => {multicanv.update()}, 1000 / FPS)
})

const point_proj_x = point => point[0]/(cam_dist - point[2]) * cam_dist
const point_proj_y = point => point[1]/(cam_dist - point[2]) * cam_dist

function hypercube(canv) {
    let draw = new CDraw(canv)
    let yrot = canv.controls.querySelector("#y-rot")
    let wrot = canv.controls.querySelector("#w-rot")

    // convert to radians
    yrot = yrot.value * Math.PI / 180
    wrot = wrot.value * Math.PI / 180

    const point_proj_3d = point => {
        let scale = cam_dist / (cam_dist - point[3])
        let point3d = []
        for(let i = 0; i <= 2; i++) point3d.push(scale * point[i])
        return point3d
    }

    let static_points = [
        [ 1,  1,  1,  1], [ 1,  1,  1, -1],
        [ 1,  1, -1,  1], [ 1,  1, -1, -1],
        [ 1, -1,  1,  1], [ 1, -1,  1, -1],
        [ 1, -1, -1,  1], [ 1, -1, -1, -1],
        [-1,  1,  1,  1], [-1,  1,  1, -1],
        [-1,  1, -1,  1], [-1,  1, -1, -1],
        [-1, -1,  1,  1], [-1, -1,  1, -1],
        [-1, -1, -1,  1], [-1, -1, -1, -1]
    ]
    let points = rotate_points_4d(static_points, wrot)
    let points3d = []

    for(let point of points) {
        points3d.push(point_proj_3d(point))
    }

    points3d = rotate_points_3d(points3d, yrot)

    // draw connecting lines
    for(let point in static_points) {
        for(let other_point in static_points) {
            if(shared_ordinates(static_points[point], static_points[other_point]) == 3) {
                draw.line(
                    point_proj_x(points3d[point]), point_proj_y(points3d[point]),
                    point_proj_x(points3d[other_point]), point_proj_y(points3d[other_point]),
                    static_points[point][0]==1? Theme.get("green"): Theme.get("gray-2")
                )
            }
        }
    }

    for(let point of points3d) {
        draw_3d(point, cam_dist, draw)
    }
}

function no_projection(canv) {
    let draw = new CDraw(canv)

    draw.rect(-1, -1, 1, 1, Theme.get("gray-2"), 1)

    draw.point(-1, 1)
    draw.point(1, 1)
    draw.point(1, -1)
    draw.point(-1, -1)

}

function spin(canv) {
    let slider = canv.controls.querySelector("input[type=range]")
    let label  = canv.controls.querySelector("span.number")
    label.innerText = slider.value

    let angle = slider.value * Math.PI / 180

    draw_cube(canv, cam_dist, angle)
}
function perspective(canv) {
    let slider = canv.controls.querySelector("input[type=range]")
    let label  = canv.controls.querySelector("span.number")
    label.innerText = slider.value
    cam_dist = slider.value

    draw_cube(canv, slider.value)
}

function draw_cube(canv, lens_amm, rotation=0) {
    let draw = new CDraw(canv)

    let static_points = [
        [ 1,  1,  1], [ 1,  1, -1],
        [ 1, -1,  1], [ 1, -1, -1],
        [-1,  1,  1], [-1,  1, -1],
        [-1, -1,  1], [-1, -1, -1]
    ]
    let points = rotate_points_3d(static_points, rotation)

    for(let point in points) {
        // draw lines connecting them
        for(let other_point in points) {
            if(shared_ordinates(static_points[point], static_points[other_point]) == 2) {
                draw.line(
                    point_proj_x(points[point]), point_proj_y(points[point]),
                    point_proj_x(points[other_point]), point_proj_y(points[other_point]),
                    Theme.get("gray-2"), 1
                )
            }
        }
    }
    for(let point of points) draw_3d(point, lens_amm, draw)
}

function draw_3d(point, lens_amm, draw) {
    draw.point(point_proj_x(point), point_proj_y(point))
}

function shared_ordinates(p1, p2) {
    let total = 0
    for(let ordinate in p1) {
        if(p1[ordinate] == p2[ordinate]) total++
    }
    return total
}

function rotate_points_3d(points, angle) {
    if(angle == 0) return points

    let npoints = []
    for(let point of points) {
        npoints.push(matrix_multiply(
            [[ Math.cos(angle), 0, Math.sin(angle)], 
             [ 0,               1,               0], 
             [-Math.sin(angle), 0, Math.cos(angle)]],
            point
        ))
    }

    return npoints
}
function rotate_points_4d(points, angle) {
    if(angle == 0) return points

    let npoints = []
    for(let point of points) {
        npoints.push(matrix_multiply(
            [[ Math.cos(angle), 0,0, Math.sin(angle)], 
             [ 0,               1,0,               0], 
             [ 0,               0,1,               0], 
             [-Math.sin(angle), 0,0, Math.cos(angle)]],
            point
        ))
    }

    return npoints
}

function matrix_multiply(a, b) {
    let prod = []
    for(let row of a) {
        prod.push(weighted_sum(row, b))
    }
    return prod
}
function weighted_sum(a, b) {
    let sum = 0
    for(let item in a) {
        sum += a[item] * b[item]
    }
    return sum
}
