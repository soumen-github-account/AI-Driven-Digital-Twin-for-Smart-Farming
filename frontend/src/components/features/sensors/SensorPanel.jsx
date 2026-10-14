import { useState } from 'react';
import useFarmStore from '../../../store/farmStore';
import {
  Activity,
  Droplets,
  Thermometer,
  Wifi,
  Sun,
  FlaskConical,
  Zap,
  Sliders,
  Filter,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function SensorPanel() {
  const {
    sensors,
    selectedSensorId,
    setSelectedSensorId,
    updateSensorThreshold,
  } = useFarmStore();

  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const selectedSensor = sensors.find((s) => s.id === selectedSensorId) || sensors[0];

  const getIcon = (type) => {
    switch (type) {
      case 'soil-moisture':
        return <Droplets className="w-4 h-4 text-sky-400" />;
      case 'soil-temperature':
        return <Thermometer className="w-4 h-4 text-orange-400" />;
      case 'air-temp':
        return <Thermometer className="w-4 h-4 text-amber-400" />;
      case 'air-humidity':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'soil-ph':
        return <FlaskConical className="w-4 h-4 text-purple-400" />;
      case 'light-intensity':
        return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'electrical-conductivity':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-zinc-400" />;
    }
  };

  const filteredSensors = sensors.filter((s) => {
    if (typeFilter !== 'all' && s.type !== typeFilter) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            Sensor Telemetry Network
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            {sensors.length} Stations Active
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Simulated IoT node telemetry synchronized to 3D spatial field
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
        <Filter className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-zinc-900 text-xs text-zinc-300 rounded px-2 py-1 border border-zinc-800 flex-1 outline-none"
        >
          <option value="all">All Sensor Types</option>
          <option value="soil-moisture">Soil Moisture</option>
          <option value="soil-temperature">Soil Temperature</option>
          <option value="air-temp">Air Temperature</option>
          <option value="air-humidity">Humidity</option>
          <option value="soil-ph">Soil pH</option>
          <option value="light-intensity">Solar PAR</option>
          <option value="electrical-conductivity">Conductivity (EC)</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-900 text-xs text-zinc-300 rounded px-2 py-1 border border-zinc-800 outline-none"
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="warning">Warning</option>
        </select>
      </div>

      {/* Selected Sensor Deep-Dive Inspector */}
      {selectedSensor && (
        <div className="bg-zinc-950 rounded-xl p-4 border border-teal-500/40 shadow-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                {getIcon(selectedSensor.type)}
                <span className="font-semibold text-zinc-100 text-sm">{selectedSensor.id}</span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase ${
                    selectedSensor.status === 'warning'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                      : 'bg-teal-950/80 text-teal-300 border border-teal-800/60'
                  }`}
                >
                  {selectedSensor.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{selectedSensor.name}</p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-bold font-mono text-zinc-100">
                {selectedSensor.value.toFixed(1)}
              </span>
              <span className="text-xs text-zinc-400 ml-1">{selectedSensor.unit}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/80">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">Location (Local 3D)</span>
              <span className="font-mono text-zinc-300">
                X: {selectedSensor.position[0]}m, Z: {selectedSensor.position[2]}m
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">Mount / Depth</span>
              <span className="text-zinc-300">{selectedSensor.depth || selectedSensor.height || 'Canopy'}</span>
            </div>
          </div>

          {/* Historical Trend Chart */}
          {selectedSensor.history && selectedSensor.history.length > 0 && (
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
                <span>24h Historical Trend</span>
                <span className="text-[10px] text-zinc-500">Hourly Samples</span>
              </div>
              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedSensor.history}>
                    <XAxis dataKey="time" hide />
                    <YAxis
                      domain={['auto', 'auto']}
                      stroke="#71717a"
                      fontSize={10}
                      tickFormatter={(v) => v.toFixed(0)}
                      width={28}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#09090b',
                        borderColor: '#27272a',
                        fontSize: '11px',
                        padding: '4px 8px',
                      }}
                      formatter={(v) => [`${v} ${selectedSensor.unit}`, 'Value']}
                      labelFormatter={() => 'Simulated Time'}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={selectedSensor.status === 'warning' ? '#f59e0b' : '#14b8a6'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Configurable Thresholds */}
          {selectedSensor.threshold && (
            <div className="mt-3 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium mb-2">
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                <span>Alert Threshold Range</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-500 block mb-1">
                    Min Threshold ({selectedSensor.unit})
                  </span>
                  <input
                    type="number"
                    value={selectedSensor.threshold.min ?? 0}
                    onChange={(e) =>
                      updateSensorThreshold(selectedSensor.id, { min: Number(e.target.value) })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:border-teal-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-500 block mb-1">
                    Max Threshold ({selectedSensor.unit})
                  </span>
                  <input
                    type="number"
                    value={selectedSensor.threshold.max ?? 100}
                    onChange={(e) =>
                      updateSensorThreshold(selectedSensor.id, { max: Number(e.target.value) })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sensor List Cards */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Field Stations ({filteredSensors.length})
        </span>

        {filteredSensors.map((sensor) => {
          const isSelected = sensor.id === selectedSensorId;
          const isWarning = sensor.status === 'warning';

          return (
            <div
              key={sensor.id}
              onClick={() => setSelectedSensorId(sensor.id)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 border-teal-500/80 shadow-md ring-1 ring-teal-500/30'
                  : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {getIcon(sensor.type)}
                  <span className="font-medium text-xs text-zinc-200">{sensor.id}</span>
                  <span className="text-[10px] text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {sensor.type.replace('-', ' ')}
                  </span>
                </div>
                <Wifi
                  className={`w-3.5 h-3.5 ${
                    isWarning ? 'text-amber-400 animate-pulse' : 'text-teal-500'
                  }`}
                />
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-400 truncate max-w-[180px]">
                  {sensor.name}
                </span>
                <span
                  className={`text-base font-bold font-mono ${
                    isWarning ? 'text-amber-400' : 'text-zinc-100'
                  }`}
                >
                  {sensor.value.toFixed(1)} <span className="text-xs font-normal text-zinc-500">{sensor.unit}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="text-[10px] text-zinc-500 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/40 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
        <span>
          <strong>Simulated Telemetry:</strong> All station telemetry is deterministically generated by the simulation clock and physics engine.
        </span>
      </div>
    </div>
  );
}
