import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import Dialog from "../components/Dialog";
import { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask as apiDeleteTask,
} from "../api/taskApi";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalShown, setIsModalShown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Show modal for adding a task
  function showModal() {
    setEditingTask(null);
    setIsModalShown(true);
  }

  // Handle saving a task (add or edit)
  async function saveTask(task: Task) {
    try {
      setLoading(true);
      setError(null);

      if (editingTask) {
        await updateTask(task);
      } else {
        await createTask(task);
      }

      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsModalShown(false);
    }
  }

  // Prepare to delete a task
  function handleDelete(id: number) {
    setTaskIdToDelete(id);
    setShowDialog(true);
  }

  // Confirm deletion
  async function confirmDelete() {
    if (!taskIdToDelete) return;

    try {
      setLoading(true);
      await apiDeleteTask(taskIdToDelete);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowDialog(false);
      setTaskIdToDelete(null);
    }
  }

  // Open modal to edit task
  function handleEdit(task: Task) {
    setEditingTask(task);
    setIsModalShown(true);
  }

  return (
    <>
      {loading && (
        <p className="text-center text-sm text-gray-500">Loading...</p>
      )}

      {error && <p className="text-center text-sm text-red-600">{error}</p>}

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
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
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
          onClose={() => {
            setIsModalShown(false);
            setEditingTask(null);
          }}
          onSave={saveTask}
          initialTask={editingTask}
        />

        {/* Dialog */}
        <Dialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={confirmDelete}
        />
      </main>
    </>
  );
}
