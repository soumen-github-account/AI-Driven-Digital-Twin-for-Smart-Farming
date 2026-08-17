import {
  CalendarDays,
  ChevronDown,
  SunMedium,
} from "lucide-react";

function DashboardHeader() {
  return (
    <section
      className="
        flex
        flex-col
        gap-4

        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      {/* Greeting */}

      <div>
        <div className="flex items-center gap-2">
          <h1
            className="
              text-[22px]
              font-bold
              tracking-[-0.6px]
              text-[var(--color-text-primary)]

              sm:text-[24px]
            "
          >
            Good Morning, Soumen
          </h1>

          <SunMedium
            size={21}
            strokeWidth={1.8}
            className="text-[var(--color-warning)]"
          />
        </div>

        <p
          className="
            mt-1
            text-[11px]
            font-medium
            text-[var(--color-text-secondary)]
          "
        >
          Here's the current health of your farms.
        </p>
      </div>

      {/* Filters */}

      <div className="flex items-center gap-2">

        {/* Date */}

        <button
          type="button"
          className="
            flex
            h-9
            min-w-[145px]
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-3
            text-[10px]
            font-semibold
            text-[var(--color-text-primary)]
            shadow-[0_2px_8px_rgba(0,0,0,0.025)]
            transition

            hover:border-[var(--color-border-hover)]
            hover:bg-[var(--color-surface-secondary)]
          "
        >
          <span>13 May 2025</span>

          <CalendarDays
            size={14}
            strokeWidth={1.8}
            className="text-[var(--color-text-secondary)]"
          />
        </button>

        {/* Farm */}

        <button
          type="button"
          className="
            flex
            h-9
            min-w-[130px]
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-3
            text-[10px]
            font-semibold
            text-[var(--color-text-primary)]
            shadow-[0_2px_8px_rgba(0,0,0,0.025)]
            transition

            hover:border-[var(--color-border-hover)]
            hover:bg-[var(--color-surface-secondary)]
          "
        >
          <span>All Farms</span>

          <ChevronDown
            size={14}
            strokeWidth={1.8}
            className="text-[var(--color-text-secondary)]"
          />
        </button>

      </div>
    </section>
  );
}

export default DashboardHeader;