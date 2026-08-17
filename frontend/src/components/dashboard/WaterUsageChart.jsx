import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ArrowDown, ChevronDown } from "lucide-react";

const data = [
  { day: "7 May", value: 68 },
  { day: "8 May", value: 71 },
  { day: "9 May", value: 65 },
  { day: "10 May", value: 81 },
  { day: "11 May", value: 69 },
  { day: "12 May", value: 73 },
  { day: "13 May", value: 67 },
];

function WaterUsageChart() {
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
          Water Usage
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
          Last 7 Days
          <ChevronDown size={10} />
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">

        <span
          className="
            text-[20px]
            font-bold
            tracking-[-0.5px]
            text-[var(--color-water)]
          "
        >
          62%
        </span>

        <span
          className="
            text-[8px]
            font-medium
            text-[var(--color-text-secondary)]
          "
        >
          Efficient Usage
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
          <ArrowDown size={10} />
          5%
        </span>
      </div>

      <div className="mt-2 h-[175px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 8,
              right: 2,
              left: -22,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="var(--color-border)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fontSize: 7,
                fill: "var(--color-text-muted)",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
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
            />

            <Bar
              dataKey="value"
              fill="#60a5fa"
              radius={[4, 4, 0, 0]}
              maxBarSize={17}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default WaterUsageChart;