import {
  Sparkles,
  CalendarDays,
  Play,
  SlidersHorizontal,
} from "lucide-react";

function AIRRecommendation() {
  return (
    <div
      className="
        rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center gap-2">
        <Sparkles
          size={16}
          className="text-[var(--color-primary)]"
        />

        <h2 className="text-[14px] font-semibold">
          AI Recommendation
        </h2>
      </div>

      <div
        className="
          mt-4 rounded-2xl
          border border-[var(--color-primary)]/10
          bg-[var(--color-primary)]/[0.045]
          p-4
        "
      >
        <p className="text-[14px] font-semibold leading-5">
          Set irrigation for Field 2 tomorrow morning.
        </p>

        <p className="mt-3 text-[11px] leading-5 text-[var(--color-text-secondary)]">
          Expected rainfall later in the day may reduce
          water requirement.
        </p>

        <button className="mt-4 text-[11px] font-semibold text-[var(--color-primary)]">
          View Details →
        </button>
      </div>

      <div className="mt-4 space-y-2">

        <button
          className="
            flex h-10 w-full items-center justify-center
            gap-2 rounded-xl
            bg-[var(--color-primary)]
            text-[11px] font-semibold text-white
            transition hover:bg-[var(--color-primary-hover)]
          "
        >
          <CalendarDays size={14} />
          Schedule Irrigation
        </button>

        <button
          className="
            flex h-10 w-full items-center justify-center
            gap-2 rounded-xl
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            text-[11px] font-semibold
            transition hover:bg-[var(--color-surface-secondary)]
          "
        >
          <Play size={14} />
          Run Now
        </button>

        <button
          className="
            flex h-10 w-full items-center justify-center
            gap-2 rounded-xl
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            text-[11px] font-semibold
            transition hover:bg-[var(--color-surface-secondary)]
          "
        >
          <SlidersHorizontal size={14} />
          Adjust Schedule
        </button>

      </div>
    </div>
  );
}

export default AIRRecommendation;