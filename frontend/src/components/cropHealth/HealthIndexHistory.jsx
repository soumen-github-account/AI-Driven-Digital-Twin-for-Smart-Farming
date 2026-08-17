import {
  ChevronDown,
} from "lucide-react";

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
  {
    day: "15 Feb",
    field: 76,
    farm: 52,
    regional: 42,
  },
  {
    day: "20 Feb",
    field: 81,
    farm: 55,
    regional: 46,
  },
  {
    day: "25 Feb",
    field: 84,
    farm: 58,
    regional: 44,
  },
  {
    day: "1 Mar",
    field: 80,
    farm: 56,
    regional: 48,
  },
  {
    day: "10 Mar",
    field: 87,
    farm: 61,
    regional: 49,
  },
  {
    day: "20 Mar",
    field: 88,
    farm: 59,
    regional: 47,
  },
  {
    day: "1 Apr",
    field: 92,
    farm: 64,
    regional: 52,
  },
  {
    day: "15 Apr",
    field: 86,
    farm: 60,
    regional: 50,
  },
  {
    day: "1 May",
    field: 89,
    farm: 62,
    regional: 48,
  },
  {
    day: "13 May",
    field: 92,
    farm: 70,
    regional: 54,
  },
];

function HealthIndexHistory() {
  return (
    <div
      className="
        min-h-[320px]
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
          Health Index History
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
            px-2.5
            text-[9px]
            font-semibold
          "
        >
          Last 3 Months
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        <Legend
          label="Field 1"
          className="bg-[var(--color-primary)]"
        />

        <Legend
          label="Green Valley Farm Avg"
          className="bg-[#497b68]"
        />

        <Legend
          label="Regional Avg"
          className="bg-[#aeb7c2]"
        />
      </div>

      <div className="mt-3 h-[235px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 8,
              left: -22,
              bottom: 0,
            }}
          >
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
              interval={1}
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

            <Line
              type="monotone"
              dataKey="field"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ r: 2 }}
            />

            <Line
              type="monotone"
              dataKey="farm"
              stroke="#497b68"
              strokeWidth={1.7}
              dot={{ r: 1.8 }}
            />

            <Line
              type="monotone"
              dataKey="regional"
              stroke="#aeb7c2"
              strokeWidth={1.5}
              dot={{ r: 1.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-[8px] text-[var(--color-text-muted)]">
        * Health index is a composite score based on NDVI,
        LAI, Chlorophyll, and other parameters.
      </p>
    </div>
  );
}

function Legend({ label, className }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${className}`}
      />

      <span className="text-[8px] font-medium">
        {label}
      </span>
    </div>
  );
}

export default HealthIndexHistory;