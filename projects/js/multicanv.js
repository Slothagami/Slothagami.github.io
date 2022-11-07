class MultiCanv {
    constructor(default_width=1, default_ratio=9/16) {
        this.canvases = []
        this.def_width = default_width
        this.def_ratio = default_ratio

        window.addEventListener("resize", ()=>{
            for(let canv of this.canvases) {
                this.resize_canvas(canv)
            }
        })
    }

    add(canv_selector, func, cord_wid, init, ratio, wid) {
        let canvas = document.querySelector(canv_selector)
        let canv = {
            canvas:     canvas,
            c:          canvas.getContext("2d"),
            function:   func,
            width:      wid || this.def_width,
            ratio:      ratio || this.def_ratio,
            coord_width: cord_wid
        }

        // find controls element if it exists
        let controls = document.querySelector(canv_selector + "-controls")
        if(controls) {
            // controls = controls.querySelectorAll("*")
            canv.controls = controls
        }

        if(init) init(canv)

        this.resize_canvas(canv)
        this.canvases.push(canv)
    }

    update() {
        // TODO: update canvases that are visible on screen
        for(let canv of this.canvases) canv.function(canv)
    }

    resize_canvas(canv) {
        let canvas = canv.canvas
        let width = canvas.parentElement.getBoundingClientRect().width * canv.width

        // canvas.style.display = "block"
        canvas.width = width
        canvas.height = width * canv.ratio

        let aspect_ratio = window.innerWidth / window.innerHeight
        // if(aspect_ratio <= 1.05) canvas.height *= 2
        canvas.height /= aspect_ratio /2
    }
}

class CDraw {
    static max_radius = 5
    constructor(canv) {
        this.canv = canv
        this.canvas = canv.canvas
        this.c = this.canv.c

        this.margin = CDraw.max_radius * 1.5

        this.clear()
    }

    clear() {
        this.c.clearRect(0,0, this.canvas.width,this.canvas.height)
    }

    point_x(x) {
        let working_width = (this.canvas.width/2) - this.margin
        let perc = x / this.canv.coord_width
        let ord = perc * working_width
        return ord + (this.canvas.width/2)
    }
    point_y(y) {
        let working_height = (this.canvas.width/2) - this.margin
        let perc = -y / this.canv.coord_width
        let ord = perc * working_height
        return ord + (this.canvas.height/2)
    }

    point(x, y, color="white", radius=3) {
        this.c.fillStyle = color
        this.c.beginPath()
        this.c.arc(this.point_x(x), this.point_y(y), radius, 0, 2*Math.PI)
        this.c.fill()
    }

    rect(x1, y1, x2, y2, color="white", width=1) {
        x1 = this.point_x(x1)
        y1 = this.point_y(y1)
        x2 = this.point_x(x2)
        y2 = this.point_y(y2)

        this.c.strokeStyle = color 
        this.c.strokeRect(x1, y1,  x2-x1, y2-y1)
    }

    text(x, y, text, color) {
        this.c.fillStyle = color
        this.c.font = "24px 'Segoe UI'"
        this.c.textAlign = "center"
        this.c.fillText(text, this.point_x(x), this.point_y(y))
    }

    line(x1, y1, x2, y2, color="white", width=1) {
        this.c.strokeStyle = color
        this.c.lineWidth = width
        this.c.beginPath()
        this.c.moveTo(this.point_x(x1), this.point_y(y1))
        this.c.lineTo(this.point_x(x2), this.point_y(y2))
        this.c.stroke()
    }

    axes(x=true, y=true) {
        let center_rad = .1
        let edge_buffer = .6

        let xgradient = this.c.createRadialGradient(
            this.canvas.width/2, this.canvas.height/2, this.canvas.width * center_rad,
            this.canvas.width/2, this.canvas.height/2, this.canvas.width * edge_buffer
        )
        xgradient.addColorStop(0, "#aaa")
        xgradient.addColorStop(1, "#00000000")

        let ygradient = this.c.createRadialGradient(
            this.canvas.width/2, this.canvas.height/2, this.canvas.height * center_rad,
            this.canvas.width/2, this.canvas.height/2, this.canvas.height * edge_buffer
        )
        ygradient.addColorStop(0, "#aaa")
        ygradient.addColorStop(1, "#00000000")

        if(x) this.line(-this.canv.coord_width, 0, this.canv.coord_width,0, xgradient, 1)
        if(y) this.line(0, -this.canv.coord_width, 0, this.canv.coord_width, ygradient, 1)
    }
}
