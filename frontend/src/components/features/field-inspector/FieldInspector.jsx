import useFarmStore from '../../../store/farmStore';
import {
  Layers,
  Map,
  Calendar,
  Wheat,
  Sprout,
  ShieldAlert,
  Droplets,
  Ruler,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default function FieldInspector() {
  const {
    farmName,
    selectedFieldId,
    cropType,
    setCropType,
    variety,
    plantingDate,
    growthStage,
    soilType,
    irrigationMethod,
    fieldArea,
    fieldPerimeter,
    layers,
    toggleLayer,
    zones,
    selectedZoneId,
    setSelectedZoneId,
  } = useFarmStore();

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const renderLayerToggle = (id, label, icon) => (
    <div className="flex items-center justify-between py-2 border-b border-zinc-800/60 last:border-0">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-zinc-300 font-medium">{label}</span>
      </div>
      <button
        onClick={() => toggleLayer(id)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
          layers[id] ? 'bg-emerald-500' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            layers[id] ? 'translate-x-4.5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* Header & Field Summary */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />
            Field Spatial Geometry
          </h2>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
            Polygon Active
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          {farmName} · Field {selectedFieldId}
        </p>
      </div>

      {/* Geometry Calculated Metrics (Shoelace & Euclidean) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800/80">
          <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
            <Map className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Area (Calculated)</span>
          </div>
          <div className="text-zinc-100 font-semibold text-base">
            {fieldArea.hectares} <span className="text-xs font-normal text-zinc-400">ha</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-0.5">
            {fieldArea.squareMeters.toLocaleString()} m² ({fieldArea.acres} ac)
          </p>
        </div>

        <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800/80">
          <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
            <Ruler className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Perimeter</span>
          </div>
          <div className="text-zinc-100 font-semibold text-base">
            {fieldPerimeter} <span className="text-xs font-normal text-zinc-400">m</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-0.5">6 Vertices Polygon</p>
        </div>
      </div>

      {/* Crop Metadata & Interactive Crop Switching */}
      <div className="bg-zinc-950 rounded-xl border border-zinc-800/80 p-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-zinc-300 font-medium text-xs">
            <Wheat className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Crop Type</span>
          </div>
          {/* Switch Crop Model */}
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="bg-zinc-900 text-xs font-medium text-emerald-400 border border-zinc-700 rounded-md px-2 py-1 outline-none focus:border-emerald-500"
          >
            <option value="Corn">Corn (Maize)</option>
            <option value="Wheat">Winter Wheat</option>
            <option value="Soybean">Soybean</option>
          </select>
        </div>

        <div className="space-y-1.5 text-xs text-zinc-400">
          <div className="flex justify-between">
            <span className="text-zinc-500">Cultivar:</span>
            <span className="text-zinc-200 font-medium">{variety}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Stage:</span>
            <span className="text-emerald-400 font-medium">{growthStage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Planting Date:</span>
            <span className="text-zinc-200">{plantingDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Soil Series:</span>
            <span className="text-zinc-200">{soilType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Irrigation:</span>
            <span className="text-sky-400">{irrigationMethod}</span>
          </div>
        </div>
      </div>

      {/* Spatial Management Zones */}
      {zones.length > 0 && (
        <div className="bg-zinc-950 rounded-xl border border-zinc-800/80 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Management Zones ({zones.length})
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2.5">
            {zones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZoneId(z.id)}
                className={`py-1 rounded text-[11px] font-mono transition-colors ${
                  selectedZone?.id === z.id
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {z.id.replace('Z-', '')}
              </button>
            ))}
          </div>
          {selectedZone && (
            <div className="bg-zinc-900/70 rounded p-2 text-[11px] text-zinc-400 flex justify-between items-center">
              <span>{selectedZone.name}</span>
              <span className="font-mono text-zinc-300">
                Center: [{Math.round(selectedZone.center[0])}m, {Math.round(selectedZone.center[1])}m]
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3D Scene Layer Visibility Manager */}
      <div className="bg-zinc-950 rounded-xl border border-zinc-800/80 overflow-hidden">
        <div className="px-3.5 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Visualization Layer Controls
          </h3>
          <span className="text-[10px] text-zinc-500">Live 3D Toggles</span>
        </div>
        <div className="p-3.5 flex flex-col">
          {renderLayerToggle('plants', 'Procedural Crop Plants', <Wheat className="w-3.5 h-3.5 text-emerald-400" />)}
          {renderLayerToggle('rows', 'Crop Furrow Beds', <Sprout className="w-3.5 h-3.5 text-amber-500" />)}
          {renderLayerToggle('irrigation', 'Drip Irrigation Network', <Droplets className="w-3.5 h-3.5 text-sky-400" />)}
          {renderLayerToggle('boundary', 'Field Boundary Cadastre', <Map className="w-3.5 h-3.5 text-emerald-300" />)}
          {renderLayerToggle('soil', 'Agricultural Soil Surface', <Layers className="w-3.5 h-3.5 text-amber-700" />)}
          {renderLayerToggle('sensors', 'Telemetry Sensor Stations', <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />)}
          {renderLayerToggle('grid', 'Cartesian Metric Grid', <Ruler className="w-3.5 h-3.5 text-zinc-400" />)}
        </div>
      </div>

      <div className="text-[10px] text-zinc-500 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/40 flex items-start gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80 shrink-0 mt-0.5" />
        <span>
          <strong>Simulated Twin Showcase:</strong> Spatial calculations and plant growth parameters are illustrative model projections.
        </span>
      </div>
    </div>
  );
}
