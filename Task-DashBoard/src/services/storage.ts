import { Task } from "../models/Task"

const KEY = "tasks"

export function getTasks(): Task[] {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(KEY, JSON.stringify(tasks))
}
