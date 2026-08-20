const fields = [
  {
    name: "Field 1",
    risk: "Low",
    color: "bg-green-500/80",
  },
  {
    name: "Field 2",
    risk: "Medium",
    color: "bg-yellow-400/80",
  },
  {
    name: "Field 3",
    risk: "High",
    color: "bg-red-500/85",
  },
  {
    name: "Field 4",
    risk: "Low",
    color: "bg-green-500/80",
  },
  {
    name: "Field 5",
    risk: "Medium",
    color: "bg-yellow-400/80",
  },
  {
    name: "Field 6",
    risk: "Low",
    color: "bg-green-500/80",
  },
];

export default function RiskHeatmap() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1d17]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Farm Risk Heatmap</h2>

        <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none dark:border-white/10 dark:bg-white/5">
          <option>Disease Risk</option>
          <option>Water Stress</option>
          <option>Weather Risk</option>
          <option>Crop Stress</option>
        </select>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-950 via-green-800 to-green-950 p-3">
        <div className="grid h-[235px] grid-cols-3 grid-rows-2 gap-1">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`${field.color} flex flex-col items-center justify-center rounded-lg border border-white/30 text-white backdrop-blur-sm`}
            >
              <span className="text-sm font-bold">
                {field.name}
              </span>

              <span className="mt-1 rounded-full bg-black/20 px-2 py-0.5 text-[10px]">
                {field.risk}
              </span>
            </div>
          ))}
        </div>

        {/* field boundary */}
        <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-white/40" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Low Risk
        </span>

        <div className="h-2 w-44 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" />

        <span className="text-xs text-slate-500">
          High Risk
        </span>
      </div>
    </section>
  );
}