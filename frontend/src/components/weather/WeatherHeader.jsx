import {
  RefreshCw,
  Settings2,
} from "lucide-react";

function WeatherHeader() {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-[26px] font-bold tracking-[-0.7px]">
          Weather Intelligence
        </h1>

        <p className="mt-0.5 text-[13px] text-[var(--color-text-secondary)]">
          Real-time weather conditions and intelligent forecasts for better
          farm decisions.
        </p>
      </div>

      <div className="flex items-center gap-2">

        <button
          className="
            flex h-10 items-center gap-2
            rounded-xl border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-4
            text-[12px]
            font-semibold
            shadow-sm
            transition
            hover:bg-[var(--color-surface-secondary)]
          "
        >
          <RefreshCw size={15} />
          Refresh Data
        </button>

        <button
          className="
            flex h-10 items-center gap-2
            rounded-xl
            bg-[var(--color-primary)]
            px-4
            text-[12px]
            font-semibold
            text-white
            shadow-[0_5px_16px_rgba(22,163,74,0.18)]
            transition
            hover:bg-[var(--color-primary-hover)]
          "
        >
          <Settings2 size={15} />
          Weather Settings
        </button>

      </div>
    </div>
  );
}

export default WeatherHeader;