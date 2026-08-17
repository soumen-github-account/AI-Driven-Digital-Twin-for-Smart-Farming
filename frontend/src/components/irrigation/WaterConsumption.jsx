import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Field 1", value: 28 },
  { name: "Field 2", value: 26 },
  { name: "Field 3", value: 19 },
  { name: "Field 4", value: 15 },
  { name: "Field 5", value: 12 },
];

const COLORS = [
  "#15803d",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
];

function WaterConsumption() {
  return (
    <div
      className="
        rounded-2xl border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-semibold">
          Water Consumption
        </h2>

        <button className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[10px]">
          This Week⌄
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6">

        <div className="relative h-[190px] w-[190px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold">
              18.6 m³
            </span>

            <span className="text-[9px] text-[var(--color-text-muted)]">
              Total Used
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-2"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: COLORS[index],
                }}
              />

              <span className="w-12 text-[10px]">
                {item.name}
              </span>

              <span className="text-[10px] font-semibold">
                {((18.6 * item.value) / 100).toFixed(1)} m³
              </span>

              <span className="text-[9px] text-[var(--color-text-muted)]">
                ({item.value}%)
              </span>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-3 text-[10px] font-medium text-[var(--color-primary)]">
        ↓ 8% less water used compared to last week
      </div>
    </div>
  );
}

export default WaterConsumption;