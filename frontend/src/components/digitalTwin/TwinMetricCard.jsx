import MiniSparkline from "./MiniSparkline";

const toneMap = {
  green: {
    icon: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
    line: "var(--color-primary)",
    status: "text-[var(--color-primary)]",
  },
  blue: {
    icon: "bg-[var(--color-water)]/10 text-[var(--color-water)]",
    line: "var(--color-water)",
    status: "text-[var(--color-water)]",
  },
  orange: {
    icon: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    line: "var(--color-warning)",
    status: "text-[var(--color-warning)]",
  },
};

function TwinMetricCard({
  title,
  value,
  status,
  tone = "green",
  icon: Icon,
  points,
}) {
  const colors = toneMap[tone] ?? toneMap.green;

  return (
    <article className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-[0_5px_20px_rgba(0,0,0,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold text-[var(--color-text-secondary)]">
            {title}
          </p>

          <p className="mt-1 text-[22px] font-extrabold leading-none tracking-[-0.7px] text-[var(--color-text-primary)]">
            {value}
          </p>

          <p className={`mt-1.5 text-[9px] font-bold ${colors.status}`}>
            {status}
          </p>
        </div>

        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}>
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-2.5">
        <MiniSparkline points={points} stroke={colors.line} />
      </div>
    </article>
  );
}

export default TwinMetricCard;
