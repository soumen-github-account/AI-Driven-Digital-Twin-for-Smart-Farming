import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2020", historical: 120 },
  { year: "2021", historical: 132 },
  { year: "2022", historical: 148 },
  { year: "2023", historical: 162 },
  { year: "2024", historical: 178 },
  { year: "2025", predicted: 215 },
];

function RevenueProjectionChart() {
  return (
    <div className="h-[310px]">

      <div className="mb-4">
        <h3 className="text-[13px] font-bold">
          Revenue Projection
        </h3>

        <span className="mt-2 text-[8px] text-[var(--color-primary)]">
          ₹ (Lakh)
        </span>
      </div>

      <ResponsiveContainer width="100%" height="230px">
        <LineChart data={data}>
          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="year"
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

          <Area
            dataKey="predicted"
            fill="var(--color-primary)"
            fillOpacity={0.08}
            stroke="none"
          />

          <Line
            dataKey="historical"
            stroke="var(--color-text-secondary)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          <Line
            dataKey="predicted"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueProjectionChart;