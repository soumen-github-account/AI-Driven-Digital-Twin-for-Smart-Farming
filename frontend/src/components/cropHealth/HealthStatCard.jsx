import {
  ArrowUp,
  ArrowDown,
} from "lucide-react";

function MiniSparkline({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((value, index) => {
      const x =
        (index / (data.length - 1)) * 100;

      const y =
        34 -
        ((value - min) / (max - min || 1)) * 28;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 38"
      className="h-10 w-[92px]"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {data.map((value, index) => {
        const x =
          (index / (data.length - 1)) * 100;

        const y =
          34 -
          ((value - min) / (max - min || 1)) * 28;

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="1.6"
            fill="var(--color-primary)"
          />
        );
      })}
    </svg>
  );
}

function HealthStatCard({
  title,
  value,
  unit,
  status,
  change,
  description,
  icon: Icon,
  data,
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
        transition-all
        duration-300
        hover:-translate-y-[1px]
        hover:border-[var(--color-border-hover)]
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]
      "
    >
      <div className="flex items-center gap-2.5">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>

        <span className="text-[11px] font-semibold">
          {title}
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-1">
          <span
            className="
              text-[27px]
              font-bold
              tracking-[-1px]
            "
          >
            {value}
          </span>

          {unit && (
            <span className="text-[10px] font-semibold">
              {unit}
            </span>
          )}
        </div>

        <p
          className="
            mt-0.5
            text-[10px]
            font-semibold
            text-[var(--color-primary)]
          "
        >
          {status}
        </p>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div className="flex items-center gap-1.5">
          <ArrowUp
            size={12}
            strokeWidth={2}
            className="text-[var(--color-primary)]"
          />

          <span className="text-[9px] font-bold text-[var(--color-primary)]">
            {change}
          </span>

          <span className="text-[8px] text-[var(--color-text-muted)]">
            {description}
          </span>
        </div>

        <MiniSparkline data={data} />
      </div>
    </div>
  );
}

export default HealthStatCard;