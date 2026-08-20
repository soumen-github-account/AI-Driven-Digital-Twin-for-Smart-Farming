import {
  AlertTriangle,
  CloudRain,
  ThermometerSun,
  Wind,
} from "lucide-react";

const alerts = [
  {
    title: "Heavy Rain Expected",
    description: "Heavy rainfall expected in 2 days",
    date: "May 15, 2025",
    probability: "90%",
    icon: CloudRain,
    type: "danger",
  },
  {
    title: "High Temperature Alert",
    description: "Maximum temperature may reach 33°C",
    date: "May 17 – May 18",
    probability: "",
    icon: ThermometerSun,
    type: "warning",
  },
  {
    title: "Strong Wind Possibility",
    description: "Wind speed may reach 30–35 km/h",
    date: "May 16, 2025",
    probability: "",
    icon: Wind,
    type: "info",
  },
];

function WeatherAlerts() {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
      "
    >
      <div className="flex items-center gap-2">
        <AlertTriangle
          size={16}
          className="text-red-500"
        />

        <h2 className="text-[13px] font-bold">
          Weather Alerts
        </h2>
      </div>

      <div className="mt-3 space-y-2">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.title}
              className="
                rounded-xl
                border
                border-[var(--color-border)]
                p-3
              "
            >
              <div className="flex gap-2">

                <Icon
                  size={18}
                  className={
                    alert.type === "danger"
                      ? "text-red-500"
                      : alert.type === "warning"
                      ? "text-orange-500"
                      : "text-blue-500"
                  }
                />

                <div className="min-w-0">
                  <p className="text-[10px] font-bold">
                    {alert.title}
                  </p>

                  <p className="mt-1 text-[9px] text-[var(--color-text-secondary)]">
                    {alert.description}
                  </p>

                  <div className="mt-2 flex justify-between text-[8px] text-[var(--color-text-muted)]">
                    <span>{alert.date}</span>

                    {alert.probability && (
                      <span>{alert.probability} probability</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherAlerts;