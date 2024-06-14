// todo:
// cell values (evaluate numerical expression)
// set variables
// recursively evaluate variable definitions and operations in interpreter
// slider for variable definitons
// pan and zoom

class Interpreter {
    constructor() {
        this.variables = {}
    }

    reset() {
        this.variables = {}
    }

    execute(latex) {
        latex = latex.trim()
        if (latex == "") return

        // already defined variables
        if(latex in this.variables) {
            return this.variables[latex]
        }

        // numbers
        let pattern = /^\d+\.?\d*/
        if(pattern.test(latex)) {
            return parseFloat(latex)
        }


        // variable defintions
        pattern = /^([^\d]\w*)=(.*)/
        if(pattern.test(latex)) {
            let groups   = pattern.exec(latex)
            let variable = groups[1]
            let value    = groups[2]

            this.variables[variable] = this.execute(value)
            return this.variables[variable]
        }

        console.warn("Cannot parse string: \"" + latex + "\"")
    }
}

// setup //
var interpreter
function render_init(canv) {
    canv.disable_auto_resize()
    resize()
    window.addEventListener("resize", resize)

    interpreter = new Interpreter()

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

    interpreter.reset()
    cells_list().forEach(draw_cell)
}

// interpreter //
function draw_cell(cell) {
    let latex = cell.value

    // execute cells in order
    interpreter.execute(latex)
    // cell.set_value(interpreter.execute(latex))
}


// cell functionality //
function add_cell(after=null) {
    let wrap = document.createElement("div")
        wrap.classList.add("cell")

    let cell = document.createElement("math-field")
        cell.type = "text"
        cell.classList.add("instruction")

    let cell_out = document.createElement("span")
        cell_out.innerText = "test"

    let body = document.querySelector("#content")
    
    // add scripts to the cell
    cell.addEventListener("keydown", e => {
        let cells, index
        switch (e.key) {
            case "Enter":
                // add cell after current one
                add_cell(wrap)
                break

            case "ArrowUp":
                // focus next cell
                cells = cells_list()
                index = cells.indexOf(wrap)

                if(index - 1 >= 0) {
                    cell_input(cells[index-1]).focus()
                }
                break 

            case "ArrowDown":
                // focus prev cell
                cells = cells_list()
                index = cells.indexOf(wrap)

                if(index + 1 <= cells.length-1) {
                    
                    cell_input(cells[index+1]).focus()
                }
                break

            case "Delete":
                delete_cell(wrap)
                break

            case "Backspace":
                // ctrl + backspace to clear cell
                if(e.ctrlKey) {
                    cell.value = ""
                } else {
                    // delete cell if its empty
                    if(cell.value == "") {
                        delete_cell(wrap)
                    }
    
                    // TODO: merge with cell above if on first position
                }

                break
        }
    })
    wrap.addEventListener("click", e => {
        cell.focus() // enlarge hitbox
    })

    if (after == null) {
        body.appendChild(wrap)
    } else {
        // insert after specified cell
        after.parentNode.insertBefore(wrap, after.nextSibling)
    }

    wrap.appendChild(cell)
    // wrap.appendChild(cell_out)
    cell.focus()

    return cell
}

function cells_list() {
    return [...document.querySelectorAll(".cell")]
}

function cell_input(wrapper) {
    return wrapper.querySelector("math-field")
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
        let t_cell = cells_list()[index]
        cell_input(t_cell).focus()
    } else {
        cell.value = ""
    }
}
