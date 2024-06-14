function render_init(canv) {
    canv.disable_auto_resize()
    resize()
    window.addEventListener("resize", resize)

}

function resize() {
    let canv    = document.querySelector("canvas")
    let sidebar = document.getElementById("content")
    let sidebar_bbox = sidebar.getBoundingClientRect()

    canv.width  = window.innerWidth  - sidebar_bbox.width
    canv.height = window.innerHeight
}

function render(canv) {
    canv.draw.axes(undefined, undefined, undefined, "#ffffff0a")
}
