import {
  CheckCircle2,
  Droplets,
} from "lucide-react";

function AIRecommendation() {
  return (
    <div
      className="
        rounded-[14px]
        border
        border-[var(--color-primary)]/15
        bg-[var(--color-primary)]/[0.035]
        p-3
      "
    >
      <div className="mb-3 flex items-center gap-2">

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <Droplets size={17} />
        </div>

        <span className="text-[11px] font-bold text-[var(--color-primary)]">
          AI Recommendation
        </span>
      </div>

      <h3 className="text-[13px] font-bold text-[var(--color-text-primary)]">
        Schedule irrigation for Field 2 tomorrow at 6:00 AM for ~2.5 hours.
      </h3>

      <div className="my-3 h-px bg-[var(--color-border)]" />

      <p className="text-[10px] font-semibold text-[var(--color-text-secondary)]">
        Expected Benefits
      </p>

      <div className="mt-2 space-y-2">
        {[
          "Maintain optimal soil moisture",
          "Prevent yield loss",
          "Improve nutrient uptake",
          "Support healthy growth",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2"
          >
            <CheckCircle2
              size={14}
              className="shrink-0 text-[var(--color-primary)]"
            />

            <span className="text-[10px] text-[var(--color-text-secondary)]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIRecommendation;