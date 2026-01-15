import { getTasks, saveTasks } from "./services/storage";
import { renderTasks } from "./ui/render";
const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
let tasks = getTasks();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    console.log(title, description);
    const task = {
        id: Date.now(),
        title,
        description
    };
    tasks.push(task);
    saveTasks(tasks);
    render();
    form.reset();
});
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    render();
}
function render() {
    renderTasks(tasks, list, deleteTask);
}
render();
