import type { Todo } from "./types";
import { todos, list } from "./util";
import { listen_submit, listen_sort } from "./listeners";


const initialize = (): void => {
    // check local storage for todos
    let stored_todos: string|null = localStorage.getItem("todos")

    // if todos in local storage populate to site else create initial dummy todos
    if (stored_todos != null) {
        const data = JSON.parse(stored_todos)
        data.forEach((todo: Todo): void => {
            todos.push(todo)
        });
    } else if (stored_todos === null) {
        // initial todos array
        const initial: string[] = ["This is the first todo", "Another todo in your list", "Try checking this todo", "This todo is already done", "Try to uncheck/check a todo"]
        
        // create three initial active and two inactive todos as demo
        for (let i = 0; i < 5; i++) {
            if (i < 3) {
                todos.push({
                    id: i + 1,
                    todo: initial[i],
                    state: true
                })
            } else {
                todos.push({
                    id: i + 1,
                    todo: initial[i],
                    state: false
                })
            }
        }

        // store to local storage
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    // poputale todos to site
    list(todos)

    // listen to add-new-form
    listen_submit()

    // listen sort
    listen_sort()
}


export { initialize }