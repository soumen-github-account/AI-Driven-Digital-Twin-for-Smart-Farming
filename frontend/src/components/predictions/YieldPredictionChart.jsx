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
  { year: "2020", historical: 2.7 },
  { year: "2021", historical: 3.0 },
  { year: "2022", historical: 3.3 },
  { year: "2023", historical: 3.6 },
  { year: "2024", historical: 3.8 },
  { year: "2025", historical: 3.9, predicted: 4.2 },
];

function YieldPredictionChart() {
  return (
    <div className="h-[310px]">

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold">
            Yield Prediction vs Historical Yield
          </h3>

          <div className="mt-2 flex gap-4 text-[8px] text-[var(--color-text-secondary)]">
            <span>● Predicted Yield</span>
            <span>● Historical Yield</span>
            <span>■ Confidence Range</span>
          </div>
        </div>

        <button className="chart-select">
          tons/ha
        </button>
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
            tick={{ fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 10]}
            tick={{ fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="predicted"
            stroke="none"
            fill="var(--color-primary)"
            fillOpacity={0.08}
          />

          <Line
            type="monotone"
            dataKey="historical"
            stroke="var(--color-text-secondary)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          <Line
            type="monotone"
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

export default YieldPredictionChart;