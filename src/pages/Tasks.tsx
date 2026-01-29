import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import Dialog from "../components/Dialog";
import { useState } from "react";
import { Plus } from "lucide-react";

export interface Task {
  _id: number;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
  priority: "High" | "Low" | "Medium";
}

const defaultTask: Task = {
  _id: 1,
  title: "Welcome",
  description: "Welcome to this application",
  status: "pending",
  priority: "Medium",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([defaultTask]);
  const [isModalShown, setIsModalSHown] = useState<true | false>(false);
  const [showDialog, setShowDialog] = useState<true | false>(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  function saveTask(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  function showModal() {
    setIsModalSHown(true);
  }

  function handleDelete(id: number) {
    setTaskIdToDelete(id);
    setShowDialog(true);
  }

  function confirmDelete() {
    if (taskIdToDelete !== null) {
      deleteTask(taskIdToDelete);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Task Manager
          </h1>
          <p className="text-gray-600 mt-1">
            Stay organized and keep track of your daily tasks
          </p>
        </div>

        <button
          onClick={showModal}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <Plus size={18} />
          Add Task
        </button>
      </header>

      {/* Content */}
      <section className="mt-8 space-y-6">
        <TaskDetails tasks={tasks} />

        {tasks.length > 0 ? (
          <TaskList tasks={tasks} onDelete={(id) => handleDelete(id)} />
        ) : (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              No tasks yet. Click <strong>Add Task</strong> to get started.
            </p>
          </div>
        )}
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalShown}
        onClose={() => setIsModalSHown(false)}
        onSave={(task) => saveTask(task)}
      />

      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
