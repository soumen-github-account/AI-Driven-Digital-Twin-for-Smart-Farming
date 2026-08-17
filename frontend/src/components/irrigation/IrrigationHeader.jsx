import {
  CalendarDays,
  RefreshCw,
  Droplets,
} from "lucide-react";

function IrrigationHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-[25px] font-bold tracking-[-0.8px] text-[var(--color-text-primary)]">
          Irrigation Management
        </h1>

        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          Monitor, schedule, and optimize irrigation across your farms.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">

        {/* Date */}
        <button
          className="
            flex h-10 items-center gap-2 rounded-xl
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-3.5 text-[12px] font-medium
            text-[var(--color-text-primary)]
            shadow-[0_2px_8px_rgba(0,0,0,0.03)]
            transition hover:bg-[var(--color-surface-secondary)]
          "
        >
          <span>May 07 – May 13, 2025</span>

          <CalendarDays
            size={15}
            className="text-[var(--color-text-muted)]"
          />
        </button>

        {/* Refresh */}
        <button
          className="
            flex h-10 items-center gap-2 rounded-xl
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-3.5 text-[12px] font-semibold
            text-[var(--color-text-primary)]
            transition hover:bg-[var(--color-surface-secondary)]
          "
        >
          <RefreshCw size={15} />
          Refresh Data
        </button>

        {/* Schedule */}
        <button
          className="
            flex h-10 items-center gap-2 rounded-xl
            bg-[var(--color-primary)]
            px-4 text-[12px] font-semibold
            text-white
            shadow-[0_5px_16px_rgba(22,163,74,0.18)]
            transition
            hover:bg-[var(--color-primary-hover)]
            active:scale-[0.98]
          "
        >
          <Droplets size={15} />
          Schedule Irrigation
        </button>

      </div>
    </div>
  );
}

export default IrrigationHeader;