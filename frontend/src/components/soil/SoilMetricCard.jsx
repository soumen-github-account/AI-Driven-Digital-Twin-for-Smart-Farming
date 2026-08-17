import {
  Droplets,
  FlaskConical,
  Leaf,
  Mountain,
  Sprout,
} from "lucide-react";

function SoilMetricCard({
  icon,
  title,
  value,
  unit,
  status,
  statusType,
  progress,
  min,
  max,
}) {
  const icons = {
    ph: Droplets,
    carbon: Leaf,
    nitrogen: Sprout,
    phosphorus: FlaskConical,
    potassium: Mountain,
  };

  const Icon = icons[icon] || Leaf;

  const statusColor = {
    good: "text-[var(--color-primary)]",
    warning: "text-[var(--color-warning)]",
    danger: "text-[var(--color-danger)]",
  };

  const barColor = {
    good: "bg-[var(--color-primary)]",
    warning: "bg-[var(--color-warning)]",
    danger: "bg-[var(--color-danger)]",
  };

  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3.5
        shadow-[0_4px_18px_rgba(0,0,0,0.025)]
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:border-[var(--color-border-hover)]
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]
      "
    >

      <div className="flex items-center gap-2.5">

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <Icon size={16} strokeWidth={1.8} />
        </div>

        <p
          className="
            truncate
            text-[10px]
            font-semibold
            text-[var(--color-text-primary)]
          "
        >
          {title}
        </p>

      </div>

      <div className="mt-3 flex items-end gap-1">

        <span
          className="
            text-[23px]
            font-extrabold
            leading-none
            tracking-[-0.8px]
          "
        >
          {value}
        </span>

        {unit && (
          <span
            className="
              mb-0.5
              text-[9px]
              font-semibold
              text-[var(--color-text-secondary)]
            "
          >
            {unit}
          </span>
        )}

      </div>

      <p
        className={`
          mt-2
          text-[9px]
          font-bold
          ${statusColor[statusType]}
        `}
      >
        {status}
      </p>

      {/* Progress */}

      <div className="mt-4">

        <div
          className="
            h-[4px]
            overflow-hidden
            rounded-full
            bg-[var(--color-border)]
          "
        >
          <div
            className={`
              h-full
              rounded-full
              ${barColor[statusType]}
            `}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className="
            mt-1
            flex
            justify-between
            text-[7px]
            font-medium
            text-[var(--color-text-muted)]
          "
        >
          <span>{min}</span>
          <span>{max}</span>
        </div>

      </div>

    </div>
  );
}

export default SoilMetricCard;