import {
  BrainCircuit,
  CalendarDays,
  ChevronDown,
  Download,
  GitCompareArrows,
  Sparkles,
} from "lucide-react";

import PredictionStatCard from "../components/predictions/PredictionStatCard";
import YieldPredictionChart from "../components/predictions/YieldPredictionChart";
import CropHealthChart from "../components/predictions/CropHealthChart";
import DiseaseRiskChart from "../components/predictions/DiseaseRiskChart";
import WaterUsageChart from "../components/predictions/WaterUsageChart";
import RevenueProjectionChart from "../components/predictions/RevenueProjectionChart";
import PredictionFactors from "../components/predictions/PredictionFactors";
import OverallConfidence from "../components/predictions/OverallConfidence";
import FieldComparison from "../components/predictions/FieldComparison";
import AIInsights from "../components/predictions/AIInsights";

function Predictions() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <main className="px-4 py-5 sm:px-6 lg:px-7">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                "
              >
                <BrainCircuit size={20} />
              </div>

              <h1 className="text-[25px] font-bold tracking-[-0.8px]">
                Predictions & Analytics
              </h1>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-[12px] text-[var(--color-text-secondary)]">
                AI-powered predictions with high confidence to help you make
                better farm decisions.
              </p>

              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full
                  border border-[var(--color-primary)]/20
                  bg-[var(--color-primary)]/8
                  px-2.5 py-1
                  text-[9px] font-semibold
                  text-[var(--color-primary)]
                "
              >
                <Sparkles size={11} />
                AI Model: AgriTwin v3.2
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">

            <button className="ios-button">
              <CalendarDays size={15} />
              Season 2025 (Kharif)
              <ChevronDown size={14} />
            </button>

            <button className="ios-button">
              <GitCompareArrows size={15} />
              Compare Fields
            </button>

            <button className="ios-button primary">
              <Download size={15} />
              Download Report
            </button>

          </div>
        </section>

        {/* =====================================================
            TOP STAT CARDS
        ===================================================== */}

        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-5
            gap-3
            mb-4
          "
        >
          <PredictionStatCard
            icon="yield"
            title="Predicted Yield"
            value="4.2"
            unit="tons/ha"
            change="4.3%"
            subtitle="vs last season"
            confidence={87}
          />

          <PredictionStatCard
            icon="revenue"
            title="Expected Revenue"
            value="₹2,15,000"
            change="12.6%"
            subtitle="vs last season"
            confidence={82}
          />

          <PredictionStatCard
            icon="water"
            title="Water Requirement"
            value="10.5k"
            unit="L/ha"
            change="6.2%"
            subtitle="vs last season"
            confidence={79}
          />

          <PredictionStatCard
            icon="disease"
            title="Disease Risk"
            value="12%"
            subtitle="Low Risk"
            confidence={88}
            negative
          />

          <PredictionStatCard
            icon="harvest"
            title="Harvest Date (Predicted)"
            value="18 October 2025"
            subtitle="± 3 days"
            confidence={85}
          />
        </section>

        {/* =====================================================
            MAIN ANALYTICS GRID
        ===================================================== */}

        <section
          className="
            grid
            grid-cols-1
            xl:grid-cols-[minmax(0,2.2fr)_minmax(280px,0.9fr)]
            gap-4
          "
        >

          {/* LEFT */}
          <div className="min-w-0 space-y-4">

            {/* ROW 1 */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <div className="dashboard-card">
                <YieldPredictionChart />
              </div>

              <div className="dashboard-card">
                <CropHealthChart />
              </div>

            </div>

            {/* ROW 2 */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <div className="dashboard-card">
                <WaterUsageChart />
              </div>

              <div className="dashboard-card">
                <RevenueProjectionChart />
              </div>

            </div>

            {/* FIELD COMPARISON */}

            <div className="dashboard-card overflow-hidden">
              <FieldComparison />
            </div>

          </div>

          {/* RIGHT */}

          <aside className="space-y-4">

            <div className="dashboard-card">
              <DiseaseRiskChart />
            </div>

            <div className="dashboard-card">
              <PredictionFactors />
            </div>

            <div className="dashboard-card">
              <OverallConfidence />
            </div>

          </aside>

        </section>

        {/* =====================================================
            AI INSIGHTS
        ===================================================== */}

        <section className="mt-4">
          <div className="dashboard-card">
            <AIInsights />
          </div>
        </section>

      </main>
    </div>
  );
}

export default Predictions;