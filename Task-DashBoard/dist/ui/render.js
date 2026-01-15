export function renderTasks(tasks, list, onDelete) {
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        const titleEl = document.createElement("strong");
        titleEl.textContent = task.title;
        const descEl = document.createElement("p");
        descEl.textContent = task.description;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => onDelete(task.id));
        li.append(titleEl, descEl, deleteBtn);
        list.appendChild(li);
    });
}
