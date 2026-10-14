import useFarmStore from '../../../store/farmStore';
import { Layers, Droplets, ThermometerSun, Wheat, TrendingUp, Info } from 'lucide-react';

export default function HeatmapControls() {
  const { activeHeatmap, setActiveHeatmap } = useFarmStore();

  const options = [
    {
      id: 'none',
      label: 'Standard 3D Scene',
      icon: Layers,
      desc: 'View natural crop models, soil, and field boundaries',
      color: 'bg-zinc-600',
    },
    {
      id: 'moisture',
      label: 'Soil Moisture (VWC)',
      icon: Droplets,
      desc: 'Root zone volumetric water content across field microtopography',
      range: '15% - 75%',
      unit: '%',
      gradient: 'from-orange-600 via-amber-400 via-cyan-400 to-blue-700',
      minLabel: '15% (Deficit)',
      midLabel: '45% (Optimal)',
      maxLabel: '75% (Saturated)',
    },
    {
      id: 'temperature',
      label: 'Canopy Microclimate Temp',
      icon: ThermometerSun,
      desc: 'Surface soil and plant thermal equilibrium mapping',
      range: '14°C - 34°C',
      unit: '°C',
      gradient: 'from-cyan-400 via-emerald-400 via-amber-400 to-red-500',
      minLabel: '14°C (Cool)',
      midLabel: '24°C (Mild)',
      maxLabel: '34°C (Heat Stress)',
    },
    {
      id: 'health',
      label: 'Crop Health (NDVI Index)',
      icon: Wheat,
      desc: 'Simulated Normalized Difference Vegetation Index from stress model',
      range: '0.30 - 0.95',
      unit: 'NDVI',
      gradient: 'from-amber-700 via-yellow-400 to-emerald-500',
      minLabel: '0.30 (Stressed/Sparse)',
      midLabel: '0.65 (Moderate)',
      maxLabel: '0.95 (Vigorous)',
    },
    {
      id: 'yield',
      label: 'Illustrative Yield Potential',
      icon: TrendingUp,
      desc: 'Projected zone productivity based on accumulated biomass & stress',
      range: '6.0 - 15.0 t/ha',
      unit: 't/ha',
      gradient: 'from-amber-600 via-yellow-400 to-emerald-500',
      minLabel: '6.0 t/ha (Low)',
      midLabel: '10.5 t/ha (Target)',
      maxLabel: '15.0 t/ha (Peak)',
    },
  ];

  const currentOption = options.find((o) => o.id === activeHeatmap);

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Spatial Analytics Heatmaps
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            Grid 8m Cells
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Render dynamic spatial gradients directly on the 3D field mesh
        </p>
      </div>

      {/* Layer Select Buttons */}
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = activeHeatmap === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setActiveHeatmap(opt.id)}
              className={`flex items-start gap-3 p-3 text-left rounded-lg border transition-all ${
                isSelected
                  ? 'bg-zinc-900 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/20'
                  : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div
                className={`mt-0.5 w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-emerald-950/80 text-emerald-400' : 'bg-zinc-900 text-zinc-400'
                }`}
              >
                <opt.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-semibold text-xs ${
                      isSelected ? 'text-emerald-400' : 'text-zinc-200'
                    }`}
                  >
                    {opt.label}
                  </h3>
                  {opt.range && (
                    <span className="text-[10px] font-mono text-zinc-500 ml-1">
                      {opt.range}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Metric-Specific Legend */}
      {currentOption && currentOption.gradient && (
        <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/80 shadow-lg">
          <div className="flex justify-between items-center mb-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              {currentOption.label} Scale
            </h4>
            <span className="text-xs font-mono font-medium text-emerald-400">
              Unit: {currentOption.unit}
            </span>
          </div>

          {/* Continuous Color Ramp Bar */}
          <div
            className={`h-3 w-full rounded-full bg-gradient-to-r ${currentOption.gradient} shadow-inner mb-2`}
          />

          <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
            <span>{currentOption.minLabel}</span>
            <span>{currentOption.midLabel}</span>
            <span>{currentOption.maxLabel}</span>
          </div>

          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Spatial Sampling:</span>
            <span className="text-zinc-200 font-mono">8.0 meter Cartesian resolution</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
            <span>Interpolation Engine:</span>
            <span className="text-zinc-200 font-mono">Deterministic Microrelief Hash</span>
          </div>
        </div>
      )}

      {/* Educational info box */}
      <div className="text-[10px] text-zinc-500 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/40 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          <strong>Hover on 3D field:</strong> When an analytics layer is active, hover directly over any cell in the 3D scene to inspect localized micro-readings in real time.
        </span>
      </div>
    </div>
  );
}
