import { useState, useEffect } from 'react';
import FarmExplorer from '../features/farm-explorer/FarmExplorer.jsx';
import FieldInspector from '../features/field-inspector/FieldInspector.jsx';
import SensorPanel from '../features/sensors/SensorPanel.jsx';
import HeatmapControls from '../features/heatmaps/HeatmapControls.jsx';
import useSimulationStore from '../../store/simulationStore';
import useFarmStore from '../../store/farmStore';
import useSimulationLogic from '../../hooks/useSimulationLogic';
import { Layers, Activity, Map } from 'lucide-react';

export default function CommandCenter() {
  useSimulationLogic();
  const [activePanel, setActivePanel] = useState('inspector'); // 'inspector' | 'sensors' | 'heatmaps'
  const { isRunning, advanceTime, simulationSpeed } = useSimulationStore();
  const { selectedSensorId, activeHeatmap } = useFarmStore();

  // If user selects a sensor in 3D, switch panel to sensors view
  useEffect(() => {
    if (selectedSensorId) {
      setActivePanel('sensors');
    }
  }, [selectedSensorId]);

  // Simulation tick loop
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      // 1 real second = 1 hour * simulationSpeed
      advanceTime(3600000 * simulationSpeed);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, advanceTime, simulationSpeed]);

  return (
    <div className="absolute inset-0 flex flex-col md:flex-row overflow-hidden">
      {/* 3D Scene Area */}
      <div className="flex-1 relative bg-zinc-950 min-h-0">
        <FarmExplorer />

        {/* Floating Quick Navigation Tabs */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg p-1 flex gap-1 shadow-xl">
            <button
              onClick={() => setActivePanel('inspector')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePanel === 'inspector'
                  ? 'bg-zinc-800 text-emerald-400 border border-emerald-900/50 shadow'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Field Geometry</span>
            </button>
            <button
              onClick={() => setActivePanel('sensors')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePanel === 'sensors'
                  ? 'bg-zinc-800 text-teal-400 border border-teal-900/50 shadow'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Sensor Network</span>
            </button>
            <button
              onClick={() => setActivePanel('heatmaps')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePanel === 'heatmaps'
                  ? 'bg-zinc-800 text-sky-400 border border-sky-900/50 shadow'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Analytics Heatmaps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Workstation Inspector Panel */}
      <div className="w-full md:w-84 lg:w-96 flex-shrink-0 bg-zinc-900/95 border-l border-zinc-800 flex flex-col overflow-y-auto">
        <div className="p-4 flex-1">
          {activePanel === 'inspector' && <FieldInspector />}
          {activePanel === 'sensors' && <SensorPanel />}
          {activePanel === 'heatmaps' && <HeatmapControls />}
        </div>
      </div>
    </div>
  );
}
