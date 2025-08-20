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
    canv.disable_auto_resize()
    canv.draw.point(Vector.zero, "white")
}
