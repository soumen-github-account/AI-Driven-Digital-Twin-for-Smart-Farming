import { ChevronDown, Leaf } from "lucide-react";

function HistoricalTrends() {
  const points = [
    [0, 72],
    [45, 65],
    [90, 67],
    [135, 56],
    [180, 59],
    [225, 64],
    [270, 68],
    [315, 76],
    [360, 74],
    [405, 82],
    [450, 77],
    [495, 83],
    [540, 79],
    [585, 85],
    [630, 82],
    [675, 88],
  ];

  const line = points
    .map(([x, y]) => `${x},${100 - y}`)
    .join(" ");

  const area = `0,100 ${line} 675,100`;

  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.025)]
      "
    >

      <div className="flex items-center justify-between">

        <h2 className="text-[12px] font-bold">
          Historical Trends
        </h2>

        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--color-border)]
            px-2.5
            py-1.5
            text-[8px]
            font-semibold
          "
        >
          Last 12 Months
          <ChevronDown size={12} />
        </button>

      </div>

      {/* Tabs */}

      <div
        className="
          mt-4
          flex
          gap-4
          overflow-x-auto
          border-b
          border-[var(--color-border)]
          pb-2
        "
      >
        {[
          "Organic Carbon",
          "pH",
          "Nitrogen",
          "Phosphorus",
          "Potassium",
        ].map((item, index) => (
          <button
            key={item}
            type="button"
            className={`
              shrink-0
              text-[8px]
              font-semibold
              ${
                index === 0
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)]"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-4">

        <div className="flex items-center gap-2">

          <Leaf
            size={13}
            className="text-[var(--color-primary)]"
          />

          <span className="text-[9px] font-semibold">
            Organic Carbon (%)
          </span>

        </div>

        <div className="mt-4">

          <svg
            viewBox="0 0 675 160"
            className="h-[180px] w-full"
            preserveAspectRatio="none"
          >

            {/* Horizontal grid */}

            {[20, 50, 80, 110, 140].map((y) => (
              <line
                key={y}
                x1="0"
                x2="675"
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                className="text-[var(--color-text-primary)]"
              />
            ))}

            {/* Area */}

            <polygon
              points={area}
              className="fill-[var(--color-primary)]/10"
            />

            {/* Line */}

            <polyline
              points={line}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-primary)]"
            />

            {/* Dots */}

            {points.map(([x, y], index) => (
              <circle
                key={index}
                cx={x}
                cy={100 - y}
                r="2.5"
                className="fill-[var(--color-primary)]"
              />
            ))}

          </svg>

        </div>

        <div
          className="
            flex
            justify-between
            text-[7px]
            text-[var(--color-text-muted)]
          "
        >
          <span>Jun '24</span>
          <span>Jul '24</span>
          <span>Aug '24</span>
          <span>Sep '24</span>
          <span>Oct '24</span>
          <span>Nov '24</span>
          <span>Dec '24</span>
          <span>Jan '25</span>
          <span>Feb '25</span>
          <span>Mar '25</span>
          <span>Apr '25</span>
          <span>May '25</span>
        </div>

      </div>

      {/* Insight */}

      <div
        className="
          mt-4
          rounded-xl
          border
          border-[var(--color-primary)]/10
          bg-[var(--color-surface-secondary)]
          px-3
          py-2.5
        "
      >
        <p
          className="
            text-[8px]
            font-semibold
            text-[var(--color-primary)]
          "
        >
          Organic Carbon has improved by 0.8% in the last
          12 months.
        </p>

        <p
          className="
            mt-1
            text-[8px]
            text-[var(--color-text-secondary)]
          "
        >
          Keep adding organic matter to maintain soil health.
        </p>
      </div>

    </div>
  );
}

export default HistoricalTrends;