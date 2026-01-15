import { Task } from "./models/Task"
import { getTasks, saveTasks } from "./services/storage"
import { renderTasks } from "./ui/render"

const form = document.getElementById("taskForm") as HTMLFormElement
const list = document.getElementById("taskList") as HTMLUListElement
const titleInput = document.getElementById("title") as HTMLInputElement
const descInput = document.getElementById("description") as HTMLInputElement

let tasks: Task[] = getTasks()

form.addEventListener("submit", (e: Event) => {
  e.preventDefault()

  const title = titleInput.value.trim()
  const description = descInput.value.trim()

 console.log(title, description)
  

  const task: Task = {
    id: Date.now(),
    title,
    description
  }

  tasks.push(task)
  saveTasks(tasks)
  render()
  form.reset()
})

function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id)
  saveTasks(tasks)
  render()
}

function render(): void {
  renderTasks(tasks, list, deleteTask)
}

render()
