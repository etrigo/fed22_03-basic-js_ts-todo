import type { Todo, Sort } from "./types"
import { listen_checkbox } from "./listeners"


// array for active todos
const todos: Todo[] = []


// boolean value for sort state where true is A-Z ad false is Z-A
const sortState: Sort = { state: true }

// check if previus sort state is stored to update sort button text
const stored_sort_state: string|null = localStorage.getItem("sortState")
if (stored_sort_state) {
    // get button element
    const sort_btn = document.getElementById("sort-btn") as HTMLElement

    // parse stored string to JSON data
    const storedSortState: Sort = JSON.parse(stored_sort_state)
    if (storedSortState.state) {
        sort_btn.innerText = "Sort A-Z"
    } else {
        sort_btn.innerText = "Sort Z-A"
        sortState.state = false
    }
}


// sort function based on state
const sort = (btn?: boolean): void => {
    // sort todos a-z or z-a depending on state
    if (sortState.state) {
        todos.sort((a, b) => a.todo.localeCompare(b.todo))
    } else {
        todos.sort((a, b) => a.todo.localeCompare(b.todo)).reverse()
    }

    // check if sort war triggerd by button
    if (btn) {
        sortState.state = sortState.state ? false : true
        localStorage.setItem("sortState", JSON.stringify(sortState))
    }
    
    // store to local storage
    localStorage.setItem("todos", JSON.stringify(todos))

    sort_btn_text()
    
    // populate sorted todos on page
    list(todos)
}


const sort_btn_text = (): void => {
    // set sort button text depending on state
    const sort_btn = document.getElementById("sort-btn") as HTMLElement
    if (sortState.state) {
        sort_btn.innerText = "Sort A-Z"
    } else {
        sort_btn.innerText = "Sort Z-A"
    }
}

// function to create HTML
const list = (array: Todo[]): void => {
    // get ul for active and inactive todos
    const active_list = document.getElementById("todo-list") as HTMLInputElement
    const inactive_list = document.getElementById("todo-list-done") as HTMLInputElement

    // create HTML for both lists
    let active_HTML: string = ``
    let inactive_HTML: string = ``
    array.forEach(todo => {
        if (todo.state) {
            active_HTML += `<li><input type="checkbox" id="${todo.id}"><p>${todo.todo}</p></li>`
        } else {
            inactive_HTML += `<li class="checked"><input type="checkbox" checked id="${todo.id}"><p>${todo.todo}</p></li>`
        }
    })
    
    // set HTML to active and inactive list elements
    active_list.innerHTML = active_HTML
    inactive_list.innerHTML = inactive_HTML

    // add listner to checkboxes
    listen_checkbox()
}


export { todos, sort, sort_btn_text, list }