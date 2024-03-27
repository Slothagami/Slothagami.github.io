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
    
}
