import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
  { date: "Apr 13", risk: 18 },
  { date: "Apr 20", risk: 17 },
  { date: "Apr 27", risk: 16 },
  { date: "May 4", risk: 14 },
  { date: "May 11", risk: 12 },
  { date: "May 18", risk: 12 },
];

function DiseaseRiskChart() {
  return (
    <div>

      <div className="mb-3">
        <h3 className="text-[13px] font-bold">
          Disease Risk Trend
        </h3>

        <span className="mt-2 inline-flex text-[8px] text-purple-600">
          ● Risk (%)
        </span>
      </div>

      <ResponsiveContainer width="100%" height={190}>
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
            domain={[0, 50]}
            tick={{ fontSize: 8 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Area
            dataKey="risk"
            fill="#7c3aed"
            fillOpacity={0.08}
            stroke="none"
          />

          <Line
            dataKey="risk"
            stroke="#6d28d9"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-2 rounded-xl bg-[var(--color-primary)]/6 p-3">
        <p className="text-[9px] font-semibold text-[var(--color-primary)]">
          Low disease risk
        </p>

        <p className="mt-1 text-[8px] text-[var(--color-text-secondary)]">
          Risk has decreased by 33% compared with last month.
        </p>
      </div>

    </div>
  );
}

export default DiseaseRiskChart;