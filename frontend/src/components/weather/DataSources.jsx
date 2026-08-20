import {
  Cloud,
  Satellite,
  Radio,
  Database,
} from "lucide-react";

const sources = [
  {
    name: "Weather API (OpenWeather)",
    status: "Live",
    icon: Cloud,
  },
  {
    name: "IMD Forecast",
    status: "Live",
    icon: Radio,
  },
  {
    name: "On-Farm Weather Station",
    status: "Online",
    icon: Database,
  },
  {
    name: "Satellite Data",
    status: "Live",
    icon: Satellite,
  },
];

function DataSources() {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
      "
    >
      <h2 className="text-[13px] font-bold">
        Data Sources
      </h2>

      <div className="mt-4 space-y-3">

        {sources.map((source) => {
          const Icon = source.icon;

          return (
            <div
              key={source.name}
              className="flex items-center gap-2"
            >
              <div
                className="
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-[var(--color-surface-secondary)]
                "
              >
                <Icon
                  size={14}
                  className="text-[var(--color-text-secondary)]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-medium">
                  {source.name}
                </p>
              </div>

              <span className="text-[8px] font-bold text-[var(--color-primary)]">
                {source.status}
              </span>
            </div>
          );
        })}

      </div>

      <button
        className="
          mt-4
          text-[9px]
          font-bold
          text-[var(--color-primary)]
        "
      >
        View All Sources →
      </button>
    </div>
  );
}

export default DataSources;