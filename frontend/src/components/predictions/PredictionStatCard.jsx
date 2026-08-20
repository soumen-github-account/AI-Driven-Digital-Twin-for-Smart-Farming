import {
  CircleDollarSign,
  Droplets,
  Leaf,
  ShieldAlert,
  Wheat,
} from "lucide-react";

import ConfidenceRing from "./ConfidenceRing";

const icons = {
  yield: Wheat,
  revenue: CircleDollarSign,
  water: Droplets,
  disease: ShieldAlert,
  harvest: Leaf,
};

function PredictionStatCard({
  icon,
  title,
  value,
  unit,
  change,
  subtitle,
  confidence,
  negative,
}) {
  const Icon = icons[icon];

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[18px]
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.025)]
        transition-all duration-200
        hover:-translate-y-[1px]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      "
    >

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-2">
            <div
              className="
                flex h-8 w-8 shrink-0 items-center justify-center
                rounded-full
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
              "
            >
              <Icon size={16} />
            </div>

            <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">
              {title}
            </span>
          </div>

          <div className="mt-3 flex items-end gap-1">
            <span className="text-[24px] font-bold tracking-[-0.7px]">
              {value}
            </span>

            {unit && (
              <span className="mb-1 text-[9px] font-medium text-[var(--color-text-secondary)]">
                {unit}
              </span>
            )}
          </div>

          {change && (
            <p className="mt-1 text-[9px]">
              <span className="font-semibold text-[var(--color-primary)]">
                ↓ {change}
              </span>{" "}
              <span className="text-[var(--color-text-muted)]">
                {subtitle}
              </span>
            </p>
          )}

          {!change && (
            <p
              className={`mt-1 text-[10px] font-semibold ${
                negative
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-primary)]"
              }`}
            >
              {subtitle}
            </p>
          )}

        </div>

        <ConfidenceRing value={confidence} small />

      </div>

      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[8px]">
          <span className="uppercase tracking-wide text-[var(--color-text-muted)]">
            Confidence
          </span>

          <span className="font-bold text-[var(--color-primary)]">
            {confidence}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-[var(--color-primary)]"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

    </div>
  );
}

export default PredictionStatCard;