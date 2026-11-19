import { Link } from "react-router-dom";

function ArchivePage({ tasks, restoreTask, deleteTask }) {
  // Display only archived tasks.
  const archivedTasks = tasks.filter((task) => task.archived);

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#142D4E]">
      {/* Navigation */}
      <header className="border-b border-[#E3EAF2] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#142D4E] text-white">
              <span className="text-lg font-bold">T</span>
            </div>

            <div>
              <h1 className="text-xl font-bold">TaskDesk</h1>
              <p className="text-xs text-[#8794A5]">
                Your work, thoughtfully organized.
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="rounded-xl border border-[#E3EAF2] px-4 py-2 text-sm font-semibold text-[#315A83] transition hover:bg-[#EAF0F7]"
          >
            ← Back to Board
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#52759A]">
            Personal Workspace
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">Archived Tasks</h2>

          <p className="mt-2 text-sm text-[#718096]">
            Keep completed or inactive tasks organized.
          </p>
        </div>

        {/* Archive summary */}
        <div className="mb-8 rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#718096]">
            Total archived tasks
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#142D4E]">
            {archivedTasks.length.toString().padStart(2, "0")}
          </h3>
        </div>

        {/* Archived task list */}
        {archivedTasks.length > 0 ? (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {archivedTasks.map((task) => (
              <article
                key={task.id}
                className="rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#718096]">
                    {task.category}
                  </span>

                  <span className="rounded-full bg-[#EAF0F7] px-3 py-1 text-xs font-semibold text-[#315A83]">
                    {task.priority}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold text-[#142D4E]">
                  {task.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-[#718096]">
                  {task.description}
                </p>

                <div className="mb-5 border-t border-[#EDF1F6] pt-3">
                  <p className="text-xs text-[#8794A5]">
                    Created: {task.createdAt}
                  </p>

                  <p className="mt-2 text-xs text-[#8794A5]">
                    Previous status: {task.status}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => restoreTask(task.id)}
                    className="rounded-xl bg-[#142D4E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#315A83]"
                  >
                    Restore Task
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Permanently delete this task?",
                      );

                      if (confirmed) {
                        deleteTask(task.id);
                      }
                    }}
                    className="rounded-xl border border-[#E3EAF2] px-4 py-3 text-sm font-semibold text-[#718096] transition hover:border-[#D7A7AF] hover:bg-[#FBF0F2] hover:text-[#A13F52]"
                  >
                    Delete Permanently
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-[#C9D5E3] bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0F7]">
              <span className="text-3xl text-[#315A83]">▤</span>
            </div>

            <h3 className="text-xl font-bold text-[#142D4E]">
              Your archive is empty
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-[#718096]">
              Tasks you archive will appear here. You can restore them whenever
              you need.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315A83]"
            >
              Return to Board
            </Link>
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-[#E3EAF2] bg-white px-5 py-5 text-center">
        <p className="text-xs text-[#8794A5]">
          © 2026 TaskDesk. Organize your work, one task at a time.
        </p>
      </footer>
    </div>
  );
}

export default ArchivePage;
