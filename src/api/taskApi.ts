import type { Task } from "../pages/Tasks";

let mockTasks: Task[] = [];

function simulateDelay<T>(data: T, shouldFail = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Network error. Please try again."));
      } else {
        resolve(data);
      }
    }, 800);
  });
}

export function fetchTasks() {
  return simulateDelay([...mockTasks]);
}

export function createTask(task: Task) {
  mockTasks = [task, ...mockTasks];
  return simulateDelay(task);
}

export function updateTask(task: Task) {
  mockTasks = mockTasks.map((t) => (t._id === task._id ? task : t));
  return simulateDelay(task);
}

export function deleteTask(id: number) {
  mockTasks = mockTasks.filter((t) => t._id !== id);
  return simulateDelay(id);
}
