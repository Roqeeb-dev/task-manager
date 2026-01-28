import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";
import { useState } from "react";

export interface Task {
  _id: number;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
  priority: "High" | "Low" | "Medium";
}

const defaultTask: Task = {
  _id: 1,
  title: "Title",
  description: "Description",
  status: "pending",
  priority: "Medium",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([defaultTask]);
  return (
    <main className="max-w-6xl mx-auto">
      {/* Header Details */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Task Manager</h1>
          <p className="text-lg text-gray-800 my-1">
            Manage your task effectively and stay organized
          </p>
        </div>
        <button className="bg-blue-700 text-white text-lg p-3 font-medium rounded-lg hover:bg-blue-800 transition">
          Add Task
        </button>
      </header>

      {/* Main Content */}
      <TaskDetails tasks={tasks} />
      <TaskList />
    </main>
  );
}
