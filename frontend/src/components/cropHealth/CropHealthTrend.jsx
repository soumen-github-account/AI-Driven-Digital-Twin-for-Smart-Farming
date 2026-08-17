import {
  ChevronDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "14 Apr", value: 61 },
  { day: "16 Apr", value: 68 },
  { day: "18 Apr", value: 79 },
  { day: "20 Apr", value: 78 },
  { day: "22 Apr", value: 80 },
  { day: "24 Apr", value: 69 },
  { day: "26 Apr", value: 76 },
  { day: "28 Apr", value: 82 },
  { day: "30 Apr", value: 80 },
  { day: "2 May", value: 75 },
  { day: "4 May", value: 84 },
  { day: "6 May", value: 80 },
  { day: "8 May", value: 81 },
  { day: "10 May", value: 82 },
  { day: "12 May", value: 86 },
  { day: "13 May", value: 92 },
];

function CropHealthTrend() {
  return (
    <div
      className="
        h-full
        min-h-[365px]
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-bold">
          Crop Health Trend
        </h2>

        <button
          className="
            flex
            h-8
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-secondary)]
            px-2.5
            text-[9px]
            font-semibold
          "
        >
          Last 30 Days
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-[var(--color-primary)]
          "
        />

        <span className="text-[10px] font-medium">
          Health Score (%)
        </span>
      </div>

      <div className="mt-3 h-[275px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 8,
              left: -22,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="healthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.18}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--color-border)"
              strokeDasharray="2 5"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "var(--color-text-muted)",
                fontSize: 8,
              }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fill: "var(--color-text-muted)",
                fontSize: 8,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border:
                  "1px solid var(--color-border)",
                background:
                  "var(--color-surface-elevated)",
                fontSize: 10,
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#healthGradient)"
              dot={{
                r: 2,
                fill: "var(--color-primary)",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 4,
                fill: "var(--color-primary)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex justify-end">
        <div
          className="
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-2.5
            py-1.5
            shadow-sm
          "
        >
          <p className="text-[12px] font-bold">
            92%
          </p>

          <p className="text-[8px] text-[var(--color-text-muted)]">
            13 May
          </p>
        </div>
      </div>
    </div>
  );
}

export default CropHealthTrend;