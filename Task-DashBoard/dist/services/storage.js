const KEY = "tasks";
export function getTasks() {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}
export function saveTasks(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
}
