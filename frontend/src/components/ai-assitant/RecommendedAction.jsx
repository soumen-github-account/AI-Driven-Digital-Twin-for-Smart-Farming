import {
  CalendarDays,
  Play,
  SlidersHorizontal,
} from "lucide-react";

function RecommendedAction() {
  return (
    <div
      className="
        mt-4
        flex
        flex-col
        gap-4
        rounded-[14px]
        border
        border-[var(--color-primary)]/15
        bg-[var(--color-primary)]/[0.035]
        p-3
        lg:flex-row
        lg:items-center
      "
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <CalendarDays size={17} />
        </div>

        <div>
          <p className="text-[10px] font-bold text-[var(--color-primary)]">
            Recommended Action
          </p>

          <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
            Schedule irrigation for Field 2 tomorrow at 6:00 AM for 2.5 hours
            using Drip irrigation.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

        <button
          className="
            flex
            h-9
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[var(--color-primary)]
            px-4
            text-[10px]
            font-bold
            text-white
            shadow-[0_4px_12px_rgba(22,163,74,0.14)]
            transition
            hover:bg-[var(--color-primary-hover)]
            active:scale-[0.98]
          "
        >
          <CalendarDays size={14} />
          Schedule Irrigation
        </button>

        <button
          className="
            flex
            h-9
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[var(--color-primary)]/30
            bg-[var(--color-surface)]
            px-4
            text-[10px]
            font-bold
            text-[var(--color-primary)]
            transition
            hover:bg-[var(--color-primary)]/[0.04]
          "
        >
          <Play size={14} />
          Run Now
        </button>

        <button
          className="
            flex
            h-9
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-4
            text-[10px]
            font-bold
            text-[var(--color-text-primary)]
            transition
            hover:bg-[var(--color-surface-secondary)]
          "
        >
          <SlidersHorizontal size={14} />
          Adjust Schedule
        </button>

      </div>
    </div>
  );
}

export default RecommendedAction;