var show_solution = false
window.addEventListener("load", () => {
    let show_solutions_btn = document.getElementById("show-solution")
    if(show_solutions_btn) {
        show_solutions_btn.addEventListener("click", e => {
            show_solution = true
            show_solutions_btn.style.display = "none"
            document.getElementById("solution").style.display = "block"
        })
    }
})
