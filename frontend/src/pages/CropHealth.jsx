import CropHealthHeader from "../components/cropHealth/CropHealthHeader";
import HealthStatCard from "../components/cropHealth/HealthStatCard";
import CropHealthTrend from "../components/cropHealth/CropHealthTrend";
import FieldHealthMap from "../components/cropHealth/FieldHealthMap";
import DiseaseDetection from "../components/cropHealth/DiseaseDetection";
import HealthIndexHistory from "../components/cropHealth/HealthIndexHistory";
import VegetationIndices from "../components/cropHealth/VegetationIndices";
import CropGrowthTimeline from "../components/cropHealth/CropGrowthTimeline";

import {
  Activity,
  Leaf,
  Sprout,
  BarChart3,
  Wheat,
} from "lucide-react";

const stats = [
  {
    title: "Health Score",
    value: "92%",
    status: "Very Good",
    change: "6%",
    description: "vs last 7 days",
    icon: Activity,
    type: "green",
    data: [76, 81, 79, 84, 82, 87, 92],
  },
  {
    title: "NDVI",
    value: "0.78",
    status: "Healthy",
    change: "0.05",
    description: "vs last 7 days",
    icon: Leaf,
    type: "green",
    data: [0.68, 0.71, 0.69, 0.74, 0.72, 0.76, 0.78],
  },
  {
    title: "Leaf Area Index",
    value: "4.2",
    status: "Optimal",
    change: "0.3",
    description: "vs last 7 days",
    icon: Sprout,
    type: "green",
    data: [3.5, 3.7, 3.6, 4, 3.8, 4.1, 4.2],
  },
  {
    title: "Biomass",
    value: "8.6",
    unit: "t/ha",
    status: "Excellent",
    change: "0.7 t/ha",
    description: "vs last 7 days",
    icon: BarChart3,
    type: "green",
    data: [7.1, 7.5, 7.3, 8, 7.8, 8.3, 8.6],
  },
];

function CropHealth() {
  return (
    <div className="min-h-full text-[var(--color-text-primary)]">
      {/* HEADER */}
      <CropHealthHeader />

      {/* TOP STAT CARDS */}
      <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <HealthStatCard
            key={stat.title}
            {...stat}
          />
        ))}

        {/* Growth Stage */}
        <div
          className="
            rounded-[18px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-4
            shadow-[0_4px_18px_rgba(0,0,0,0.035)]
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:border-[var(--color-border-hover)]
            hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]
          "
        >
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-xl
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
              "
            >
              <Wheat size={18} strokeWidth={1.8} />
            </div>

            <span className="text-[11px] font-semibold">
              Growth Stage
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[21px] font-bold tracking-[-0.5px]">
              Tillering
            </p>

            <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
              Stage 3 of 7
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
              <div
                className="
                  h-full
                  w-[38%]
                  rounded-full
                  bg-[var(--color-primary)]
                "
              />
            </div>

            <p className="mt-2 text-[9px] text-[var(--color-text-secondary)]">
              45 days to Panicle Initiation
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section
        className="
          mt-3
          grid
          grid-cols-1
          gap-3
          xl:grid-cols-[minmax(0,1.65fr)_minmax(310px,0.95fr)_minmax(280px,0.85fr)]
        "
      >
        {/* LEFT */}
        <div className="min-w-0">
          <CropHealthTrend />
        </div>

        {/* CENTER */}
        <div className="min-w-0">
          <FieldHealthMap />
        </div>

        {/* RIGHT */}
        <div className="min-w-0">
          <DiseaseDetection />
        </div>
      </section>

      {/* BOTTOM */}
      <section
        className="
          mt-3
          grid
          grid-cols-1
          gap-3
          xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.8fr)_minmax(360px,1.1fr)]
        "
      >
        <HealthIndexHistory />

        <VegetationIndices />

        <CropGrowthTimeline />
      </section>
    </div>
  );
}

export default CropHealth;