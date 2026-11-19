import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F4F7FB] text-[#142D4E]">
      {/* Logo */}
      <header className="mx-auto flex w-full max-w-7xl items-center px-6 py-7">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#142D4E] text-xl font-bold text-white">
            T
          </div>

          <span className="text-xl font-extrabold">TaskDesk</span>
        </Link>
      </header>

      {/* Welcome section */}
      <section className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center">
          <span className="rounded-full border border-[#DCE5F0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#52769B]">
            Welcome to TaskDesk
          </span>

          <h1 className="mt-8 text-5xl leading-tight font-extrabold tracking-tight sm:text-7xl">
            Your work.
            <span className="block text-[#52769B]">Your progress.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-[#718096]">
            A simple workspace to organize your tasks, manage priorities, and
            keep track of your progress.
          </p>

          <Link
            to="/board"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#142D4E] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#142D4E]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#315A83]"
          >
            Get Started
            <span className="text-lg">→</span>
          </Link>

          <p className="mt-6 text-xs text-[#8794A5]">
            Plan smarter. Work better.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center">
        <p className="text-xs text-[#8794A5]">© 2026 TaskDesk</p>
      </footer>
    </main>
  );
}

export default HomePage;
