// import type { Todo } from "./types"
import { list } from "./util"
import { todos, sort } from "./util"


// handle state for todos
const handleState = (event: any): void => {
    event.preventDefault()

    // toggle todo state between active and inactive for each todo
    todos.forEach(todo => {
        if (todo.id == Number(event.target.id)) {
            todo.state = todo.state ? false : true
        }
    })

    // update local storage
    localStorage.setItem("todos", JSON.stringify(todos))
    
    // populate todos to page
    list(todos)
}


// add new todo handler
const handleForm = (event: any): void => {
    event.preventDefault()

    // get value from form input
    const new_todo: string = event.target.elements["add-todo"].value

    // validate input value
    if (new_todo == "") {
        alert("A todo must be filled in")
    } else {
        const new_id: number = Math.max(...todos.map(todo => todo.id)) + 1
        todos.push({
            id: new_id,
            todo: new_todo,
            state: true
        })

        // update local storage
        localStorage.setItem("todos", JSON.stringify(todos))
    
        // populate todos to page
        list(todos)
    
        // reset form
        const form = document.getElementById("form") as HTMLFormElement
        form.reset()
    }
}


// handle sort function
const handleSort = (): void => {
    sort(true)
}


export { handleState, handleForm, handleSort }