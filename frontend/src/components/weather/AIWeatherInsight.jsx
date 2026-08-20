import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

function AIWeatherInsight() {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-primary)]/10
        bg-[color-mix(in_srgb,var(--color-primary)_5%,var(--color-surface))]
        p-4
      "
    >
      <div className="flex items-center gap-2">
        <div
          className="
            flex h-8 w-8 items-center justify-center
            rounded-xl
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <Sparkles size={16} />
        </div>

        <h2 className="text-[13px] font-bold">
          AI Weather Insight
        </h2>
      </div>

      <div className="mt-4">

        <h3 className="text-[13px] font-bold leading-5 text-[var(--color-primary)]">
          Rainfall probability is high tomorrow.
          Irrigation can be reduced.
        </h3>

        <p className="mt-3 text-[10px] leading-5 text-[var(--color-text-secondary)]">
          Based on weather forecast and current soil
          moisture levels, reducing irrigation tomorrow
          could save approximately 18–25% water.
        </p>

        <button
          className="
            mt-4
            flex items-center gap-2
            text-[10px]
            font-bold
            text-[var(--color-primary)]
          "
        >
          View Detailed Insight
          <ArrowRight size={13} />
        </button>

      </div>
    </div>
  );
}

export default AIWeatherInsight;