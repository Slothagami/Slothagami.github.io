function render_init(canv) {
    canv.disable_auto_resize()
    resize()
    window.addEventListener("resize", resize)

    add_cell()
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

function add_cell(after=null) {
    let cell = document.createElement("math-field")
        cell.type = "text"
        cell.classList.add("instruction")

    let body = document.querySelector("#content")
    
    // add scripts to the cell
    cell.addEventListener("keydown", e => {
        let cells, index
        switch (e.key) {
            case "Enter":
                // add cell after current one
                add_cell(cell)
                break

            case "ArrowUp":
                // focus next cell
                cells = cells_list()
                index = cells.indexOf(cell)

                if(index - 1 >= 0) {
                    cells[index-1].focus()
                }
                break 

            case "ArrowDown":
                // focus prev cell
                cells = cells_list()
                index = cells.indexOf(cell)

                if(index + 1 <= cells.length-1) {
                    
                    cells[index+1].focus()
                }
                break

            case "Delete":
                delete_cell(cell)
                break

            case "Backspace":
                // ctrl + backspace to clear cell
                if(e.ctrlKey) {
                    cell.value = ""
                } else {
                    // delete cell if its empty
                    if(cell.value == "") {
                        delete_cell(cell)
                    }
    
                    // TODO: merge with cell above if on first position
                }

                break
        }
    })

    if (after == null) {
        body.appendChild(cell)
    } else {
        // insert after specified cell
        after.parentNode.insertBefore(cell, after.nextSibling)
    }
    cell.focus()

    return cell
}

function cells_list() {
    return [...document.querySelectorAll(".instruction")]
}


function delete_cell(cell) {
    // delete this cell if its not the only one, otherwise clear it
    let body    = document.querySelector("#content")
    let cells   = cells_list()
    let n_cells = cells.length

    if(n_cells > 1) {
        // delete cell
        let index = Math.min(cells.indexOf(cell), n_cells-2)
        body.removeChild(cell)
        
        // select next cell (or previous if no next)
        cells_list()[index].focus()
    } else {
        cell.value = ""
    }
}
