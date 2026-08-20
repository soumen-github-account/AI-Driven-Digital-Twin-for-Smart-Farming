import {
  Sunrise,
  Sunset,
  Sun,
} from "lucide-react";

function SunriseSunset() {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5
      "
    >
      <h2 className="text-[13px] font-bold">
        Sunrise & Sunset
      </h2>

      <div className="relative mt-8 h-[120px]">

        {/* Arc */}
        <div
          className="
            absolute
            left-1/2
            top-8
            h-[100px]
            w-[190px]
            -translate-x-1/2
            rounded-t-full
            border-t-2
            border-orange-300
          "
        />

        <Sun
          size={25}
          className="
            absolute
            left-1/2
            top-4
            -translate-x-1/2
            fill-orange-400
            text-orange-400
          "
        />

        <div className="absolute bottom-0 left-0">
          <Sunrise
            size={20}
            className="text-orange-400"
          />

          <p className="mt-1 text-[10px] font-bold">
            05:02 AM
          </p>

          <p className="text-[9px] text-[var(--color-text-muted)]">
            Sunrise
          </p>
        </div>

        <div className="absolute bottom-0 right-0 text-right">
          <Sunset
            size={20}
            className="ml-auto text-orange-400"
          />

          <p className="mt-1 text-[10px] font-bold">
            06:18 PM
          </p>

          <p className="text-[9px] text-[var(--color-text-muted)]">
            Sunset
          </p>
        </div>

      </div>

      <div className="mt-5 text-center">
        <span className="text-[10px] text-[var(--color-text-muted)]">
          Day Length:
        </span>

        <span className="ml-1 text-[11px] font-bold">
          13h 16m
        </span>
      </div>
    </div>
  );
}

export default SunriseSunset;