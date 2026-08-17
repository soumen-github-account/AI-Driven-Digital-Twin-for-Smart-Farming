import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "May 07", field1: 82, field2: 64, field3: 58, field4: 52, field5: 28 },
  { day: "May 08", field1: 80, field2: 61, field3: 56, field4: 49, field5: 26 },
  { day: "May 09", field1: 74, field2: 55, field3: 50, field4: 40, field5: 20 },
  { day: "May 10", field1: 79, field2: 58, field3: 52, field4: 43, field5: 23 },
  { day: "May 11", field1: 68, field2: 48, field3: 43, field4: 31, field5: 12 },
  { day: "May 12", field1: 65, field2: 42, field3: 37, field4: 25, field5: 7 },
  { day: "May 13", field1: 58, field2: 32, field3: 45, field4: 30, field5: 18 },
];

function SoilMoistureTrend() {
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
        <div>
          <h2 className="text-[14px] font-semibold text-[var(--color-text-primary)]">
            Soil Moisture Trend
          </h2>

          <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
            Moisture (%)
          </p>
        </div>

        <button className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[10px] font-medium">
          Last 7 Days⌄
        </button>
      </div>

      <div className="mt-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(120,120,120,0.12)"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9 }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,.08)",
                fontSize: 10,
              }}
            />

            <Line
              type="monotone"
              dataKey="field1"
              stroke="#22a447"
              strokeWidth={2}
              dot={false}
              name="Field 1"
            />

            <Line
              type="monotone"
              dataKey="field2"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              name="Field 2"
            />

            <Line
              type="monotone"
              dataKey="field3"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Field 3"
            />

            <Line
              type="monotone"
              dataKey="field4"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
              name="Field 4"
            />

            <Line
              type="monotone"
              dataKey="field5"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="Field 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SoilMoistureTrend;