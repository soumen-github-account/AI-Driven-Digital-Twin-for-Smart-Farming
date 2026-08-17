import {
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Droplets,
  Gauge,
  RadioTower,
  Satellite,
  Sprout,
  Sun,
  Wind,
} from "lucide-react";

function SensorRing() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full"
        style={{
          background:
            "conic-gradient(var(--color-primary) 0 83%, var(--color-warning) 83% 96%, var(--color-danger) 96% 100%)",
        }}
      >
        <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-[var(--color-surface)]">
          <span className="text-[18px] font-extrabold text-[var(--color-text-primary)]">24</span>
          <span className="text-[7px] font-medium text-[var(--color-text-muted)]">Total Sensors</span>
        </div>
      </div>

      <div className="space-y-2 text-[9px]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
          <span className="text-[var(--color-text-secondary)]">20 Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-warning)]" />
          <span className="text-[var(--color-text-secondary)]">3 Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-danger)]" />
          <span className="text-[var(--color-text-secondary)]">1 Offline</span>
        </div>
      </div>
    </div>
  );
}

const sources = [
  ["IoT Sensors", "24 Active", RadioTower],
  ["Weather API", "Live", CloudCog],
  ["Satellite Imagery", "Today, 10:00 AM", Satellite],
  ["Soil Sensors", "18 Active", Sprout],
  ["Drone Survey", "Today, 08:45 AM", Wind],
];

function TwinStatePanel() {
  return (
    <aside className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-bold text-[var(--color-text-primary)]">
          Digital Twin State
        </h2>
        <ChevronDown size={14} className="text-[var(--color-text-secondary)]" />
      </div>

      <div className="my-3 border-t border-[var(--color-border)]" />

      <div>
        <p className="text-[10px] font-bold text-[var(--color-text-primary)]">Current State</p>

        <div className="mt-2 flex items-start gap-2">
          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
          <div>
            <p className="text-[10px] font-bold text-[var(--color-text-primary)]">
              Healthy and stable
            </p>
            <p className="mt-1 text-[8px] leading-relaxed text-[var(--color-text-secondary)]">
              Overall farm conditions are optimal.
            </p>
          </div>
        </div>

        <div className="my-4 flex justify-center">
          <div className="relative h-[112px] w-[180px] overflow-hidden rounded-[45%] bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent">
            <div className="absolute bottom-2 left-1/2 h-10 w-[150px] -translate-x-1/2 rounded-[50%] bg-[var(--color-soil)]/55" />
            <div className="absolute bottom-8 left-[28%] h-14 w-7 rotate-[-18deg] rounded-full bg-[var(--color-primary)]/75" />
            <div className="absolute bottom-9 left-[45%] h-16 w-8 rotate-[10deg] rounded-full bg-[var(--color-primary)]/90" />
            <div className="absolute bottom-7 left-[61%] h-13 w-7 rotate-[18deg] rounded-full bg-[var(--color-primary)]/70" />
            <div className="absolute bottom-2 left-[22%] h-4 w-[110px] rounded-full bg-[var(--color-soil)]" />
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] pt-3">
        <div className="flex items-start gap-2">
          <Gauge size={15} className="mt-0.5 text-[var(--color-text-secondary)]" />
          <div>
            <p className="text-[9px] font-bold text-[var(--color-text-primary)]">Last Updated</p>
            <p className="mt-1 text-[8px] text-[var(--color-text-secondary)]">Today, 10:24 AM</p>
            <p className="mt-1 text-[8px] text-[var(--color-text-secondary)]">
              Live synchronization active
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 border-t border-[var(--color-border)]" />

      <div>
        <p className="text-[10px] font-bold text-[var(--color-text-primary)]">Data Sources</p>

        <div className="mt-2 space-y-2.5">
          {sources.map(([name, status, Icon]) => (
            <div key={name} className="flex items-center gap-2">
              <Icon size={14} className="shrink-0 text-[var(--color-text-secondary)]" />
              <span className="min-w-0 flex-1 truncate text-[8px] font-medium text-[var(--color-text-primary)]">
                {name}
              </span>
              <span className="shrink-0 text-[7px] text-[var(--color-text-muted)]">{status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-3 border-t border-[var(--color-border)]" />

      <div>
        <p className="mb-3 text-[10px] font-bold text-[var(--color-text-primary)]">
          Sensor Status
        </p>
        <SensorRing />
        <button className="mt-3 flex w-full items-center justify-center gap-1 text-[9px] font-bold text-[var(--color-primary)]">
          View Sensor Map <span>→</span>
        </button>
      </div>
    </aside>
  );
}

export default TwinStatePanel;
