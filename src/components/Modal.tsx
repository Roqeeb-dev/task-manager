import { useEffect, useState } from "react";
import type { Task } from "../pages/Tasks";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  initialTask?: Task | null;
}

const emptyTask: Task = {
  _id: Date.now(),
  title: "",
  description: "",
  status: "pending",
  priority: "Medium",
};

export default function Modal({
  isOpen,
  onClose,
  onSave,
  initialTask,
}: ModalProps) {
  const [details, setDetails] = useState<Task>(emptyTask);

  // Populate form when editing
  useEffect(() => {
    if (initialTask) {
      setDetails(initialTask);
    } else {
      setDetails({ ...emptyTask, _id: Date.now() });
    }
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!details.title.trim()) return;

    onSave(details);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">
          {initialTask ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={details.title}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            required
          />

          <textarea
            name="description"
            placeholder="Task description"
            rows={3}
            value={details.description}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              name="status"
              value={details.status}
              onChange={handleChange}
              className="rounded-md border px-3 py-2"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              name="priority"
              value={details.priority}
              onChange={handleChange}
              className="rounded-md border px-3 py-2"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
