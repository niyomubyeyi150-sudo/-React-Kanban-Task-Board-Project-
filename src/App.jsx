import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import initialTasks from "./data/initialTasks.js";
import useLocalStorage from "./hooks/useLocalStorage.js";

import HomePage from "./pages/HomePage.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";
import ArchivePage from "./pages/ArchivePage.jsx";

const STORAGE_KEY = "taskdesk-tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Save tasks whenever they change.
  useLocalStorage(STORAGE_KEY, tasks, !isLoading);

  // Load saved tasks when the application starts.
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error loading saved tasks:", error);
      }
    }

    // Simulate loading tasks for the first visit.
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Add a new task.
  function addTask(taskData) {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().slice(0, 10),
      status: taskData.status || "todo",
      priority: taskData.priority || "Medium",
      archived: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  // Move a task to another column.
  function moveTask(taskId, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }

  // Update task information.
  function updateTask(taskId, updatedData) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task,
      ),
    );
  }

  // Delete a task.
  function deleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  }

  // Archive a task.
  function archiveTask(taskId) {
    updateTask(taskId, { archived: true });
  }

  // Restore a task from the archive.
  function restoreTask(taskId) {
    updateTask(taskId, { archived: false });
  }

  // Loading screen.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F7FB]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#DCE5F0] border-t-[#142D4E]" />

          <h1 className="text-2xl font-bold text-[#142D4E]">TaskDesk</h1>

          <p className="mt-2 text-sm text-[#718096]">
            Preparing your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Welcome page */}
      <Route path="/" element={<HomePage />} />

      {/* Main Kanban board */}
      <Route
        path="/board"
        element={
          <BoardPage
            tasks={tasks}
            addTask={addTask}
            moveTask={moveTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            archiveTask={archiveTask}
          />
        }
      />

      {/* Task details */}
      <Route
        path="/task/:id"
        element={
          <TaskDetailPage
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
        }
      />

      {/* Archived tasks */}
      <Route
        path="/archive"
        element={
          <ArchivePage
            tasks={tasks}
            restoreTask={restoreTask}
            deleteTask={deleteTask}
          />
        }
      />

      {/* Not found */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-[#F4F7FB]">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#142D4E]">
                Page not found
              </h1>

              <Link
                to="/"
                className="mt-4 inline-block rounded-xl bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#315A83]"
              >
                Return to TaskDesk
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
