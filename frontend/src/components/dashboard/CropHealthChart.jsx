import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ArrowUp, ChevronDown } from "lucide-react";

const data = [
  { day: "7 May", value: 82 },
  { day: "8 May", value: 89 },
  { day: "9 May", value: 84 },
  { day: "10 May", value: 91 },
  { day: "11 May", value: 87 },
  { day: "12 May", value: 94 },
  { day: "13 May", value: 92 },
];

function CropHealthChart() {
  return (
    <ChartWrapper
      title="Crop Health Trend"
      value="92%"
      label="Average Crop Health"
      trend="8%"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 8,
            right: 4,
            left: -22,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="cropGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#22c55e"
                stopOpacity={0.2}
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

          <Area
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            strokeWidth={2}
            fill="url(#cropGradient)"
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
    </ChartWrapper>
  );
}

function ChartWrapper({
  title,
  value,
  label,
  trend,
  children,
}) {
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
          {title}
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
            text-[var(--color-primary)]
          "
        >
          {value}
        </span>

        <span
          className="
            text-[8px]
            font-medium
            text-[var(--color-text-secondary)]
          "
        >
          {label}
        </span>

        <span className="ml-auto flex items-center gap-0.5 text-[8px] font-bold text-[var(--color-primary)]">
          <ArrowUp size={10} />
          {trend}
        </span>
      </div>

      <div className="mt-2 h-[175px]">
        {children}
      </div>
    </div>
  );
}

export default CropHealthChart;