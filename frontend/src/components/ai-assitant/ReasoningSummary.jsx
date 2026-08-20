import {
  ChevronDown,
  Lightbulb,
} from "lucide-react";

function ReasoningSummary() {
  const points = [
    "Soil moisture is 32% (low)",
    "Crop is in Tillering stage (high water demand)",
    "No rainfall expected in next 24h",
    "High temperature is increasing evapotranspiration",
    "Irrigation will optimize yield potential",
  ];

  return (
    <div
      className="
        rounded-[14px]
        border
        border-blue-500/15
        bg-blue-500/[0.025]
        p-3
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
            rounded-lg
            bg-blue-500/10
            text-blue-600
          "
        >
          <Lightbulb size={17} />
        </div>

        <span className="text-[11px] font-bold text-blue-700">
          Reasoning Summary
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {points.map((point) => (
          <li
            key={point}
            className="flex gap-2 text-[10px] leading-4 text-[var(--color-text-secondary)]"
          >
            <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-blue-500" />
            {point}
          </li>
        ))}
      </ul>

      <button
        className="
          mt-3
          flex
          items-center
          gap-1
          text-[10px]
          font-semibold
          text-blue-700
        "
      >
        Explain Why
        <ChevronDown size={13} />
      </button>
    </div>
  );
}

export default ReasoningSummary;