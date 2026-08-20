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
  { date: "Apr 13", ndvi: 0.56 },
  { date: "Apr 20", ndvi: 0.62 },
  { date: "Apr 27", ndvi: 0.68 },
  { date: "May 4", ndvi: 0.71 },
  { date: "May 11", ndvi: 0.74 },
  { date: "May 18", ndvi: 0.76 },
];

function CropHealthChart() {
  return (
    <div className="h-[310px]">

      <div className="mb-4">
        <h3 className="text-[13px] font-bold">
          Crop Health Trend (NDVI)
        </h3>

        <span className="mt-2 inline-flex text-[8px] text-[var(--color-primary)]">
          ● NDVI
        </span>
      </div>

      <ResponsiveContainer width="100%" height="235px">
        <LineChart data={data}>
          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 8 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 1]}
            tick={{ fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="ndvi"
            stroke="none"
            fill="var(--color-primary)"
            fillOpacity={0.1}
          />

          <Line
            type="monotone"
            dataKey="ndvi"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default CropHealthChart;