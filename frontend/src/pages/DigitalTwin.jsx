import {
  Activity,
  ArrowRight,
  Camera,
  ChevronDown,
  Cloud,
  Droplets,
  Download,
  Layers3,
  Maximize2,
  Play,
  RefreshCw,
  RotateCcw,
  Share2,
  Thermometer,
  Waves,
} from "lucide-react";

import TwinMetricCard from "../components/digitalTwin/TwinMetricCard";
import TwinMap from "../components/digitalTwin/TwinMap";
import TwinStatePanel from "../components/digitalTwin/TwinStatePanel";
import SelectedFarmCard from "../components/digitalTwin/SelectedFarmCard";
import QuickWeatherCard from "../components/digitalTwin/QuickWeatherCard";
import SimulationTimeline from "../components/digitalTwin/SimulationTimeline";

const metricData = [
  {
    title: "Crop Health",
    value: "92%",
    status: "Very Good",
    tone: "green",
    icon: Activity,
    points: [62, 68, 65, 75, 72, 82, 79, 92],
  },
  {
    title: "Soil Moisture",
    value: "32%",
    status: "Moderate",
    tone: "blue",
    icon: Droplets,
    points: [28, 34, 31, 38, 44, 56, 48, 53],
  },
  {
    title: "Temperature",
    value: "29°C",
    status: "Optimal",
    tone: "orange",
    icon: Thermometer,
    points: [45, 52, 49, 57, 62, 59, 54, 68],
  },
  {
    title: "Water Stress",
    value: "Low",
    status: "Good",
    tone: "blue",
    icon: Waves,
    points: [28, 29, 38, 55, 46, 52, 44, 49],
  },
  {
    title: "Disease Risk",
    value: "12%",
    status: "Low Risk",
    tone: "green",
    icon: Activity,
    points: [32, 28, 35, 31, 40, 37, 43, 49],
  },
];

function DigitalTwin() {
  return (
    <div className="min-h-full space-y-4 pb-6">
      {/* Page header */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-[-0.6px] text-[var(--color-text-primary)] sm:text-[25px]">
              Digital Twin — Green Valley Farm
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-success)]/20 bg-[var(--color-success)]/10 px-2.5 py-1 text-[9px] font-bold text-[var(--color-success)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              Live
            </span>
          </div>

          <p className="mt-1 text-[11px] text-[var(--color-text-secondary)] sm:text-[12px]">
            Real-time virtual representation of your farm synchronized with live data.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="twin-secondary-btn">
            <Share2 size={15} />
            <span>Share Twin</span>
          </button>

          <button className="twin-secondary-btn">
            <Download size={15} />
            <span>Export View</span>
          </button>

          <button className="twin-primary-btn">
            <Play size={14} fill="currentColor" />
            <span>Run Simulation</span>
          </button>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-5">
        {metricData.map((metric) => (
          <TwinMetricCard key={metric.title} {...metric} />
        ))}
      </section>

      {/* Main workspace */}
      <section className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_268px]">
        <div className="min-w-0">
          <TwinMap />
        </div>

        <div className="min-w-0">
          <TwinStatePanel />
        </div>
      </section>

      {/* Lower controls / timeline */}
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[187px_minmax(0,1fr)]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <SelectedFarmCard />
          <QuickWeatherCard />
        </div>

        <SimulationTimeline />
      </section>
    </div>
  );
}

export default DigitalTwin;
