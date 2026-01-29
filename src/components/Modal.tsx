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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {initialTask ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Finish report"
              value={details.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Optional details..."
              rows={3}
              value={details.description}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Status
              </label>
              <select
                name="status"
                value={details.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Priority
              </label>
              <select
                name="priority"
                value={details.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
                     text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium
                     text-white shadow hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
