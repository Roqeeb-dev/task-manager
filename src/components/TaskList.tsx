import type { Task } from "../pages/Tasks";
import { X, Edit } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
}

const STATUS_STYLES = {
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "Pending",
  },
  "in-progress": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "In Progress",
  },
  done: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Done",
  },
} as const;

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <main className="mt-10">
      <table className="w-full border border-gray-300 my-6">
        <thead className="rounded-xl">
          <tr className="border border-gray-300">
            <th className="text-left p-3 uppercase text-gray-500">Task</th>
            <th className="text-left p-3 uppercase text-gray-500">Status</th>
            <th className="text-left p-3 uppercase text-gray-500">Priority</th>
            <th className="text-left p-3 uppercase text-gray-500">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b border-gray-300">
              <td className="p-3 bg-white">{task.title}</td>
              <td className="p-3 bg-white">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
      ${STATUS_STYLES[task.status].bg}
      ${STATUS_STYLES[task.status].text}`}
                >
                  {STATUS_STYLES[task.status].label}
                </span>
              </td>

              <td className="p-3 bg-white">{task.priority}</td>
              <td className="p-3 bg-white">
                <div className="flex items-center gap-3">
                  {/* Delete */}
                  <div className="group relative">
                    <button
                      className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                      aria-label="Delete task"
                    >
                      <X size={18} />
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      Delete
                    </span>
                  </div>

                  {/* Notes */}
                  <div className="group relative">
                    <button
                      className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
                      aria-label="View notes"
                    >
                      <Edit size={18} />
                    </button>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      Edit
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
