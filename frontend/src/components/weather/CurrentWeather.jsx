import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
} from "lucide-react";

function CurrentWeather() {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between">

        <h2 className="text-[13px] font-bold">
          Current Weather
        </h2>

        <span className="text-[10px] text-[var(--color-text-muted)]">
          10:30 AM • May 13
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">

        <div>
          <div className="text-[36px] font-bold tracking-[-1.5px]">
            29°C
          </div>

          <p className="mt-1 text-[14px] font-medium">
            Partly Cloudy
          </p>
        </div>

        <CloudSun
          size={72}
          strokeWidth={1.4}
          className="text-amber-400"
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">

        <WeatherStat
          icon={Droplets}
          label="Humidity"
          value="65%"
        />

        <WeatherStat
          icon={Wind}
          label="Wind"
          value="12 km/h"
        />

        <WeatherStat
          icon={CloudRain}
          label="Rainfall"
          value="2.4 mm"
        />

      </div>
    </div>
  );
}

function WeatherStat({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <Icon
        size={16}
        className="text-[var(--color-primary)]"
      />

      <span className="text-[10px] text-[var(--color-text-muted)]">
        {label}
      </span>

      <span className="text-[12px] font-bold">
        {value}
      </span>
    </div>
  );
}

export default CurrentWeather;