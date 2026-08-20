import {
  CloudSun,
  Droplets,
  Gauge,
  Radio,
  Sprout,
} from "lucide-react";

const data = [
  ["Soil Moisture (Field 2)", "32%", Droplets],
  ["Weather Forecast", "24h", CloudSun],
  ["Crop Stage", "Tillering", Sprout],
  ["Digital Twin Simulation", "OK", Gauge],
  ["Historical Irrigation", "7 days", Radio],
  ["Field Sensor Data", "Live", Radio],
];

function DataUsed() {
  return (
    <div
      className="
        rounded-[14px]
        border
        border-violet-500/15
        bg-violet-500/[0.025]
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
            bg-violet-500/10
            text-violet-600
          "
        >
          <Gauge size={17} />
        </div>

        <span className="text-[11px] font-bold text-violet-700">
          Data Used
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {data.map(([label, value, Icon]) => (
          <div
            key={label}
            className="flex items-center gap-2"
          >
            <Icon
              size={13}
              className="shrink-0 text-violet-600"
            />

            <span className="min-w-0 flex-1 truncate text-[9px] text-[var(--color-text-secondary)]">
              {label}
            </span>

            <span className="text-[9px] font-semibold text-[var(--color-text-primary)]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataUsed;