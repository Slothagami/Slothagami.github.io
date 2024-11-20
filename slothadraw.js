const time  = () => performance.now()/1000
const round = (n, dp=2) => Math.round(n*10**dp)/(10**dp)
const clamp = (x, min, max) => Math.max(Math.min(max, x), min)
const lerp  = (a, b, perc) => a + (b-a) * perc
const radians = deg => deg * Math.PI / 180
const degrees = rad => rad * 180 / Math.PI
const pi = Math.PI

const smoothstep = (x, min=0, max=1) => {
    if(x < 0) return 0
    if(x > 1) return 1
    return min + (3*x**2 - 2*x**3) * (max - min)
}

class MultiCanv {
    constructor(fps=30, default_width=1, default_ratio=1/3, default_ord_width=4) {
        this.canvases = []
        this.def_width = default_width
        this.def_ratio = default_ratio
        this.def_ord_width = default_ord_width
        this.fps = fps

        this.mouse = new Vector(0, 0)
        this.mouse_down = false
        this.scale = 2

        window.addEventListener("resize", ()=>{
            for(let canv of this.canvases) {
                this.resize_canvas(canv)
            }
        })

        const mousestart = () => {this.mouse_down = true}
        const mousestop  = () => {this.mouse_down = false}
        window.addEventListener("mousemove", e => {
            this.mouse.x = e.clientX
            this.mouse.y = e.clientY
        })
        window.addEventListener("touchmove", e => {
            // e.preventDefault()
            this.mouse.x = e.changedTouches[0].clientX
            this.mouse.y = e.changedTouches[0].clientY
        })

        window.addEventListener("mousedown", mousestart)
        window.addEventListener("touchstart", mousestart)
        window.addEventListener("mouseup", mousestop)
        window.addEventListener("touchend", mousestop)
        // window.addEventListener("touchcancel", mousestop)
    }

    get(n=0) {
        return this.canvases[n]
    }

    mouse_pos(canv) {
        let rect = canv.canvas.getBoundingClientRect()
        let canv_corner = new Vector(rect.left, rect.top)
        let canv_pos = this.mouse.sub(canv_corner)

        let canv_center = new Vector(
            canv.canvas.width , 
            canv.canvas.height
        ).scale(.5 * 1/this.scale)

        let centered_pos = canv_pos.sub(canv_center)
        let scaled = new Vector(
            centered_pos.x / (canv_center.x - (1/this.scale)*canv.draw.margin),
            centered_pos.y / (canv_center.x - (1/this.scale)*canv.draw.margin),
        )

        let pos = new Vector(
            scaled.x * canv.coord_width,
            scaled.y * canv.coord_width * -1
        )
        return pos
    }

    start() {
        let frame = () => {
            this.update()
            requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
    }

    autosetup() {
        let canvases = document.querySelectorAll("canvas")
        canvases.forEach(canv => {
            if(canv.id) this.add(canv.id)
        })
        this.start()
    }

    add(name, options) {
        let { cordinate_width, ratio, width } = options || {}
        let canv_selector = `#${name}`
        let func = window[name]
        let init = window[`${name}_init`]

        let canvas = document.querySelector(canv_selector)
        
        let canv   = new Canv(
            name, canvas, func, 
            width || this.def_width, 
            ratio || this.def_ratio, 
            cordinate_width || this.def_ord_width
        )

        canv.draw = new CDraw(canv)

        // find controls element if it exists
        let controls = document.querySelector(canv_selector + "-controls")
        if(controls) {
            canv.controls = {}
            canv.buttons  = {}

            // generate coltroler objects
            let inputs = controls.querySelectorAll("input")
            inputs.forEach(el => {
                let ctrl_name = el.id.replace(name + "-", "")
                canv.controls[ctrl_name] = new NumControler(el)
            })

            let buttons = controls.querySelectorAll("button")
            buttons.forEach(el => {
                let ctrl_name = el.id.replace(name + "-", "")
                canv.buttons[ctrl_name] = el
            })
        }

        if(init) init(canv)

        // run the script once to let it scale its size (stops jittering when scrolling up after loading in at bottom of page)
        func(canv)

        this.resize_canvas(canv)
        this.canvases.push(canv)

        return this
    }

    update() {
        for(let canv of this.canvases) {
            // update only canvases that are visible on screen
            let canv_bbox = canv.canvas.getBoundingClientRect()
            if(canv_bbox.top < window.innerHeight) {
                if(canv_bbox.bottom > 0) {
                    canv.draw.clear()
                    this.update_draggables(canv.drag)
                    
                    if(typeof canv.function == "function") {
                        canv.function(canv)
                    }
                }
            }

        }
    }

    update_draggables(objects) {
        for(let obj in objects) {
            objects[obj].update()
        }
    }

    resize_canvas(canv) {
        if(!canv.automatic_resize) return

        let canvas = canv.canvas
        let width  = canvas.parentElement.getBoundingClientRect().width * canv.width

        canvas.width  = width * this.scale
        canvas.height = width * canv.ratio * this.scale

        canvas.style.width = `${width}px`
        // canvas.style.height = `${width * canv.ratio}px`

        let aspect_ratio = window.innerWidth / window.innerHeight
        canvas.height /= aspect_ratio/2
    }
}

class Canv {
    constructor(name, canvas, func, width, ratio, coord_width) {
        this.name = name
        this.canvas = canvas
        this.c = canvas.getContext("2d")
        this.controls = {}
        this.function = func 

        this.width  = width
        this.ratio = ratio
        this.coord_width = coord_width
        this.automatic_resize = true

        this.drag = {}
        this.dragging = false
        this.center = Origin
    }

    disable_auto_resize() {
        this.automatic_resize = false
    }

    mouse() {
        return multicanv.mouse_pos(this)
    }

    set_view(pos) {
        if(this.center != pos) {
            this.center = pos
        }
    }

    set_ratio(ratio) {
        if(this.ratio != ratio) {
            this.ratio = ratio
            multicanv.resize_canvas(this)
        }
    }

    set_scale(scale) {
        // avoid cleaing the canvas every frame again (removing draggables displays)
        scale = scale / this.ratio * 1/2 // half since it needs to represent the range of values, not the highest value shown
        if(this.coord_width != scale) {
            this.coord_width = scale
            multicanv.resize_canvas(this)
        }
    }

        // width:      width || this.def_width,
        // ratio:      ratio || this.def_ratio,
        // coord_width: cordinate_width || this.def_ord_width,
    add_control(value_name, color, value, min, max, step) {
        let canvas_element = this.canvas 
        let controls = document.querySelector(`#${this.name}-controls`)

        // create controls panel if it doesn't exist 
        if(!controls) {
            // add controls element underneath canvas
            controls = document.createElement("div")
            controls.id = `${this.name}-controls`

            canvas_element.parentNode.insertBefore(controls, canvas_element.nextSibling)

            // insert a table to format the elements
            let table = document.createElement("table")
            controls.appendChild(table)
        }

        // add slider if it doesn't exist
        let control = controls.querySelector(`#${value_name}`)
        if(!control) {
            control = document.createElement("input")
            control.id = value_name
            control.type  = "range"
            control.min   = min 
            control.max   = max 
            control.step  = step 
            control.value = value

            // add a row to the table
            let table = controls.querySelector("table")
            let row   = document.createElement("tr")
            let label_col  = document.createElement("th")
            let slider_col = document.createElement("th")

            if(color) {
                label_col.classList.add(color)
                slider_col.classList.add(color)
                control.classList.add(color)
            }

            label_col.innerText = value_name
            slider_col.appendChild(control)
            row.appendChild(label_col)
            row.appendChild(slider_col)

            table.appendChild(row)

            this.controls[value_name] ??= new NumControler(control)
        }

        return this.controls[value_name]
    }

    add_draggable(name, color, pos, offset=Origin) {
        new Draggable(pos.x, pos.y, name, this, color, offset)
        return this.drag[name]
    }
}

function get_color(color) {
    color = Theme.get(color) || color || "#ffffff"
    return color
}

class CDraw {
    static max_radius = 1
    static arrow_ratio = 1/2
    static label_text_position = 40
    constructor(canv, arrowhead_size=20) {
        this.canv   = canv
        this.canvas = canv.canvas
        this.c = this.canv.c
        this.arrowhead_size = arrowhead_size

        this.margin = 0//CDraw.max_radius

        this.clear()
    }

    clear() {
        this.c.clearRect(0,0, this.canvas.width,this.canvas.height)
    }

    scale_value(value) {
        let scale = this.point_x(1) - this.point_x(0)
        return value * scale
    }

    point_x(x) {
        x += this.canv.center.x
        let working_width = (this.canvas.width/2) - this.margin
        let perc = x / this.canv.coord_width
        let ord = perc * working_width
        return ord + (this.canvas.width/2)
    }
    point_y(y) {
        y += this.canv.center.y
        let working_height = (this.canvas.width/2) - this.margin
        let perc = -y / this.canv.coord_width
        let ord = perc * working_height
        return ord + (this.canvas.height/2)
    }
    point_vector(pt) {
        return new Vector(this.point_x(pt.x), this.point_y(pt.y))
    }

    point(pt, color, radius=6, convert_cords=true) {
        this.c.fillStyle = get_color(color)
        this.c.beginPath()

        if(convert_cords) {
            pt = this.point_vector(pt)
        }

        this.c.arc(pt.x, pt.y, radius, 0, 2*Math.PI)
        this.c.fill()
    }

    arc(center, radius, start, stop, color="white") {
        let cx = this.point_x(center.x)
        let cy = this.point_y(center.y)
        let rad = this.scale_value(radius)

        this.c.beginPath()
        this.c.strokeStyle = get_color(color)
        this.c.arc(cx, cy, rad, start, stop)
        this.c.stroke()
    }

    circle(center, radius, color) {
        this.arc(center, radius, 0, 2*pi, color)
    }

    rect(x1, y1, x2, y2, color="white", width=2) {
        x1 = this.point_x(x1)
        y1 = this.point_y(y1)
        x2 = this.point_x(x2)
        y2 = this.point_y(y2)

        this.c.strokeStyle = get_color(color)
        this.c.strokeRect(x1, y1,  x2-x1, y2-y1)
    }
    fillrect(x1, y1, x2, y2, color="white") {
        x1 = this.point_x(x1)
        y1 = this.point_y(y1)
        x2 = this.point_x(x2)
        y2 = this.point_y(y2)

        this.c.fillStyle = get_color(color)
        this.c.fillRect(x1, y1,  x2-x1, y2-y1)
    }

    text(x, y, text, color, convert_cords=true, size=48) {
        this.c.fillStyle = get_color(color)
        // this.c.font = "24px 'Segoe UI'"
        this.c.font = `${size}px MJXc-TeX-math-I,MJXc-TeX-math-Ix,MJXc-TeX-math-Iw`
        this.c.textAlign = "center"

        if(convert_cords) {
            x = this.point_x(x)
            y = this.point_y(y)
        }

        this.c.fillText(text, x, y)
    }

    line_label(p1, p2, color, label, label_position, convert_cords=true) {
        color = get_color(color)
        if(convert_cords) {
            p1 = this.point_vector(p1)
            p2 = this.point_vector(p2)
        }

        let delta = p2.sub(p1)
        let center_delta = delta.scale(.5)
        let perp = delta.perpendicular().unit()
        let is_down = center_delta.y < 0
        let pos_multiplier = is_down? 1: -1

        let scale = Math.min(delta.length(), this.arrowhead_size)
        let label_dist_scale = scale / this.arrowhead_size

        let center_pos = p1.add(center_delta)
        let label_pos = center_pos.add(perp.scale(label_position * pos_multiplier * label_dist_scale))
        
        this.text(
            label_pos.x, 
            label_pos.y, 
            label, color, false,
            Math.min(delta.length(), 48)
        )
    }

    line(p1, p2, color, width=2, label="", label_pos=40, convert_cords=true) {
        this.c.strokeStyle = get_color(color)

        this.line_label(p1, p2, color, label, label_pos)
        if(convert_cords) {
            p1 = this.point_vector(p1)
            p2 = this.point_vector(p2)
        }

        this.c.lineWidth = width
        this.c.beginPath()
        this.c.moveTo(p1.x, p1.y)
        this.c.lineTo(p2.x, p2.y)
        this.c.stroke()
    }
    dottedline(p1, p2, color, width=2, label="", label_pos=40, convert_cords=true) {
        this.c.strokeStyle = get_color(color)
        this.line_label(p1, p2, color, label, label_pos)

        if(convert_cords) {
            p1 = this.point_vector(p1)
            p2 = this.point_vector(p2)
        }

        let delta = p2.sub(p1)
        let dir = delta.unit()
        let seg_length = 10
        let seg_num = delta.length() / seg_length

        for(let i = 1; i < seg_num; i += 2) {
            let start = p1.add(dir.scale(seg_length * (i-1)))
            let end   = p1.add(dir.scale(seg_length * i))

            this.line(start, end, color, width, "", 0, false)
        }
    }

    vector(position, vector, color="white", label="", label_position=1, width=4) {
        color  = get_color(color)
        vector = position.add(vector)

        this.line_label(position, vector, color, label, label_position * CDraw.label_text_position, true)
        
        position = this.point_vector(position)
        vector   = this.point_vector(vector)
        
        // draw head
        let delta = vector.sub(position)
        let perp  = delta.perpendicular().unit()
        
        let scale = Math.min(delta.length(), this.arrowhead_size)
        delta = delta.unit()
        
        let perp_scale = perp.scale(scale * CDraw.arrow_ratio)
        let base_pos = vector.sub(delta.scale(scale))
        
        let corner1 = base_pos.add(perp_scale)
        let corner2 = base_pos.sub(perp_scale)
        
        this.line(position, base_pos, color, width, "", 0, false)
        this.polygon([vector, corner1, corner2], color)
    }

    angle_between(a, b, origin, radius, color, label="θ", label_pos=40) {
        let a_angle = -Math.atan2(a.y, a.x)
        let b_angle = -Math.atan2(b.y, b.x)
        
        origin = this.point_vector(origin)
        a      = this.point_vector(a)
        b      = this.point_vector(b)

        // scale the markings
        let a_scale = a.sub(origin).length()
        let b_scale = b.sub(origin).length()
        let new_radius = Math.min(radius, a_scale * .5, b_scale * .5)
        let scale = new_radius / radius

        radius = new_radius
        label_pos *= scale

        // draw the segment
        this.c.strokeStyle = get_color(color)
        this.c.beginPath()

        let diff = a_angle - b_angle
        if(diff < 0) diff += 2* Math.PI

        // flip so the angle is on the acute side
        let center_angle = a_angle - .5*diff
        if(diff < Math.PI) {
            this.c.arc(origin.x, origin.y, radius, b_angle, a_angle)
        } else {
            this.c.arc(origin.x, origin.y, radius, a_angle, b_angle)
            center_angle += Math.PI
        }

        this.c.stroke()

        this.text(
            origin.x + (radius + label_pos) * Math.cos(center_angle),
            origin.y + (radius + label_pos) * Math.sin(center_angle),
            label, color, false,
            48 * scale
        )
    }

    polygon(points, color) {
        this.c.fillStyle = get_color(color)
        this.c.beginPath()

            this.c.moveTo(points[0].x, points[0].y)

            for(let i = 1; i < points.length; i++) {
                this.c.lineTo(points[i].x, points[i].y)
            }

        this.c.fill()
    }

    parametric(func, start, stop, color="white", precision=.03, width=4) {
        color = get_color(color)

        // must draw the line in a single stroke to connect them
        this.c.strokeStyle = color
        this.c.lineWidth = width
        this.c.beginPath()

        for(let t = start; t < stop; t += precision) {
            t = Math.min(stop - precision, t) // don't overshoot the end
            let p1 = this.point_vector(func(t))
            let p2 = this.point_vector(func(t + precision))

            this.c.moveTo(p1.x, p1.y)
            this.c.lineTo(p2.x, p2.y)
        }

        this.c.stroke()
    }

    graph(func, start, stop, color="white", width=4, precision=.05) {
        this.parametric(t => {
            return new Vector(t, func(t))
        }, start, stop, color, width, precision)
    }

    axes(origin=Origin, x=true, y=true, color="#888") {
        let center_rad = .1
        let edge_buffer = .6

        let xgradient = this.c.createRadialGradient(
            this.canvas.width/2, this.canvas.height/2, this.canvas.width * center_rad,
            this.canvas.width/2, this.canvas.height/2, this.canvas.width * edge_buffer
        )
        xgradient.addColorStop(0, color)
        xgradient.addColorStop(1, "#00000000")

        let ygradient = this.c.createRadialGradient(
            this.canvas.width/2, this.canvas.height/2, this.canvas.width * center_rad,
            this.canvas.width/2, this.canvas.height/2, this.canvas.width * edge_buffer
        )
        ygradient.addColorStop(0, color)
        ygradient.addColorStop(1, "#00000000")

        let right_edge  = new Vector(-this.canv.coord_width, origin.y)
        let left_edge   = new Vector( this.canv.coord_width, origin.y)
        let bottom_edge = new Vector(origin.x, -this.canv.coord_width)
        let top_edge    = new Vector(origin.x,  this.canv.coord_width)

        if(x) this.line(right_edge, left_edge, xgradient)
        if(y) this.line(bottom_edge, top_edge, ygradient)
    }
}


class Vector {
    constructor(x, y) {
        this.x = x 
        this.y = y
    }

    static zero = new Vector(0,0)

    rotate(angle) {
        // rotates the vector by the given angle 
        let rotx = Math.cos(angle)
        let roty = Math.sin(angle)

        // using complex multiplication
        return new Vector(this.x * rotx - this.y * roty, this.x * roty + this.y * rotx)
    }

    x_comp() { return new Vector(this.x, 0) }
    y_comp() { return new Vector(0, this.y) }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }
    sub(other) {
        return new Vector(this.x - other.x, this.y - other.y)
    }
    scale(val) {
        return new Vector(this.x * val, this.y * val)
    }
    length() {
        return Math.hypot(this.x, this.y)
    }
    angle() {
        return Math.atan2(this.y, this.x)
    }
    elem_div(other) {
        return new Vector(this.x / other.x, this.y / other.y)
    }
    elem_mult(other) {
        return new Vector(this.x * other.x, this.y * other.y)
    }

    dist(other) {
        return other.sub(this).length()
    }

    unit() {
        let len = this.length()
        return new Vector(this.x / len, this.y / len)
    }
    perpendicular() {
        return new Vector(-this.y, this.x)
    }

    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    toString() {
        return `Vector(${this.x}, ${this.y})`
    }
}
const dot = (a, b) => {
    return a.dot(b)
}


class Draggable extends Vector {
    static anim_time = .25
    static max_radius = 15
    static min_radius = 9
    static active_dist = .05
    constructor(x, y, name, canv, color, offset=Origin) {
        super(x, y)
        this.canv = canv
        this.color = get_color(color)
        this.active = false
        this.name = name
        this.radius = Draggable.max_radius
        this.offset = offset

        this.ease_in = false 
        this.ease_out = true

        canv.drag[name] ??= this
    }

    update() {
        let mouse = this.canv.mouse()
        if(this.active) {
            this.x = mouse.x - this.offset.x
            this.y = mouse.y - this.offset.y

            this.x = clamp(
                this.x, 
                -this.canv.coord_width - this.offset.x, 
                 this.canv.coord_width - this.offset.x
            )
            this.y = clamp(
                this.y, 
                 -this.canv.coord_width * .5 - this.offset.y, 
                  this.canv.coord_width * .5 - this.offset.y
            )
        }

        let vpos = this.add(this.offset)
        this.canv.draw.point(vpos, this.color + "70", this.radius)
        

        if(vpos.dist(mouse) < Draggable.active_dist * this.canv.coord_width) {
            
            if(!this.ease_in && !this.canv.dragging) {
                this.ease_in = true
                this.ease_out = false
                this.radius = new AnimatedValue(Draggable.max_radius, Draggable.min_radius, Draggable.anim_time)
            }  
            if(multicanv.mouse_down && !this.canv.dragging) {
                this.active = true
                this.canv.dragging = true
            }
        } else {
            if(!this.ease_out) {
                this.ease_out = true
                this.ease_in = false
                this.radius = new AnimatedValue(Draggable.min_radius, Draggable.max_radius, Draggable.anim_time)
            }
        }

        if(!multicanv.mouse_down) {
            this.active = false
            this.canv.dragging = false
        }
    }
}

const Origin = new Vector(0, 0)

class AnimatedValue {
    constructor(current_value, target, anim_time, easing="smoothstep") {
        // stop nested animations causing rediculous performance hits
        if(current_value instanceof AnimatedValue) current_value = current_value.valueOf()
        if(target instanceof AnimatedValue) target = target.valueOf()

        this.easing = AnimatedValue[easing]
        this.anim_time = anim_time
        this.current_value = current_value
        this.target = target
        this.anim_start = time()
    }

    valueOf() {
        return this.value()
    }
    toString() {
        return round(this.value()).toString()
    }

    lerp(start, end, perc) {
        return start + (end - start) * perc
    }

    static linear(x) {
        return clamp(x, 0, 1)
    }

    static smoothstep(x) {
        if(x < 0) return 0
        if(x > 1) return 1
        return 3*x**2 - 2*x**3
    }

    value() {
        let dtime = time() - this.anim_start
        return this.lerp(
            this.current_value, this.target, 
            this.easing(dtime / this.anim_time)
        )
    }
}

class NumControler extends AnimatedValue {
    constructor(element, anim_time=.5, easing="smoothstep") {
        super(
            parseFloat(element.value), 
            parseFloat(element.value), 
            anim_time, easing
        )
        this.element = element

        element.addEventListener("input", () => {
            this.current_value = this.target
            this.target = parseFloat(this.element.value)
            this.anim_start = time()
        })
    }

    value() {
        let dtime = time() - this.anim_start
        let diff = this.target - this.current_value

        // snap to value if scrubbing slider
        if(this.element.type == "range") {
            if(Math.abs(diff) <= 2*parseFloat(this.element.step)) {
                return this.target
            }
        }

        return this.lerp(
            this.current_value, this.target, 
            this.easing(dtime / this.anim_time)
        )
    }
}

// Specific Use Case Classes
class Complex extends Vector {
    static i = new Complex(0, 1)
    static zero = new Complex(0)

    constructor(real, imag=0) {
        super(real, imag)
        this.x = real
        this.y = imag
    }

    round() {
        return new Complex(
            Math.round(this.x * 10) / 10,
            Math.round(this.y * 10) / 10
        )
    }

    print() {
        console.log(this.toString())
    }

    toString() {
        let out = ""

        let printimag = this.y
        if(this.y ==  1) printimag = ""
        if(this.y == -1) printimag = "-"

        // Purely Real/Imaginary Cases
        if(this.y == 0) {
            out = this.x
        }else if(this.x == 0) {
            out = printimag + "i"
        } else {
            // Complex Number Case
            let parts = [
                this.x, 
                (Math.abs(this.y)==1? "": Math.abs(this.y)) + "i"
            ]
            let delim = this.y > 0? " + ": " - "
            out = parts.join(delim)
        }
        return out
    }

    angle() {
        return Math.atan2(this.y, this.x)
    }

    static complexify(n) {
        if(n instanceof Complex) return n
        if(n instanceof Vector)  return new Complex(n.x, n.y)
        return new Complex(n)
    }

    add(other) {
        other = Complex.complexify(other)
        return new Complex(this.x + other.x, this.y + other.y)
    }

    sub(b) {
        b = Complex.complexify(b)
        return this.add(b.mult(-1))
    }

    mult(b) {
        b = Complex.complexify(b)
        return new Complex(
            this.x * b.x - this.y * b.y,
            this.x * b.y + this.y * b.x
        )
    }

    div(b) {
        b = Complex.complexify(b)

        let denominator = b.x ** 2 + b.y ** 2
        return new Complex(
            (this.x * b.x + this.y * b.y) / denominator,
            (this.y * b.x - this.x * b.y) / denominator
        )
    }

    pow(power) {
        power = Complex.complexify(power)
        
        if(power.y == 0) {
            power = power.x

            let sign = Math.sign(power)
            power = Math.abs(power)
    
            let prod = this
            for(let i = 0; i < power-1; i++) {
                prod = prod.mult(this)
            }
    
            if(sign == 1)  return prod
            if(sign == -1) return new Complex(1).divide(prod)
        } else {
            throw "Complex base not implemented for complex power."
        }

    }

    static exp(imaginary) { // expects imaginary component
        return new Complex(
            Math.cos(imaginary),
            Math.sin(imaginary)
        )
    }

    abs() {
        return this.length()
    }

    static intergrate(func, lowBound, highBound, precision=50) {
        // intergrates the function over real inputs
        // Precision is sample points per unit
        let domain = highBound - lowBound
        precision *= domain
    
        let sum = Complex.zero
        for(let x = lowBound; x < highBound; x += domain / precision) {
            sum = Complex.add(sum, func(x))
        }
        return sum
    }
}

let multicanv = new MultiCanv()
window.addEventListener("load", () => {
    multicanv.autosetup()

    // run an init funciton if defined
    if(typeof window["init"] == "function") {
        init()
    }
})

  
