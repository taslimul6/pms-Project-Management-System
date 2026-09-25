const Filter = ({
  category,
  setCategory,
  status,
  setStatus,
  star,
  setStar,
  sort,
  setSort,
  onReset,
}) => {
  const handleCtg = (e) => {
    setCategory(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleStar = () => {
    setStar((previous) => !previous);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleReset = () => {
    setCategory("ALL");
    setStatus("ALL");
    setStar(false);
    setSort("default");
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2.5 border-t border-zinc-800/80">
        {/* Category Filter */}
        <div>
          <label
            htmlFor="filterCategory"
            className="block text-[10px] font-medium text-zinc-400 mb-1"
          >
            Category
          </label>

          <div className="relative">
            <select
              id="filterCategory"
              onChange={handleCtg}
              value={category}
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Cloud / DevOps">Cloud / DevOps</option>
              <option value="AI & ML">AI & Machine Learning</option>
              <option value="Branding & Growth">Branding & Growth</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="filterStatus"
            className="block text-[10px] font-medium text-zinc-400 mb-1"
          >
            Status
          </label>

          <div className="relative">
            <select
              id="filterStatus"
              onChange={handleStatus}
              value={status}
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="sortBy"
            className="block text-[10px] font-medium text-zinc-400 mb-1"
          >
            Sort
          </label>

          <div className="relative">
            <select
              id="sortBy"
              onChange={handleSort}
              value={sort}
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
              <option value="budget-asc">Budget: Low-High</option>
              <option value="budget-desc">Budget: High-Low</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Starred Toggle & Reset */}
        <div className="flex items-end gap-1.5">
          <button
            type="button"
            id="filterFavoriteBtn"
            onClick={handleStar}
            aria-pressed={star}
            className={`flex-1 py-1.5 px-2 rounded-xl border text-xs font-medium inline-flex items-center justify-center gap-1 transition-all cursor-pointer ${
              star
                ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-yellow-400"
            }`}
            title="Filter Starred"
          >
            <svg
              id="filterStarIcon"
              className="w-3.5 h-3.5"
              fill={star ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>

            <span>Starred</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="py-1.5 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium transition-all cursor-pointer"
            title="Reset Filters"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
