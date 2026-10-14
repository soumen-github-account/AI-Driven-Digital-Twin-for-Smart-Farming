import { ChevronDown } from "lucide-react";

export default function FilterButton({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-[43px]
          min-w-[145px]
          appearance-none
          rounded-[10px]
          border
          border-[var(--color-border)]
          bg-[var(--color-bg)]
          px-[12px]
          pr-[30px]
          text-[10px]
          font-semibold
          text-[var(--color-text-primary)]
          outline-none
          focus:border-[var(--color-primary)]
        "
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={13}
        className="
          pointer-events-none
          absolute
          right-[10px]
          top-1/2
          -translate-y-1/2
          text-[var(--color-text-muted)]
        "
      />
    </div>
  );
}