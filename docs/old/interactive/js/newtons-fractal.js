var canv, c
window.addEventListener("load", () => {
    canv = document.querySelector("canvas")
    c = canv.getContext("2d")
    
    const resize = ()=> {
        canv.width  = window.innerWidth
        canv.height = window.innerHeight
    }
    resize()
    document.addEventListener("resize", resize)
})

function render(canv) {
    canv.add_draggable("point", "orange", new Vector(0,0))
    canv.disable_auto_resize(false)
    canv.set_scale(6)

    canv.draw.point(canv.mouse())
    console.log(canv.mouse())
}
