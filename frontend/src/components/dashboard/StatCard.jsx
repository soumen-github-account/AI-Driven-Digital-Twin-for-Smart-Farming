import {
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";

function StatCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  type = "success",
  trend,
  trendText,
  trendUp,
  neutral,
}) {
  const iconStyles = {
    success: `
      bg-[var(--color-primary)]/10
      text-[var(--color-primary)]
    `,
    water: `
      bg-[var(--color-water)]/10
      text-[var(--color-water)]
    `,
    warning: `
      bg-[var(--color-warning)]/10
      text-[var(--color-warning)]
    `,
  };

  return (
    <div
      className="
        group
        min-h-[137px]
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3.5
        shadow-[0_4px_16px_rgba(15,23,42,0.035)]
        transition-all
        duration-200

        hover:-translate-y-[1px]
        hover:border-[var(--color-border-hover)]
        hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
      "
    >
      <div className="flex items-start gap-3">

        {/* Icon */}

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full

            ${iconStyles[type]}
          `}
        >
          <Icon
            size={19}
            strokeWidth={1.9}
          />
        </div>

        {/* Content */}

        <div className="min-w-0 pt-0.5">
          <p
            className="
              text-[10px]
              font-semibold
              text-[var(--color-text-secondary)]
            "
          >
            {title}
          </p>

          <div className="mt-1 flex items-baseline gap-1">

            <span
              className="
                text-[23px]
                font-bold
                leading-none
                tracking-[-0.8px]
                text-[var(--color-text-primary)]
              "
            >
              {value}
            </span>

            {unit && (
              <span
                className="
                  text-[10px]
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
              mt-1
              text-[9px]
              font-semibold

              ${
                type === "warning"
                  ? "text-[var(--color-warning)]"
                  : type === "water"
                    ? "text-[var(--color-water)]"
                    : "text-[var(--color-primary)]"
              }
            `}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom trend */}

      <div className="mt-5 flex items-center gap-1.5">

        {neutral ? (
          <Minus
            size={12}
            className="text-[var(--color-text-muted)]"
          />
        ) : trendUp ? (
          <ArrowUp
            size={12}
            strokeWidth={2.2}
            className="text-[var(--color-primary)]"
          />
        ) : (
          <ArrowDown
            size={12}
            strokeWidth={2.2}
            className="text-[var(--color-primary)]"
          />
        )}

        <span
          className={`
            text-[9px]
            font-bold

            ${
              neutral
                ? "text-[var(--color-text-muted)]"
                : "text-[var(--color-primary)]"
            }
          `}
        >
          {trend}
        </span>

        {trendText && (
          <span
            className="
              text-[9px]
              font-medium
              text-[var(--color-text-muted)]
            "
          >
            {trendText}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;