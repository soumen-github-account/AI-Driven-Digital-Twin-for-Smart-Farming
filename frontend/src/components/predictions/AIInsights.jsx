import {
  Droplets,
  Leaf,
  ShieldAlert,
  CircleDollarSign,
} from "lucide-react";

const insights = [
  {
    title: "Yield Outlook",
    text: "Favorable conditions indicate 8.3% higher yield than last season.",
    icon: Leaf,
    type: "success",
  },
  {
    title: "Irrigation Recommendation",
    text: "Rainfall forecast is high tomorrow. Irrigation can be reduced.",
    icon: Droplets,
    type: "info",
  },
  {
    title: "Disease Alert",
    text: "Monitor Field 2 closely. Disease risk is increasing.",
    icon: ShieldAlert,
    type: "warning",
  },
  {
    title: "Revenue Opportunity",
    text: "Optimize nitrogen application to improve yield and revenue.",
    icon: CircleDollarSign,
    type: "orange",
  },
];

function AIInsights() {
  return (
    <div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold">
            AI Insights & Recommendations
          </h3>

          <p className="mt-1 text-[8px] text-[var(--color-text-muted)]">
            Intelligent recommendations generated from farm data
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">

        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex items-center gap-3
                rounded-xl
                border border-[var(--color-border)]
                bg-[var(--color-surface-secondary)]
                p-3
                transition
                hover:-translate-y-[1px]
              "
            >

              <div
                className="
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                "
              >
                <Icon size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold">
                  {item.title}
                </p>

                <p className="mt-1 text-[8px] leading-4 text-[var(--color-text-secondary)]">
                  {item.text}
                </p>
              </div>

              <button className="shrink-0 text-[8px] font-semibold text-[var(--color-primary)]">
                View Details →
              </button>

            </div>
          );
        })}

      </div>

      <button className="mt-4 text-[9px] font-semibold text-[var(--color-primary)]">
        View All Recommendations →
      </button>

    </div>
  );
}

export default AIInsights;