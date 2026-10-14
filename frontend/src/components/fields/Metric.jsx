export default function Metric({
  label,
  value,
  border,
}) {
  return (
    <div
      className={`
        ${border ? "border-l border-[var(--color-border)] pl-[10px]" : ""}
      `}
    >
      <p
        className="
          text-[8px]
          text-[var(--color-text-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]
          truncate
          text-[10px]
          font-bold
        "
      >
        {value}
      </p>
    </div>
  );
}