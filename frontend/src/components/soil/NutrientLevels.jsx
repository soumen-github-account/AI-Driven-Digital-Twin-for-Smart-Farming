import { ArrowRight } from "lucide-react";

const nutrients = [
  {
    name: "Nitrogen (N)",
    value: 45,
    max: 100,
    status: "Medium",
    type: "warning",
  },
  {
    name: "Phosphorus (P₂O₅)",
    value: 22,
    max: 60,
    status: "Low",
    type: "danger",
  },
  {
    name: "Potassium (K₂O)",
    value: 210,
    max: 300,
    status: "High",
    type: "good",
  },
  {
    name: "Sulfur (S)",
    value: 18,
    max: 40,
    status: "Medium",
    type: "warning",
  },
  {
    name: "Zinc (Zn)",
    value: 1.2,
    max: 3,
    status: "Low",
    type: "warning",
  },
  {
    name: "Iron (Fe)",
    value: 4.5,
    max: 8,
    status: "Sufficient",
    type: "good",
  },
];

function NutrientLevels() {
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

      <div className="flex items-center justify-between">

        <h2 className="text-[12px] font-bold">
          Nutrient Levels
        </h2>

        <span
          className="
            text-[8px]
            font-medium
            text-[var(--color-text-muted)]
          "
        >
          kg/ha
        </span>

      </div>

      <div className="mt-5 space-y-4">

        {nutrients.map((item) => {

          const width =
            (item.value / item.max) * 100;

          const bar =
            item.type === "danger"
              ? "bg-[var(--color-danger)]"
              : item.type === "warning"
                ? "bg-[var(--color-warning)]"
                : "bg-[var(--color-primary)]";

          const status =
            item.type === "danger"
              ? "text-[var(--color-danger)]"
              : item.type === "warning"
                ? "text-[var(--color-warning)]"
                : "text-[var(--color-primary)]";

          return (
            <div key={item.name}>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <span
                  className="
                    min-w-0
                    truncate
                    text-[8px]
                    font-semibold
                  "
                >
                  {item.name}
                </span>

                <span className="text-[8px] font-bold">
                  {item.value}
                </span>

                <span
                  className={`
                    w-12
                    text-right
                    text-[8px]
                    font-bold
                    ${status}
                  `}
                >
                  {item.status}
                </span>

              </div>

              <div
                className="
                  mt-2
                  h-[6px]
                  overflow-hidden
                  rounded-full
                  bg-[var(--color-border)]
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    ${bar}
                  `}
                  style={{
                    width: `${Math.min(width, 100)}%`,
                  }}
                />
              </div>

            </div>
          );
        })}

      </div>

      <button
        type="button"
        className="
          mt-5
          flex
          items-center
          gap-2
          text-[9px]
          font-bold
          text-[var(--color-primary)]
          hover:gap-3
        "
      >
        View Detailed Nutrient Report
        <ArrowRight size={13} />
      </button>

    </div>
  );
}

export default NutrientLevels;