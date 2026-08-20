import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function WeatherChart({
  title,
  subtitle,
  data,
  lines = [],
  bars = [],
  type,
}) {
  return (
    <div
      className="
        min-w-0
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="mb-3 flex items-center justify-between">

        <div>
          <h2 className="text-[13px] font-bold">
            {title}
          </h2>

          <span className="text-[9px] text-[var(--color-text-muted)]">
            {subtitle}
          </span>
        </div>

        <select
          className="
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-2
            py-1.5
            text-[9px]
            outline-none
          "
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="h-[210px] w-full">

        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.35}
              />

              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 9,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 9,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 11,
                }}
              />

              {bars.map((bar) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  name={bar.label}
                  radius={[5, 5, 0, 0]}
                  fill="#1976D2"
                />
              ))}
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />

              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 9,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 9,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 11,
                }}
              />

              {lines.map((line, index) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.label}
                  stroke={
                    index === 0
                      ? "#16A34A"
                      : "#EF4444"
                  }
                  strokeWidth={2}
                  dot={{
                    r: 2.5,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default WeatherChart;