import type { Task } from "../pages/Tasks";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskDetails({ tasks }: TaskListProps) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;

  const tasksProps = [
    { text: "Total Tasks", count: totalTasks, color: "black" },
    { text: "Pending", count: pendingTasks, color: "yellow-600" },
    { text: "In Progress", count: inProgressTasks, color: "blue-500" },
    { text: "Completed", count: completedTasks, color: "green-500" },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6">
      {tasksProps.map((task) => (
        <div className="bg-white p-3 rounded-xl border border-gray-300">
          <p className={`mb-4 font-medium text-3xl text-${task.color}`}>
            {task.count}
          </p>
          <p className="text-gray-600 text-sm">{task.text}</p>
        </div>
      ))}
    </section>
  );
}
