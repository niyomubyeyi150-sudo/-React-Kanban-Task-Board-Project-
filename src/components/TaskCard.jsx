import { Link } from "react-router-dom";

function TaskCard({ task, archiveTask, moveTask }) {
  const priorityStyles = {
    High: "bg-[#142D4E] text-white",
    Medium: "bg-[#EAF0F7] text-[#315A83]",
    Low: "bg-[#F1F4F8] text-[#64748B]",
  };

  return (
    <article className="rounded-xl border border-[#E3EAF2] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#A9BDD4] hover:shadow-md">
      {/* Category and priority */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#718096]">
          {task.category}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task information */}
      <h3 className="mb-2 text-base font-bold text-[#142D4E]">{task.title}</h3>

      <p className="mb-4 text-sm leading-relaxed text-[#718096]">
        {task.description}
      </p>

      {/* Move task */}
      <div className="mb-4">
        <label
          htmlFor={`status-${task.id}`}
          className="mb-2 block text-xs font-semibold text-[#52647A]"
        >
          Move task
        </label>

        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) => moveTask(task.id, event.target.value)}
          className="w-full rounded-lg border border-[#E3EAF2] bg-[#F8FAFD] px-3 py-2 text-xs text-[#142D4E] outline-none focus:border-[#315A83]"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between gap-2 border-t border-[#EDF1F6] pt-3">
        <span className="text-xs text-[#8794A5]">{task.createdAt}</span>

        <Link
          to={`/task/${task.id}`}
          className="text-xs font-bold text-[#315A83] transition hover:text-[#142D4E]"
        >
          View details →
        </Link>
      </div>

      {/* Archive button */}
      <button
        type="button"
        onClick={() => archiveTask(task.id)}
        className="mt-3 w-full rounded-lg border border-[#E3EAF2] py-2 text-xs font-semibold text-[#52647A] transition hover:border-[#142D4E] hover:bg-[#EAF0F7] hover:text-[#142D4E]"
      >
        Archive task
      </button>
    </article>
  );
}

export default TaskCard;
