import { ArrowRight, Sprout } from "lucide-react";

function SoilHealthScore() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.025)]
      "
    >

      <div className="flex items-center gap-2">

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <Sprout size={16} />
        </div>

        <h2 className="text-[12px] font-bold">
          Soil Health Score
        </h2>

      </div>

      <div className="mt-5 flex items-center gap-5">

        {/* Gauge */}

        <div
          className="
            relative
            h-[185px]
            w-[185px]
            shrink-0
            rounded-full
            [background:conic-gradient(var(--color-primary)_0deg_281deg,var(--color-surface-secondary)_281deg_360deg)]
          "
        >

          <div
            className="
              absolute
              inset-[13px]
              flex
              flex-col
              items-center
              justify-center
              rounded-full
              bg-[var(--color-surface)]
            "
          >

            <span
              className="
                text-[40px]
                font-extrabold
                tracking-[-2px]
              "
            >
              78
            </span>

            <span
              className="
                text-[9px]
                font-medium
                text-[var(--color-text-muted)]
              "
            >
              /100
            </span>

            <span
              className="
                mt-1
                text-[10px]
                font-bold
                text-[var(--color-primary)]
              "
            >
              Good
            </span>

          </div>

        </div>

        {/* Explanation */}

        <div className="min-w-0 flex-1">

          <p
            className="
              text-[9px]
              font-medium
              leading-relaxed
              text-[var(--color-text-secondary)]
            "
          >
            Your soil is in good condition.
          </p>

          <p
            className="
              mt-3
              text-[9px]
              leading-relaxed
              text-[var(--color-text-secondary)]
            "
          >
            Keep up with balanced nutrient management
            and organic matter improvement.
          </p>

          <div className="mt-4 space-y-2">

            <ScoreRow
              color="bg-[var(--color-primary)]"
              label="Excellent (80–100)"
              value="32%"
            />

            <ScoreRow
              color="bg-lime-500"
              label="Good (60–79)"
              value="45%"
            />

            <ScoreRow
              color="bg-[var(--color-warning)]"
              label="Fair (40–60)"
              value="18%"
            />

            <ScoreRow
              color="bg-[var(--color-danger)]"
              label="Poor (0–40)"
              value="5%"
            />

          </div>

        </div>

      </div>

      <button
        type="button"
        className="
          mt-4
          flex
          items-center
          gap-2
          text-[9px]
          font-bold
          text-[var(--color-primary)]
          transition
          hover:gap-3
        "
      >
        How is this score calculated?
        <ArrowRight size={13} />
      </button>

    </div>
  );
}

function ScoreRow({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">

      <div className="flex min-w-0 items-center gap-2">

        <span
          className={`
            h-2
            w-2
            shrink-0
            rounded-full
            ${color}
          `}
        />

        <span
          className="
            truncate
            text-[8px]
            text-[var(--color-text-secondary)]
          "
        >
          {label}
        </span>

      </div>

      <span className="text-[8px] font-bold">
        {value}
      </span>

    </div>
  );
}

export default SoilHealthScore;