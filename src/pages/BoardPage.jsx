import { useState } from "react";
import { Link } from "react-router-dom";

import Column from "../components/Column.jsx";
import FilterBar from "../components/FilterBar.jsx";
import useTaskFilter from "../hooks/useTaskFilter.js";

function BoardPage({ tasks, addTask, moveTask, archiveTask }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [newPriority, setNewPriority] = useState("Medium");
  const [status, setStatus] = useState("todo");

  // Do not show archived tasks on the board.
  const activeTasks = tasks.filter((task) => !task.archived);

  // Apply search and priority filters.
  const filteredTasks = useTaskFilter(activeTasks, searchTerm, priority);

  // Calculate dashboard statistics.
  const totalTasks = activeTasks.length;

  const todoCount = activeTasks.filter((task) => task.status === "todo").length;

  const progressCount = activeTasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const doneCount = activeTasks.filter((task) => task.status === "done").length;

  // Create a new task.
  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      category,
      priority: newPriority,
      status,
    });

    setTitle("");
    setDescription("");
    setCategory("Development");
    setNewPriority("Medium");
    setStatus("todo");
    setShowForm(false);
  }

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
              <h1 className="text-xl font-bold tracking-tight">TaskDesk</h1>
              <p className="text-xs text-[#8794A5]">
                Your work, thoughtfully organized.
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-5">
            <Link to="/" className="text-sm font-semibold text-[#142D4E]">
              Board
            </Link>

            <Link
              to="/archive"
              className="text-sm font-medium text-[#718096] transition hover:text-[#142D4E]"
            >
              Archive
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:py-10">
        {/* Page heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#52759A]">
              Personal Workspace
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Workspace
            </h2>

            <p className="mt-2 text-sm text-[#718096]">
              Organize your work and keep track of your progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#315A83] hover:shadow-md"
          >
            + Create Task
          </button>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Tasks"
            count={totalTasks}
            description="All active tasks"
          />

          <StatCard
            title="To Do"
            count={todoCount}
            description="Waiting to start"
          />

          <StatCard
            title="In Progress"
            count={progressCount}
            description="Currently working on"
          />

          <StatCard
            title="Completed"
            count={doneCount}
            description="Successfully finished"
          />
        </section>

        {/* Create task form */}
        {showForm && (
          <section className="mb-8 rounded-2xl border border-[#DCE5F0] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#142D4E]">
                  Create a new task
                </h3>

                <p className="mt-1 text-sm text-[#8794A5]">
                  Add a task to your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#718096] hover:bg-[#F1F4F8]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Task title
                </label>

                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="What needs to be done?"
                  required
                  className="w-full rounded-xl border border-[#E3EAF2] px-4 py-3 text-sm outline-none focus:border-[#315A83] focus:ring-2 focus:ring-[#EAF0F7]"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-2 block text-sm font-semibold"
                >
                  Description
                </label>

                <textarea
                  id="task-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe your task..."
                  rows="3"
                  className="w-full rounded-xl border border-[#E3EAF2] px-4 py-3 text-sm outline-none focus:border-[#315A83] focus:ring-2 focus:ring-[#EAF0F7]"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="task-category"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Category
                  </label>

                  <select
                    id="task-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-xl border border-[#E3EAF2] bg-white px-4 py-3 text-sm outline-none focus:border-[#315A83]"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Planning</option>
                    <option>Personal</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="task-priority"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Priority
                  </label>

                  <select
                    id="task-priority"
                    value={newPriority}
                    onChange={(event) => setNewPriority(event.target.value)}
                    className="w-full rounded-xl border border-[#E3EAF2] bg-white px-4 py-3 text-sm outline-none focus:border-[#315A83]"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="task-status"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Status
                  </label>

                  <select
                    id="task-status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full rounded-xl border border-[#E3EAF2] bg-white px-4 py-3 text-sm outline-none focus:border-[#315A83]"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#EDF1F6] pt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-[#E3EAF2] px-5 py-3 text-sm font-semibold text-[#52647A] hover:bg-[#F4F7FB]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315A83]"
                >
                  Save Task
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Search and filter */}
        <section className="mb-8">
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priority={priority}
            setPriority={setPriority}
          />
        </section>

        {/* Kanban board */}
        <section>
          <div className="mb-5">
            <h3 className="text-xl font-bold">Task Board</h3>
            <p className="mt-1 text-sm text-[#8794A5]">
              Manage your tasks across different stages.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
            <Column
              title="To Do"
              status="todo"
              tasks={filteredTasks.filter((task) => task.status === "todo")}
              moveTask={moveTask}
              archiveTask={archiveTask}
            />

            <Column
              title="In Progress"
              status="in-progress"
              tasks={filteredTasks.filter(
                (task) => task.status === "in-progress",
              )}
              moveTask={moveTask}
              archiveTask={archiveTask}
            />

            <Column
              title="Done"
              status="done"
              tasks={filteredTasks.filter((task) => task.status === "done")}
              moveTask={moveTask}
              archiveTask={archiveTask}
            />
          </div>

          {filteredTasks.length === 0 && (
            <p className="mt-5 text-center text-sm text-[#718096]">
              No tasks match your search or priority filter.
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E3EAF2] bg-white px-5 py-5 text-center">
        <p className="text-xs text-[#8794A5]">
          © 2026 TaskDesk. Organize your work, one task at a time.
        </p>
      </footer>
    </div>
  );
}

// Reusable statistics card.
function StatCard({ title, count, description }) {
  return (
    <div className="rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-medium text-[#718096]">{title}</p>

      <h3 className="mt-3 text-3xl font-bold text-[#142D4E]">
        {count.toString().padStart(2, "0")}
      </h3>

      <p className="mt-2 text-xs text-[#8794A5]">{description}</p>
    </div>
  );
}

export default BoardPage;
