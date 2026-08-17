import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const rainfall = [
  { day: "Wed\nMay 07", rain: 0 },
  { day: "Thu\nMay 08", rain: 0 },
  { day: "Fri\nMay 09", rain: 2 },
  { day: "Sat\nMay 10", rain: 8 },
  { day: "Sun\nMay 11", rain: 15 },
  { day: "Mon\nMay 12", rain: 25 },
  { day: "Tue\nMay 13", rain: 18 },
];

function RainfallForecast() {
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
          <h2 className="text-[14px] font-semibold">
            Rainfall Forecast
          </h2>

          <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
            Rainfall (mm)
          </p>
        </div>

        <button className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[10px]">
          This Week⌄
        </button>
      </div>

      <div className="mt-5 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rainfall}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(120,120,120,0.12)"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9 }}
            />

            <YAxis
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

            <Bar
              dataKey="rain"
              fill="#3b82f6"
              radius={[5, 5, 0, 0]}
              maxBarSize={38}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        Significant rainfall expected on Mon & Tue.
      </div>
    </div>
  );
}

export default RainfallForecast;