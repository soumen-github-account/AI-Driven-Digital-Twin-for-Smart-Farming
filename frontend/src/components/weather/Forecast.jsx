import { Droplets } from "lucide-react";

function Forecast({ data }) {
  return (
    <div
      className="
        min-w-0
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <h2 className="mb-3 px-1 text-[13px] font-bold">
        7-Day Forecast
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.day}
              className="
                rounded-[14px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface-secondary)]
                px-2
                py-3
                text-center
                transition
                hover:-translate-y-0.5
              "
            >
              <p className="text-[11px] font-bold">
                {item.day}
              </p>

              <p className="mt-0.5 text-[9px] text-[var(--color-text-muted)]">
                {item.date}
              </p>

              <Icon
                size={30}
                strokeWidth={1.5}
                className="mx-auto my-3 text-amber-400"
              />

              <div className="text-[13px] font-bold">
                {item.temp}° /{" "}
                <span className="font-medium text-[var(--color-text-muted)]">
                  {item.low}°
                </span>
              </div>

              <div className="mt-2 flex items-center justify-center gap-1 text-[9px] text-blue-500">
                <Droplets size={11} />
                {item.rain}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;