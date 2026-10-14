export default function MiniStat({
  icon: Icon,
  title,
  value,
  subtitle,
  positive,
  warning,
}) {
  return (
    <div
      className="
        rounded-[15px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]/70
        p-[13px]
        backdrop-blur-xl
      "
    >
      <div className="flex items-center gap-[8px]">
        <div
          className={`
            flex
            h-[31px]
            w-[31px]
            items-center
            justify-center
            rounded-[9px]
            ${
              warning
                ? "bg-amber-500/10 text-amber-500"
                : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
            }
          `}
        >
          <Icon size={15} />
        </div>

        <span
          className="
            text-[9px]
            font-semibold
            text-[var(--color-text-secondary)]
          "
        >
          {title}
        </span>
      </div>

      <div className="mt-[10px] flex items-end gap-[8px]">
        <span
          className="
            text-[21px]
            font-extrabold
            tracking-[-.7px]
          "
        >
          {value}
        </span>

        {positive && (
          <span className="mb-[3px] text-[8px] font-bold text-[var(--color-primary)]">
            ↗
          </span>
        )}
      </div>

      <p
        className="
          mt-[2px]
          text-[8px]
          text-[var(--color-text-muted)]
        "
      >
        {subtitle}
      </p>
    </div>
  );
}