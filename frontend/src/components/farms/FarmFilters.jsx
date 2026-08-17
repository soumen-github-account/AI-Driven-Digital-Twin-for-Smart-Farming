import {
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

function FarmFilters() {
  const [view, setView] = useState("grid");

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        xl:flex-row
        xl:items-center
      "
    >
      {/* SEARCH */}

      <div className="relative min-w-0 flex-1 xl:max-w-[290px]">
        <Search
          size={15}
          strokeWidth={1.8}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
          "
        />

        <input
          type="text"
          placeholder="Search farms..."
          className="
            h-10
            w-full
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            pl-9
            pr-3
            text-[11px]
            font-medium
            text-[var(--color-text-primary)]
            outline-none
            placeholder:text-[var(--color-text-muted)]
            transition-all
            focus:border-[var(--color-primary)]/50
            focus:ring-3
            focus:ring-[var(--color-primary)]/10
          "
        />
      </div>

      {/* FILTERS */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        <FilterButton label="All Status" />
        <FilterButton label="All Crops" />
        <FilterButton label="Sort by: Newest" wide />

        {/* VIEW TOGGLE */}

        <div
          className="
            flex
            h-10
            items-center
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-1
          "
        >
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`
              flex
              h-8
              w-9
              items-center
              justify-center
              rounded-lg
              transition-all
              ${
                view === "grid"
                  ? `
                    bg-[var(--color-primary)]/10
                    text-[var(--color-primary)]
                    shadow-sm
                  `
                  : `
                    text-[var(--color-text-muted)]
                    hover:text-[var(--color-text-primary)]
                  `
              }
            `}
          >
            <Grid2X2 size={15} />
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            className={`
              flex
              h-8
              w-9
              items-center
              justify-center
              rounded-lg
              transition-all
              ${
                view === "list"
                  ? `
                    bg-[var(--color-primary)]/10
                    text-[var(--color-primary)]
                    shadow-sm
                  `
                  : `
                    text-[var(--color-text-muted)]
                    hover:text-[var(--color-text-primary)]
                  `
              }
            `}
          >
            <List size={15} />
          </button>
        </div>

        {/* MOBILE FILTER */}

        <button
          type="button"
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-3
            text-[10px]
            font-semibold
            text-[var(--color-text-secondary)]
            xl:hidden
          "
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
      </div>
    </div>
  );
}

function FilterButton({ label, wide }) {
  return (
    <button
      type="button"
      className={`
        flex
        h-10
        items-center
        justify-between
        gap-5
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-3
        text-[10px]
        font-semibold
        text-[var(--color-text-primary)]
        transition-all
        hover:border-[var(--color-border-hover)]
        hover:bg-[var(--color-surface-secondary)]
        ${wide ? "min-w-[145px]" : "min-w-[110px]"}
      `}
    >
      {label}

      <span className="text-[var(--color-text-muted)]">
        ⌄
      </span>
    </button>
  );
}

export default FarmFilters;