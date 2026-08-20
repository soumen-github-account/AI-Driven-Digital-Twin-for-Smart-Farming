import {
  CloudLightning,
  Droplets,
  Leaf,
  ShieldAlert,
} from "lucide-react";

const risks = [
  {
    name: "Disease Risk",
    value: 72,
    level: "High",
    color: "bg-red-500",
    icon: ShieldAlert,
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    name: "Water Stress",
    value: 48,
    level: "Medium",
    color: "bg-orange-500",
    icon: Droplets,
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    name: "Weather Risk",
    value: 55,
    level: "Medium",
    color: "bg-orange-500",
    icon: CloudLightning,
    iconBg: "bg-orange-100 text-orange-600",
  },
  {
    name: "Crop Stress",
    value: 28,
    level: "Low",
    color: "bg-green-500",
    icon: Leaf,
    iconBg: "bg-green-100 text-green-600",
  },
];

export default function RiskOverview() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1d17]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-semibold">Risk Overview</h2>

        <span className="text-xs text-slate-400">
          Last Updated: 2 min ago
        </span>
      </div>

      <div className="space-y-5">
        {risks.map((risk) => {
          const Icon = risk.icon;

          return (
            <div key={risk.name}>
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${risk.iconBg}`}
                >
                  <Icon size={19} />
                </span>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {risk.name}
                    </span>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          risk.level === "High"
                            ? "bg-red-50 text-red-600"
                            : risk.level === "Medium"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {risk.level}
                      </span>

                      <span className="text-sm font-semibold">
                        {risk.value}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className={`h-full rounded-full ${risk.color}`}
                      style={{ width: `${risk.value}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-5 border-t border-slate-100 dark:border-white/10" />

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Overall Farm Risk</h3>

          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            High
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-red-500" />
          </div>

          <span className="text-sm font-bold">62%</span>
        </div>
      </div>
    </section>
  );
}