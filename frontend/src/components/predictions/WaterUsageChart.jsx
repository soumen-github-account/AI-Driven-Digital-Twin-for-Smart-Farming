import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Apr 13", actual: 6.2, planned: 8 },
  { date: "Apr 20", actual: 6.8, planned: 8.5 },
  { date: "Apr 27", actual: 7.1, planned: 9 },
  { date: "May 4", actual: 8, planned: 9.5 },
  { date: "May 11", actual: 9.2, planned: 10 },
  { date: "May 18", actual: 10.5, planned: 11 },
];

function WaterUsageChart() {
  return (
    <div className="h-[310px]">

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold">
            Water Usage
          </h3>

          <div className="mt-2 flex gap-4 text-[8px]">
            <span className="text-blue-600">
              ● Actual Usage
            </span>

            <span className="text-[var(--color-text-muted)]">
              ┄ Planned Usage
            </span>
          </div>
        </div>

        <button className="chart-select">
          kL/ha
        </button>
      </div>

      <ResponsiveContainer width="100%" height="225px">
        <LineChart data={data}>
          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 8 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 8 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Line
            dataKey="planned"
            stroke="#60a5fa"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />

          <Line
            dataKey="actual"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default WaterUsageChart;