import {
  ArrowRight,
  Info,
  Sprout,
  Zap,
} from "lucide-react";

function AIRecommendation() {
  return (
    <div
      className="
        min-h-[255px]
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3.5
        shadow-[0_4px_16px_rgba(15,23,42,0.035)]
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <h3
            className="
              text-[11px]
              font-bold
              text-[var(--color-text-primary)]
            "
          >
            AI Recommendation
          </h3>

          <p
            className="
              mt-0.5
              text-[8px]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            Recommended for you
          </p>
        </div>

        <Info
          size={13}
          className="text-[var(--color-text-muted)]"
        />

      </div>

      {/* Recommendation */}

      <div
        className="
          mt-3
          rounded-xl
          border
          border-[var(--color-primary)]/15
          bg-[var(--color-surface-secondary)]
          p-3
        "
      >
        {/* Top */}

        <div className="flex gap-2.5">

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--color-primary)]/10
              text-[var(--color-primary)]
            "
          >
            <Sprout
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex items-center justify-between gap-2">

              <h4
                className="
                  text-[10px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                Irrigation Optimization
              </h4>

              <span
                className="
                  shrink-0
                  rounded-full
                  bg-[var(--color-primary)]/10
                  px-2
                  py-1
                  text-[7px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                High Impact
              </span>

            </div>

            <p
              className="
                mt-1
                text-[8px]
                font-medium
                leading-[1.5]
                text-[var(--color-text-secondary)]
              "
            >
              Field 7 is showing low soil moisture.
              Optimize irrigation in the next 24 hours.
            </p>

          </div>
        </div>

        {/* Details */}

        <div className="mt-3 space-y-2">

          <div>
            <p className="text-[7px] font-bold text-[var(--color-text-primary)]">
              Why?
            </p>

            <p className="mt-0.5 text-[8px] text-[var(--color-text-secondary)]">
              Soil moisture is 18% lower than optimal level.
            </p>
          </div>

          <div>
            <p className="text-[7px] font-bold text-[var(--color-text-primary)]">
              Action
            </p>

            <p className="mt-0.5 text-[8px] text-[var(--color-text-secondary)]">
              Increase irrigation by 20% for 2 days.
            </p>
          </div>

        </div>

        {/* Actions */}

        <div className="mt-3 flex items-center gap-2">

          <button
            type="button"
            className="
              flex
              h-8
              items-center
              justify-center
              gap-1.5
              rounded-lg
              bg-[var(--color-primary)]
              px-3
              text-[8px]
              font-bold
              text-white
              shadow-[0_4px_10px_rgba(22,163,74,0.18)]
              transition

              hover:bg-[var(--color-primary-hover)]
              active:scale-[0.98]
            "
          >
            <Zap size={11} />

            Apply Recommendation
          </button>

          <button
            type="button"
            className="
              flex
              items-center
              gap-1
              px-1
              text-[8px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            View Details

            <ArrowRight size={11} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default AIRecommendation;