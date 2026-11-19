import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the task using its ID.
  const task = tasks.find((item) => item.id === id);

  // Form states.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("Medium");

  // Fill the form with the selected task.
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  // Save task changes.
  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    updateTask(id, {
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
    });

    navigate("/");
  }

  // Delete task.
  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      deleteTask(id);
      navigate("/");
    }
  }

  // Task not found.
  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F7FB] px-5">
        <div className="w-full max-w-md rounded-2xl border border-[#E3EAF2] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF0F7]">
            <span className="text-2xl text-[#315A83]">!</span>
          </div>

          <h2 className="text-2xl font-bold text-[#142D4E]">Task not found</h2>

          <p className="mt-3 text-sm text-[#718096]">
            This task may have been deleted or does not exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315A83]"
          >
            Back to Board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] px-5 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Page heading */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52759A]">
              TaskDesk / Task Details
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#142D4E]">
              Edit Task
            </h1>

            <p className="mt-2 text-sm text-[#718096]">
              Update your task information.
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-[#E3EAF2] bg-white px-4 py-3 text-sm font-semibold text-[#315A83] transition hover:bg-[#EAF0F7]"
          >
            ← Back
          </Link>
        </div>

        {/* Edit form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="edit-title"
              className="mb-2 block text-sm font-semibold text-[#142D4E]"
            >
              Task title
            </label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full rounded-xl border border-[#E3EAF2] px-4 py-3 text-sm outline-none transition focus:border-[#315A83] focus:ring-2 focus:ring-[#EAF0F7]"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="edit-description"
              className="mb-2 block text-sm font-semibold text-[#142D4E]"
            >
              Description
            </label>

            <textarea
              id="edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="5"
              className="w-full resize-y rounded-xl border border-[#E3EAF2] px-4 py-3 text-sm outline-none transition focus:border-[#315A83] focus:ring-2 focus:ring-[#EAF0F7]"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="edit-category"
              className="mb-2 block text-sm font-semibold text-[#142D4E]"
            >
              Category
            </label>

            <select
              id="edit-category"
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

          {/* Status */}
          <div className="mb-6">
            <label
              htmlFor="edit-status"
              className="mb-2 block text-sm font-semibold text-[#142D4E]"
            >
              Task status
            </label>

            <select
              id="edit-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-[#E3EAF2] bg-white px-4 py-3 text-sm outline-none focus:border-[#315A83]"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mb-8">
            <label
              htmlFor="edit-priority"
              className="mb-2 block text-sm font-semibold text-[#142D4E]"
            >
              Priority
            </label>

            <select
              id="edit-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full rounded-xl border border-[#E3EAF2] bg-white px-4 py-3 text-sm outline-none focus:border-[#315A83]"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#EDF1F6] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl border border-[#D7A7AF] px-5 py-3 text-sm font-semibold text-[#A13F52] transition hover:bg-[#FBF0F2]"
            >
              Delete Task
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#142D4E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#315A83] hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Task metadata */}
        <div className="mt-5 text-center text-xs text-[#8794A5]">
          Task ID: {task.id} · Created: {task.createdAt}
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
