import {
  Info,
  Leaf,
} from "lucide-react";

const indices = [
  {
    name: "NDVI",
    value: "0.78",
    status: "Healthy",
  },
  {
    name: "EVI",
    value: "0.62",
    status: "Healthy",
  },
  {
    name: "SAVI",
    value: "0.71",
    status: "Healthy",
  },
  {
    name: "GNDVI",
    value: "0.76",
    status: "Healthy",
  },
  {
    name: "NDRE",
    value: "0.48",
    status: "Moderate",
  },
  {
    name: "Chlorophyll Index",
    value: "1.32",
    status: "Healthy",
  },
];

function VegetationIndices() {
  return (
    <div
      className="
        min-h-[320px]
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-bold">
          Vegetation Indices
        </h2>

        <Info
          size={15}
          className="text-[var(--color-text-muted)]"
        />
      </div>

      <div className="mt-4 divide-y divide-[var(--color-border)]">
        {indices.map((item) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              gap-2.5
              py-3
              first:pt-1
            "
          >
            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[var(--color-primary)]/8
                text-[var(--color-primary)]
              "
            >
              <Leaf size={14} />
            </div>

            <span className="flex-1 text-[9px] font-medium">
              {item.name}
            </span>

            <span className="text-[10px] font-bold">
              {item.value}
            </span>

            <span
              className={`
                min-w-[54px]
                text-right
                text-[8px]
                font-semibold
                ${
                  item.status === "Moderate"
                    ? "text-[var(--color-warning)]"
                    : "text-[var(--color-primary)]"
                }
              `}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VegetationIndices;