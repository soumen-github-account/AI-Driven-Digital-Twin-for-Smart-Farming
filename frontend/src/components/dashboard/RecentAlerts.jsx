import {
  AlertTriangle,
  ChevronRight,
  CloudRain,
  Droplets,
  Leaf,
} from "lucide-react";

const alerts = [
  {
    title: "Irrigation Required",
    description: "Field 7 - North Block",
    time: "10 min ago",
    level: "High",
    icon: Droplets,
    type: "water",
  },
  {
    title: "Disease Risk Detected",
    description: "Field 3 - Tomato Crop",
    time: "35 min ago",
    level: "High",
    icon: AlertTriangle,
    type: "danger",
  },
  {
    title: "Heavy Rainfall Expected",
    description: "Tomorrow, 14 May",
    time: "1 hr ago",
    level: "Medium",
    icon: CloudRain,
    type: "warning",
  },
  {
    title: "Soil Moisture Changed",
    description: "Field 8 - West Block",
    time: "2 hr ago",
    level: "Low",
    icon: Leaf,
    type: "success",
  },
];

function RecentAlerts() {
  const iconStyles = {
    water:
      "bg-[var(--color-water)]/10 text-[var(--color-water)]",
    danger:
      "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
    warning:
      "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    success:
      "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  };

  return (
    <div
      className="
        flex
        min-h-[343px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_4px_16px_rgba(15,23,42,0.035)]
      "
    >
      {/* Header */}

      <div
        className="
          flex
          h-[43px]
          items-center
          justify-between
          border-b
          border-[var(--color-border)]
          px-4
        "
      >
        <h2
          className="
            text-[12px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          Recent Alerts
        </h2>

        <button
          className="
            text-[9px]
            font-bold
            text-[var(--color-primary)]
            hover:underline
          "
        >
          View All
        </button>
      </div>

      {/* Alerts */}

      <div className="flex-1">

        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.title}
              className="
                flex
                items-center
                gap-2.5
                border-b
                border-[var(--color-border)]
                px-3.5
                py-3
              "
            >
              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  ${iconStyles[alert.type]}
                `}
              >
                <Icon
                  size={15}
                  strokeWidth={1.9}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate
                    text-[10px]
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  {alert.title}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[8px]
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  {alert.description}
                </p>
              </div>

              <div className="hidden shrink-0 items-center gap-3 sm:flex">

                <span
                  className={`
                    rounded-full
                    px-2
                    py-1
                    text-[7px]
                    font-bold

                    ${
                      alert.level === "High"
                        ? "bg-[var(--color-info)]/10 text-[var(--color-info)]"
                        : alert.level === "Medium"
                          ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                          : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    }
                  `}
                >
                  {alert.level}
                </span>

                <span
                  className="
                    min-w-[45px]
                    text-right
                    text-[8px]
                    font-medium
                    text-[var(--color-text-muted)]
                  "
                >
                  {alert.time}
                </span>

              </div>
            </div>
          );
        })}

      </div>

      {/* Footer */}

      <button
        className="
          flex
          h-10
          items-center
          justify-center
          gap-1
          text-[9px]
          font-bold
          text-[var(--color-primary)]
          transition
          hover:bg-[var(--color-surface-secondary)]
        "
      >
        View All Alerts

        <ChevronRight
          size={13}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}

export default RecentAlerts;