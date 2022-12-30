import { handleState, handleForm, handleSort } from "./handlers"


// add listeners to checkboxes
function listen_checkbox(): void {
    // get a node list of all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<Element>
    
    // remove potential old listners
    checkboxes.forEach(checkbox => {
        checkbox.removeEventListener("click", handleState)
    })
    
    // add listners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", handleState)
    })
}


// listner for add new form
const listen_submit = (): void => {
    // get form element
    const form = document.getElementById("form") as HTMLFormElement
    
    // remove potential old listeners
    form.removeEventListener("submit", handleForm)

    // add listner to form
    form.addEventListener("submit", handleForm)
}


// listener for sort button
const listen_sort = (): void => {
    // get button element
    const sort_btn = document.getElementById("sort-btn") as HTMLElement

    // remove potential old listeners
    sort_btn.removeEventListener("click", handleSort)

    // add listner to form
    sort_btn.addEventListener("click", handleSort)
}


export { listen_checkbox, listen_submit, listen_sort }