import {
  AlertCircle,
  CalendarDays,
  ChevronRight,
  Clock3,
  CloudRain,
  Droplets,
  Ellipsis,
  Info,
  Leaf,
  ShieldAlert,
} from "lucide-react";

const config = {
  critical: {
    icon: AlertCircle,
    color: "red",
    label: "CRITICAL",
  },
  warning: {
    icon: CloudRain,
    color: "orange",
    label: "WARNING",
  },
  info: {
    icon: Info,
    color: "blue",
    label: "INFORMATION",
  },
};

export default function AlertCard({ alert }) {
  const style = config[alert.type];
  const Icon = style.icon;

  const colors = {
    red: {
      border: "border-red-300",
      bg: "bg-red-50/60",
      icon: "bg-red-100 text-red-600",
      text: "text-red-600",
      button:
        "border-red-300 text-red-600 hover:bg-red-50",
    },
    orange: {
      border: "border-orange-200",
      bg: "bg-orange-50/50",
      icon: "bg-orange-100 text-orange-600",
      text: "text-orange-600",
      button:
        "border-orange-300 text-orange-600 hover:bg-orange-50",
    },
    blue: {
      border: "border-blue-200",
      bg: "bg-blue-50/40",
      icon: "bg-blue-100 text-blue-600",
      text: "text-blue-600",
      button:
        "border-blue-300 text-blue-600 hover:bg-blue-50",
    },
  };

  const c = colors[style.color];

  return (
    <article
      className={`
        relative rounded-2xl border ${c.border}
        bg-white p-4 shadow-sm transition
        hover:-translate-y-0.5 hover:shadow-md
        dark:border-white/10 dark:bg-[#0b1d17]
      `}
    >
      <button className="absolute right-4 top-4 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-white/5">
        <Ellipsis size={18} />
      </button>

      <div className="grid grid-cols-[72px_1fr_185px_185px] gap-5">
        {/* Icon */}
        <div className="flex flex-col items-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.icon}`}
          >
            <Icon size={27} />
          </div>

          <span
            className={`mt-2 text-[10px] font-bold ${c.text}`}
          >
            {style.label}
          </span>
        </div>

        {/* Main information */}
        <div className="min-w-0">
          <h3 className="pr-8 text-[16px] font-semibold">
            {alert.title}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {alert.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3 size={14} />
              {alert.time}
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {alert.field}
            </span>

            <span className="flex items-center gap-1.5">
              <Leaf size={14} />
              {alert.crop}
            </span>
          </div>
        </div>

        {/* Risk */}
        <div
          className={`rounded-xl border ${c.border} ${c.bg} p-4`}
        >
          <p className="text-xs font-medium">Risk Level</p>

          <p className={`mt-2 font-semibold ${c.text}`}>
            {alert.risk}
          </p>

          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((x) => (
              <span
                key={x}
                className={`h-2.5 w-2.5 rounded-full ${
                  x <= (alert.type === "critical" ? 4 : 3)
                    ? `bg-${style.color}-500`
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <p className="mt-5 text-[11px] font-semibold">
            Detected Condition
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
            {alert.condition}
          </p>
        </div>

        {/* Recommendation */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold">
              Recommended Action
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {alert.recommendation}
            </p>
          </div>

          <button
            className={`mt-4 flex w-fit items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition ${c.button}`}
          >
            View Details
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}