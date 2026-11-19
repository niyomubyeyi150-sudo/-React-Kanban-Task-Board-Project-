import Column from "../components/Column.jsx";

function BoardPage({ tasks }) {
  // Separate tasks according to their status
  const todoTasks = tasks.filter(
    (task) => task.status === "todo" && !task.archived,
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress" && !task.archived,
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done" && !task.archived,
  );

  // Calculate total active tasks
  const totalTasks = tasks.filter((task) => !task.archived).length;

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#252923]">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-[#EAE7DF] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Logo and application name */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#252923] text-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <path d="M14 17.5h7M17.5 14v7" />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">TaskDesk</h1>
              <p className="text-xs text-[#99978F]">
                Work smarter. Stay organized.
              </p>
            </div>
          </div>

          {/* Workspace information */}
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-[#77766F] sm:block">
              My Workspace
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAE7DF] bg-[#E8E0D5] font-semibold text-[#76583C]">
              N
            </div>
          </div>
        </div>
      </header>

      {/* Main dashboard */}
      <main className="mx-auto max-w-7xl px-5 py-10">
        {/* Welcome section */}
        <section className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C77750]">
              Workspace overview
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Task Board
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#77766F]">
              Keep your priorities clear, manage your daily work, and track your
              progress in one place.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C77750] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#AD6240] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C77750] focus:ring-offset-2"
          >
            <span className="text-lg leading-none">+</span>
            Add New Task
          </button>
        </section>

        {/* Statistics */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total tasks */}
          <div className="rounded-2xl border border-[#EAE7DF] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#77766F]">Total tasks</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8E9E1] text-[#C77750]">
                <span className="text-xl">▤</span>
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold">{totalTasks}</p>

            <p className="mt-1 text-xs text-[#99978F]">
              Tasks in your workspace
            </p>
          </div>

          {/* In progress */}
          <div className="rounded-2xl border border-[#EAE7DF] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#77766F]">In progress</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9EBD7] text-[#95601C]">
                <span className="text-xl">◷</span>
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#C77750]">
              {inProgressTasks.length}
            </p>

            <p className="mt-1 text-xs text-[#99978F]">
              Tasks currently being worked on
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-[#EAE7DF] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#77766F]">Completed</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#527653]">
                <span className="text-xl">✓</span>
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#527653]">
              {doneTasks.length}
            </p>

            <p className="mt-1 text-xs text-[#99978F]">
              Tasks successfully completed
            </p>
          </div>
        </section>

        {/* Board heading */}
        <section className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold">Project board</h3>
            <p className="mt-1 text-sm text-[#99978F]">
              Organize and track your tasks by status.
            </p>
          </div>

          <p className="text-xs font-medium text-[#77766F]">
            {totalTasks} active {totalTasks === 1 ? "task" : "tasks"}
          </p>
        </section>

        {/* Kanban columns */}
        <section className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
          <Column title="To Do" tasks={todoTasks} color="bg-[#C77750]" />

          <Column
            title="In Progress"
            tasks={inProgressTasks}
            color="bg-[#D6A04B]"
          />

          <Column title="Done" tasks={doneTasks} color="bg-[#6D956E]" />
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-[#EAE7DF] py-6 text-center">
          <p className="text-xs text-[#99978F]">
            © 2026 TaskDesk. Keep your work moving forward.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default BoardPage;
