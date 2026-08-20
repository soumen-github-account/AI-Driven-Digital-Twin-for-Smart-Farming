import {
  AlertCircle,
  CheckCircle2,
  Info,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

const icons = {
  all: ShieldAlert,
  critical: AlertCircle,
  warning: TriangleAlert,
  info: Info,
  resolved: CheckCircle2,
};

export default function AlertSummary({
  items,
  active,
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const Icon = icons[item.type];
        const selected = active === item.type;

        return (
          <button
            key={item.type}
            onClick={() => onChange(item.type)}
            className={`
              group flex min-w-[120px] items-center gap-3 rounded-xl
              border px-4 py-3 text-left transition-all
              ${
                selected
                  ? "border-green-600 bg-green-50 shadow-sm dark:border-green-500/60 dark:bg-green-950/30"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
              }
            `}
          >
            <span
              className={`
                flex h-9 w-9 items-center justify-center rounded-xl
                ${
                  item.type === "critical"
                    ? "bg-red-100 text-red-600"
                    : item.type === "warning"
                    ? "bg-orange-100 text-orange-600"
                    : item.type === "info"
                    ? "bg-blue-100 text-blue-600"
                    : item.type === "resolved"
                    ? "bg-green-100 text-green-600"
                    : "bg-green-100 text-green-600"
                }
              `}
            >
              <Icon size={18} />
            </span>

            <div>
              <p className="text-sm font-medium">
                {item.label}
              </p>

              <p className="text-xs text-slate-400">
                {item.count}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}