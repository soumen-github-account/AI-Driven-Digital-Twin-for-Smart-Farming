import { ChevronDown, Sprout } from "lucide-react";

const data = [
  {
    label: "pH",
    yours: 6.8,
    average: 6.3,
    max: 8,
  },
  {
    label: "Organic\nCarbon (%)",
    yours: 2.3,
    average: 1.8,
    max: 4,
  },
  {
    label: "Nitrogen\n(kg/ha)",
    yours: 45,
    average: 38,
    max: 70,
  },
  {
    label: "Phosphorus\n(kg/ha)",
    yours: 22,
    average: 26,
    max: 50,
  },
  {
    label: "Potassium\n(kg/ha)",
    yours: 210,
    average: 192,
    max: 300,
  },
];

function FieldComparison() {
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
          Field Comparison
        </h2>

      </div>

      <div className="mt-3">

        <div className="flex items-center gap-2">

          <span className="text-[8px] text-[var(--color-text-secondary)]">
            Compared With:
          </span>

          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-[var(--color-border)]
              px-2
              py-1
              text-[8px]
              font-semibold
            "
          >
            All Fields in Green Valley Farm
            <ChevronDown size={11} />
          </button>

        </div>

      </div>

      {/* Legend */}

      <div className="mt-4 flex items-center gap-4">

        <Legend
          color="bg-[var(--color-primary)]"
          text="Your Field (Field 2)"
        />

        <Legend
          color="bg-gray-300"
          text="Farm Average"
        />

      </div>

      {/* Chart */}

      <div
        className="
          mt-5
          flex
          h-[190px]
          items-end
          justify-between
          gap-2
          border-b
          border-[var(--color-border)]
          px-2
        "
      >

        {data.map((item) => {

          const yoursHeight =
            (item.yours / item.max) * 145;

          const avgHeight =
            (item.average / item.max) * 145;

          return (
            <div
              key={item.label}
              className="
                flex
                h-full
                flex-1
                items-end
                justify-center
                gap-1
              "
            >

              {/* Your value */}

              <div className="flex h-full flex-col justify-end">

                <span
                  className="
                    mb-1
                    text-center
                    text-[7px]
                    font-bold
                  "
                >
                  {item.yours}
                </span>

                <div
                  className="
                    w-[18px]
                    rounded-t-md
                    bg-[var(--color-primary)]
                    transition-all
                  "
                  style={{
                    height: `${yoursHeight}px`,
                  }}
                />

              </div>

              {/* Average */}

              <div className="flex h-full flex-col justify-end">

                <span
                  className="
                    mb-1
                    text-center
                    text-[7px]
                    font-bold
                    text-[var(--color-text-muted)]
                  "
                >
                  {item.average}
                </span>

                <div
                  className="
                    w-[18px]
                    rounded-t-md
                    bg-gray-300
                    dark:bg-gray-600
                  "
                  style={{
                    height: `${avgHeight}px`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

      {/* Labels */}

      <div
        className="
          mt-2
          grid
          grid-cols-5
          text-center
        "
      >

        {data.map((item) => (
          <span
            key={item.label}
            className="
              whitespace-pre-line
              text-[7px]
              leading-tight
              text-[var(--color-text-secondary)]
            "
          >
            {item.label}
          </span>
        ))}

      </div>

      {/* Insight */}

      <div
        className="
          mt-4
          flex
          items-start
          gap-2
          rounded-xl
          border
          border-[var(--color-primary)]/10
          bg-[var(--color-surface-secondary)]
          p-3
        "
      >

        <Sprout
          size={14}
          className="
            mt-0.5
            shrink-0
            text-[var(--color-primary)]
          "
        />

        <p
          className="
            text-[8px]
            leading-relaxed
            text-[var(--color-text-secondary)]
          "
        >
          Your field has <b className="text-[var(--color-primary)]">
            higher organic carbon and potassium
          </b> levels than the farm average. Great job!
        </p>

      </div>

    </div>
  );
}

function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-1.5">

      <span
        className={`
          h-2
          w-2
          rounded-sm
          ${color}
        `}
      />

      <span className="text-[8px] text-[var(--color-text-secondary)]">
        {text}
      </span>

    </div>
  );
}

export default FieldComparison;