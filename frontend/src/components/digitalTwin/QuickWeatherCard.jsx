import { ArrowRight, CloudRain, Droplets, Sun, Wind } from "lucide-react";

function QuickWeatherCard() {
  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-[0_5px_20px_rgba(0,0,0,0.035)]">
      <p className="text-[9px] font-bold text-[var(--color-text-primary)]">Quick Weather</p>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)]">
          <Sun size={24} strokeWidth={1.6} />
        </div>
        <div>
          <p className="text-[20px] font-extrabold tracking-[-0.5px] text-[var(--color-text-primary)]">
            24°C
          </p>
          <p className="text-[8px] text-[var(--color-text-secondary)]">Sunny</p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <div className="flex items-center justify-between text-[8px]">
          <span className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <Droplets size={13} /> Humidity
          </span>
          <b className="text-[var(--color-text-primary)]">65%</b>
        </div>

        <div className="flex items-center justify-between text-[8px]">
          <span className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <Wind size={13} /> Wind
          </span>
          <b className="text-[var(--color-text-primary)]">12 km/h</b>
        </div>

        <div className="flex items-center justify-between text-[8px]">
          <span className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <CloudRain size={13} /> Rainfall
          </span>
          <b className="text-[var(--color-text-primary)]">0 mm</b>
        </div>
      </div>

      <button className="mt-4 flex items-center gap-1 text-[9px] font-bold text-[var(--color-primary)]">
        View Forecast <ArrowRight size={12} />
      </button>
    </article>
  );
}

export default QuickWeatherCard;
