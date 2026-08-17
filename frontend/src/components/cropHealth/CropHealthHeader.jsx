import {
  CalendarDays,
  ChevronDown,
  Sparkles,
} from "lucide-react";

function CropHealthHeader() {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      <div>
        <div className="flex items-center gap-2">
          <h1
            className="
              text-[23px]
              font-bold
              tracking-[-0.7px]
              text-[var(--color-text-primary)]
              sm:text-[25px]
            "
          >
            Crop Health
          </h1>
        </div>

        <p
          className="
            mt-1
            text-[11px]
            text-[var(--color-text-secondary)]
          "
        >
          Real-time monitoring of crop health and growth conditions.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Date */}
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
            shadow-[0_3px_12px_rgba(0,0,0,0.025)]
            transition
            hover:border-[var(--color-border-hover)]
            hover:bg-[var(--color-surface-secondary)]
          "
        >
          <span>May 01 – May 13, 2025</span>

          <CalendarDays
            size={15}
            className="text-[var(--color-text-secondary)]"
          />
        </button>

        {/* AI Button */}
        <button
          type="button"
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            bg-[var(--color-primary)]
            px-4
            text-[10px]
            font-bold
            text-white
            shadow-[0_5px_16px_rgba(22,163,74,0.18)]
            transition
            hover:bg-[var(--color-primary-hover)]
            active:scale-[0.98]
          "
        >
          <Sparkles size={14} />

          <span>Run AI Crop Analysis</span>

          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}

export default CropHealthHeader;