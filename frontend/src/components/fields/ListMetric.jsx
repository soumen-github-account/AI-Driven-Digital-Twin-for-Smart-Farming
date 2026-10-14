export default function ListMetric({
  label,
  value,
}) {
  return (
    <div className="min-w-[70px]">
      <p className="text-[8px] text-[var(--color-text-muted)]">
        {label}
      </p>

      <p className="mt-[3px] text-[10px] font-bold">
        {value}
      </p>
    </div>
  );
}