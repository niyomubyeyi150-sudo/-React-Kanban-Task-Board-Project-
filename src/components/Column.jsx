import TaskCard from "./TaskCard.jsx";

function Column({ title, status, tasks, moveTask, archiveTask }) {
  return (
    <section className="min-w-0 rounded-2xl border border-[#E3EAF2] bg-[#EDF2F8] p-4">
      {/* Column heading */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#315A83]" />

          <h2 className="font-bold text-[#142D4E]">{title}</h2>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#315A83]">
          {tasks.length}
        </span>
      </div>

      {/* Task cards */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              archiveTask={archiveTask}
            />
          ))
        ) : (
          <div className="rounded-xl border-2 border-dashed border-[#C9D5E3] bg-white/60 px-4 py-8 text-center">
            <p className="text-sm font-medium text-[#718096]">
              No tasks here yet.
            </p>

            <p className="mt-1 text-xs text-[#9AA7B6]">
              Your tasks will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Column;
