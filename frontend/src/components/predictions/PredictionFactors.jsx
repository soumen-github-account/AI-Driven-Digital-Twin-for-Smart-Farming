import {
  CloudSun,
  Droplets,
  Leaf,
  BarChart3,
  Sprout,
  Satellite,
} from "lucide-react";

const factors = [
  {
    name: "Weather",
    icon: CloudSun,
    impact: "High Impact",
    status: "Favorable",
    value: 86,
  },
  {
    name: "Soil",
    icon: Sprout,
    impact: "High Impact",
    status: "Optimal",
    value: 82,
  },
  {
    name: "Crop Health",
    icon: Leaf,
    impact: "High Impact",
    status: "Good",
    value: 79,
  },
  {
    name: "Historical Yield",
    icon: BarChart3,
    impact: "Medium Impact",
    status: "Positive",
    value: 68,
  },
  {
    name: "Irrigation",
    icon: Droplets,
    impact: "Medium Impact",
    status: "Adequate",
    value: 61,
  },
  {
    name: "Satellite Data",
    icon: Satellite,
    impact: "High Impact",
    status: "Updated",
    value: 88,
  },
];

function PredictionFactors() {
  return (
    <div>
      <h3 className="text-[13px] font-bold">
        Prediction Factors
      </h3>

      <div className="mt-4 space-y-3">
        {factors.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.name}>

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-lg
                    bg-[var(--color-primary)]/8
                    text-[var(--color-primary)]
                  "
                >
                  <Icon size={14} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <span className="text-[9px] font-semibold">
                      {item.name}
                    </span>

                    <span className="rounded-full bg-[var(--color-primary)]/8 px-2 py-0.5 text-[7px] font-semibold text-[var(--color-primary)]">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[7px] text-[var(--color-text-muted)]">
                    {item.impact}
                  </p>
                </div>

              </div>

              <div className="ml-9 mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: `${item.value}%` }}
                />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PredictionFactors;