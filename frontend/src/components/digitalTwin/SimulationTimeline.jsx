import { ChevronDown, Play, Radio, RotateCcw } from "lucide-react";

function SimulationTimeline() {
  const marks = [
    { label: "08:00", position: "4%" },
    { label: "10:00", position: "28%" },
    { label: "12:00", position: "52%" },
    { label: "14:00", position: "76%" },
  ];

  return (
    <article className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_5px_20px_rgba(0,0,0,0.035)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[11px] font-bold text-[var(--color-text-primary)]">
            Simulation Timeline
          </h2>
          <p className="mt-1 text-[8px] text-[var(--color-text-secondary)]">
            Live data timeline for Digital Twin
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm hover:bg-[var(--color-primary)]/8">
            <Play size={14} fill="currentColor" />
          </button>

          <button className="flex h-9 items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 text-[9px] font-bold text-[var(--color-text-primary)]">
            1x <ChevronDown size={12} />
          </button>

          <button className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] sm:flex">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="relative mt-7 px-3 pb-4">
        <div className="absolute left-4 right-4 top-[19px] h-0.5 bg-[var(--color-border)]" />
        <div className="absolute left-4 top-[19px] h-0.5 w-[76%] bg-[var(--color-primary)]" />

        {marks.map((mark) => (
          <div
            key={mark.label}
            className="absolute top-0 -translate-x-1/2"
            style={{ left: mark.position }}
          >
            <span className="block text-center text-[9px] font-semibold text-[var(--color-text-secondary)]">
              {mark.label}
            </span>
            <span className="mx-auto mt-2 block h-3.5 w-3.5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-surface)]" />
          </div>
        ))}

        <div className="absolute right-[3%] top-0 -translate-x-1/2">
          <span className="block text-center text-[9px] font-bold text-[var(--color-text-primary)]">
            Current
          </span>
          <span className="mx-auto mt-2 block h-4 w-4 rounded-full border-4 border-[var(--color-primary)]/20 bg-[var(--color-primary)] shadow-[0_0_0_3px_var(--color-primary)]/10" />
        </div>

        <div className="mt-12 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Radio size={13} className="text-[var(--color-primary)]" />
            <span className="text-[9px] font-bold text-[var(--color-primary)]">Live</span>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-2.5 text-right">
            <p className="text-[7px] text-[var(--color-text-muted)]">Current Time</p>
            <p className="mt-0.5 text-[15px] font-extrabold text-[var(--color-text-primary)]">
              10:24 AM
            </p>
            <p className="text-[7px] text-[var(--color-text-secondary)]">13 May 2025</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SimulationTimeline;
