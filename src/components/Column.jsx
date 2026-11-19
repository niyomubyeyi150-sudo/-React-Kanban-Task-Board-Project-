import TaskCard from "./TaskCard.jsx";

function Column({ title, tasks, color }) {
  return (
    <section className="min-w-0 rounded-2xl bg-[#EFEEE9] p-4">
      <div className="mb-5 flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${color}`}></span>

        <h2 className="font-semibold text-[#252923]">{title}</h2>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#77766F]">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="rounded-xl border-2 border-dashed border-[#D9D6CD] p-6 text-center">
            <p className="text-sm text-[#99978F]">No tasks here yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Column;
