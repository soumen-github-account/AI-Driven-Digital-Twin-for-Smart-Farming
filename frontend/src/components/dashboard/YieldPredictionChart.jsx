import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ArrowUp,
  ChevronDown,
} from "lucide-react";

const data = [
  { month: "Apr", value: 2.4 },
  { month: "May", value: 3.1 },
  { month: "Jun", value: 4.1 },
  { month: "Jul", value: 4.5 },
  { month: "Aug", value: 4.8 },
  { month: "Sep", value: 5.0 },
  { month: "Oct", value: 5.42 },
];

function YieldPredictionChart() {
  return (
    <div
      className="
        min-h-[255px]
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3.5
        shadow-[0_4px_16px_rgba(15,23,42,0.035)]
      "
    >
      <div className="flex items-center justify-between">

        <h3
          className="
            text-[11px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          Yield Prediction (Wheat)
        </h3>

        <button
          className="
            flex
            h-7
            items-center
            gap-1
            rounded-lg
            border
            border-[var(--color-border)]
            px-2
            text-[8px]
            font-semibold
            text-[var(--color-text-secondary)]
          "
        >
          2025 Season
          <ChevronDown size={10} />
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">

        <span
          className="
            text-[20px]
            font-bold
            tracking-[-0.5px]
            text-[var(--color-primary)]
          "
        >
          5.42
        </span>

        <span
          className="
            text-[8px]
            font-semibold
            text-[var(--color-text-secondary)]
          "
        >
          t/ha
        </span>

        <span
          className="
            ml-auto
            flex
            items-center
            gap-0.5
            text-[8px]
            font-bold
            text-[var(--color-primary)]
          "
        >
          <ArrowUp size={10} />
          0.42
        </span>
      </div>

      <div className="mt-2 h-[175px]">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 2,
              left: -22,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="yieldGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.18}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--color-border)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 7,
                fill: "var(--color-text-muted)",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
              tick={{
                fontSize: 7,
                fill: "var(--color-text-muted)",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                fontSize: 10,
              }}
              formatter={(value) => [
                `${value} t/ha`,
                "Predicted Yield",
              ]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={2}
              fill="url(#yieldGradient)"
              dot={{
                r: 2.5,
                fill: "#16a34a",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 4,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default YieldPredictionChart;