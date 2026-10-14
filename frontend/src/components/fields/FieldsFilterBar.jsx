import {
  Grid2X2,
  List,
  Search,
} from "lucide-react";

import FilterButton from "./FilterButton";

export default function FieldsFilterBar({
  search,
  setSearch,
  cropFilter,
  setCropFilter,
  farmFilter,
  setFarmFilter,
  healthFilter,
  setHealthFilter,
  viewMode,
  setViewMode,
}) {
  return (
    <section
      className="
        mt-[22px]
        rounded-[15px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]/65
        p-[10px]
        shadow-[0_8px_30px_rgba(0,0,0,.04)]
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          flex-col
          gap-[9px]
          xl:flex-row
          xl:items-center
        "
      >
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            strokeWidth={1.7}
            className="
              absolute
              left-[13px]
              top-1/2
              -translate-y-1/2
              text-[var(--color-text-muted)]
            "
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fields, farms or crops..."
            className="
              h-[43px]
              w-full
              rounded-[10px]
              border
              border-[var(--color-border)]
              bg-[var(--color-bg)]
              pl-[39px]
              pr-[12px]
              text-[11px]
              font-medium
              text-[var(--color-text-primary)]
              outline-none
              placeholder:text-[var(--color-text-muted)]
              focus:border-[var(--color-primary)]
              focus:ring-[3px]
              focus:ring-[var(--color-primary)]/10
            "
          />
        </div>

        <FilterButton
          value={farmFilter}
          onChange={setFarmFilter}
          options={[
            "All Farms",
            "Green Valley Farm",
            "Sunrise Farm",
            "Organic Farm",
          ]}
        />

        <FilterButton
          value={cropFilter}
          onChange={setCropFilter}
          options={[
            "All Crops",
            "Wheat",
            "Corn",
            "Soybean",
            "Carrot",
            "Vegetables",
            "Tomato",
          ]}
        />

        <FilterButton
          value={healthFilter}
          onChange={setHealthFilter}
          options={[
            "All Health",
            "Healthy",
            "Good",
            "Attention",
          ]}
        />

        <div
          className="
            flex
            h-[43px]
            shrink-0
            items-center
            rounded-[10px]
            border
            border-[var(--color-border)]
            bg-[var(--color-bg)]
            p-[3px]
          "
        >
          <button
            onClick={() => setViewMode("grid")}
            className={`
              flex
              h-[35px]
              w-[39px]
              items-center
              justify-center
              rounded-[8px]
              transition
              ${
                viewMode === "grid"
                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              }
            `}
          >
            <Grid2X2 size={16} />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`
              flex
              h-[35px]
              w-[39px]
              items-center
              justify-center
              rounded-[8px]
              transition
              ${
                viewMode === "list"
                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              }
            `}
          >
            <List size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}