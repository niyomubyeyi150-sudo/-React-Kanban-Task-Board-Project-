function TaskCard({ task }) {
  const priorityStyles = {
    High: "bg-[#F7E4E1] text-[#A44238]",
    Medium: "bg-[#F9EBD7] text-[#95601C]",
    Low: "bg-[#E8F0E8] text-[#315D3C]",
  };

  return (
    <article className="rounded-xl border border-[#EAE7DF] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-[#88877F]">
          {task.category}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="mb-2 text-base font-semibold text-[#252923]">
        {task.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-[#77766F]">
        {task.description}
      </p>

      <div className="flex items-center justify-between border-t border-[#F0EEE9] pt-3">
        <span className="text-xs text-[#99978F]">
          Created: {task.createdAt}
        </span>

        <span className="text-xs font-medium text-[#C77750]">
          View details →
        </span>
      </div>
    </article>
  );
}

export default TaskCard;
