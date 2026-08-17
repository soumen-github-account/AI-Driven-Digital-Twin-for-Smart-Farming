import {
  Droplets,
  MapPin,
} from "lucide-react";

const fields = [
  {
    name: "Field 1",
    status: "Optimal",
    moisture: "28%",
    position: "left-[15%] top-[25%]",
    type: "optimal",
  },
  {
    name: "Field 2",
    status: "Low Moisture",
    moisture: "32%",
    position: "left-[42%] top-[20%]",
    type: "low",
  },
  {
    name: "Field 3",
    status: "Irrigating",
    moisture: "45%",
    position: "right-[13%] top-[24%]",
    type: "irrigating",
  },
  {
    name: "Field 4",
    status: "Optimal",
    moisture: "30%",
    position: "left-[20%] bottom-[17%]",
    type: "optimal",
  },
  {
    name: "Field 5",
    status: "Very Low",
    moisture: "18%",
    position: "right-[25%] bottom-[15%]",
    type: "critical",
  },
];

function IrrigationStatusMap() {
  const statusClass = {
    optimal: "bg-green-600/90",
    low: "bg-yellow-500/90",
    irrigating: "bg-blue-600/90",
    critical: "bg-red-600/90",
  };

  return (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div>
          <h2 className="text-[14px] font-semibold text-[var(--color-text-primary)]">
            Irrigation Status
          </h2>

          <div className="mt-2 flex flex-wrap gap-4 text-[9px] text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Irrigating
            </span>

            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Optimal
            </span>

            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Low Moisture
            </span>

            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Very Low
            </span>
          </div>
        </div>

        <button className="rounded-lg bg-[var(--color-surface-secondary)] p-2">
          <MapPin size={15} />
        </button>
      </div>

      <div className="relative h-[360px] overflow-hidden">

        {/* Replace this with your actual farm map image */}
        <img
          src="/images/farm-irrigation-map.jpg"
          alt="Irrigation map"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Field labels */}
        {fields.map((field) => (
          <div
            key={field.name}
            className={`absolute ${field.position} ${statusClass[field.type]} rounded-xl px-3 py-2 text-white shadow-lg backdrop-blur-sm`}
          >
            <div className="text-[11px] font-bold">
              {field.name}
            </div>

            <div className="mt-0.5 text-[9px] opacity-90">
              {field.status}
            </div>

            <div className="text-[9px] font-semibold">
              {field.moisture}
            </div>
          </div>
        ))}

        {/* Map control */}
        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-white/40 bg-white/90 shadow-lg backdrop-blur">
          <button className="flex h-9 w-9 items-center justify-center text-lg">
            +
          </button>

          <div className="h-px bg-gray-200" />

          <button className="flex h-9 w-9 items-center justify-center text-lg">
            −
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 rounded-xl border border-white/20 bg-black/70 px-3 py-2 text-white backdrop-blur-xl">
          <div className="mb-2 text-[10px] font-semibold">
            Soil Moisture
          </div>

          <div className="space-y-1 text-[8px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Optimal
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Low Moisture
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Very Low
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default IrrigationStatusMap;