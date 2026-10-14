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
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import TwinMetricCard from "../components/digitalTwin/TwinMetricCard";
import TwinMap from "../components/digitalTwin/TwinMap";
import TwinStatePanel from "../components/digitalTwin/TwinStatePanel";
import SelectedFarmCard from "../components/digitalTwin/SelectedFarmCard";
import QuickWeatherCard from "../components/digitalTwin/QuickWeatherCard";
import SimulationTimeline from "../components/digitalTwin/SimulationTimeline";
import FieldRepresentationBuilder from "../components/digitalTwin/FieldRepresentationBuilder";
import { useState } from "react";
import DigitalTwinFieldSelector from "../components/digitalTwin/DigitalTwinFieldSelector";
import DigitalTwinRepresentation from "../components/digitalTwin/DigitalTwinRepresentation";
import CommandCenter from "../components/digitalTwin/CommandCenter";

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
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState(null);

  const handleGenerateField = (representation) => {
    console.log(
      "FIELD REPRESENTATION:",
      representation
    );
  };

  return (
    <div className="min-h-full space-y-4 pb-6">
      {/* Page header */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-[-0.6px] text-[var(--color-text-primary)] sm:text-[25px]">
              Digital Twin {selectedField ? ` — ${selectedField.name}` : ""}
            </h1>
            <div className="mt-3">
              <DigitalTwinFieldSelector
                onFieldChange={setSelectedField}
              />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-success)]/20 bg-[var(--color-success)]/10 px-2.5 py-1 text-[9px] font-bold text-[var(--color-success)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              Live
            </span>
          </div>

          <p className="mt-1 text-[11px] text-[var(--color-text-secondary)] sm:text-[12px]">
            Real-time virtual representation of your farm synchronized with live data.
          </p>
        </div>

        {/* <div className="flex flex-wrap items-center gap-2">
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
        </div> */}

        <button
        onClick={()=>navigate("add-digital-twin")}
          className="
            flex
            h-[48px]
            items-center
            justify-center
            gap-[8px]
            rounded-[12px]
            bg-[var(--color-primary)]
            px-[18px]
            text-[12px]
            font-bold
            text-white
            shadow-[0_8px_24px_rgba(22,163,74,.20)]
            transition-all
            hover:-translate-y-[1px]
            hover:bg-[var(--color-primary-hover)]
          "
        >
          <Plus size={17} strokeWidth={2.5} />
          Add Digital Twin
        </button>

      </section>

      {/* Metrics */}
      {/* <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-5">
        {metricData.map((metric) => (
          <TwinMetricCard key={metric.title} {...metric} />
        ))}
      </section> */}

      {/* digital twin representation */}
      {/* <DigitalTwinRepresentation field={selectedField} /> */}
      
      
    </div>
  );
}

export default DigitalTwin;
