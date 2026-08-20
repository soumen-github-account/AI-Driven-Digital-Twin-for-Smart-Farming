import {
  Activity,
  Database,
  Map,
  Timer,
} from "lucide-react";

const stats = [
  {
    label: "Total Fields",
    value: "6",
    icon: Map,
  },
  {
    label: "Monitored Area",
    value: "245.6 ha",
    icon: Database,
  },
  {
    label: "Active Sensors",
    value: "28 / 30",
    icon: Activity,
  },
  {
    label: "Last Updated",
    value: "2 min ago",
    icon: Timer,
  },
];

export default function QuickStats() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#10251f] p-4 text-white shadow-xl">
      <h3 className="mb-4 text-sm font-semibold">
        Quick Stats
      </h3>

      <div className="space-y-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Icon size={15} />
              </div>

              <div className="flex-1">
                <p className="text-[11px] text-white/50">
                  {stat.label}
                </p>

                <p className="text-sm font-semibold">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}