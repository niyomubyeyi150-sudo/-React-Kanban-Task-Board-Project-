function FilterBar({ searchTerm, setSearchTerm, priority, setPriority }) {
  return (
    <section className="rounded-2xl border border-[#E3EAF2] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#8794A5]">
            ⌕
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search your tasks..."
            aria-label="Search tasks"
            className="w-full rounded-xl border border-[#E3EAF2] bg-[#F8FAFD] py-3 pl-11 pr-4 text-sm text-[#142D4E] outline-none transition placeholder:text-[#9AA7B6] focus:border-[#315A83] focus:ring-2 focus:ring-[#EAF0F7]"
          />
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="priority-filter"
            className="whitespace-nowrap text-sm font-semibold text-[#52647A]"
          >
            Priority:
          </label>

          <select
            id="priority-filter"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="min-w-36 rounded-xl border border-[#E3EAF2] bg-[#F8FAFD] px-4 py-3 text-sm text-[#142D4E] outline-none transition focus:border-[#315A83] focus:ring-2 focus:ring-[#EAF0F7]"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
