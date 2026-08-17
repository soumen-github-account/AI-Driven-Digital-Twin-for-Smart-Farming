import {
  CalendarDays,
  Download,
  FlaskConical,
} from "lucide-react";

import SoilMetricCard from "../components/soil/SoilMetricCard";
import SoilHealthScore from "../components/soil/SoilHealthScore";
import SoilInsightCard from "../components/soil/SoilInsightCard";
import SoilRecommendation from "../components/soil/SoilRecommendation";
import NutrientLevels from "../components/soil/NutrientLevels";
import HistoricalTrends from "../components/soil/HistoricalTrends";
import FieldComparison from "../components/soil/FieldComparison";
import RecentSoilTests from "../components/soil/RecentSoilTests";

function Soil() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="mb-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1
              className="
                text-[24px]
                font-extrabold
                tracking-[-0.8px]
                text-[var(--color-text-primary)]
                sm:text-[27px]
              "
            >
              Soil Intelligence
            </h1>

            <p
              className="
                mt-1
                text-[11px]
                font-medium
                text-[var(--color-text-secondary)]
                sm:text-[12px]
              "
            >
              Understand your soil conditions and nutrient health.
            </p>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-2">

            {/* Date */}

            <button
              type="button"
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-3
                text-[10px]
                font-semibold
                text-[var(--color-text-primary)]
                shadow-[0_2px_10px_rgba(0,0,0,0.025)]
                transition
                hover:border-[var(--color-border-hover)]
                hover:bg-[var(--color-surface-secondary)]
              "
            >
              <span>May 01 – May 13, 2025</span>

              <CalendarDays
                size={15}
                strokeWidth={1.8}
                className="text-[var(--color-text-secondary)]"
              />
            </button>

            {/* Export */}

            <button
              type="button"
              className="
                hidden
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-3
                text-[10px]
                font-bold
                text-[var(--color-text-primary)]
                transition
                hover:bg-[var(--color-surface-secondary)]
                sm:flex
              "
            >
              <Download size={15} strokeWidth={1.8} />
              Export Report
            </button>

            {/* Soil sampling */}

            <button
              type="button"
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                bg-[var(--color-primary)]
                px-3
                text-[10px]
                font-bold
                text-white
                shadow-[0_5px_18px_rgba(22,163,74,0.18)]
                transition
                hover:bg-[var(--color-primary-hover)]
                active:scale-[0.98]
              "
            >
              <FlaskConical
                size={15}
                strokeWidth={1.9}
              />

              <span className="hidden sm:inline">
                Soil Sampling
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          TOP METRICS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-2
          gap-3
          xl:grid-cols-5
        "
      >

        <SoilMetricCard
          icon="ph"
          title="pH"
          value="6.8"
          status="Slightly Acidic"
          statusType="good"
          progress={48}
          min="0"
          max="14"
        />

        <SoilMetricCard
          icon="carbon"
          title="Organic Carbon"
          value="2.3%"
          status="Medium"
          statusType="warning"
          progress={58}
          min="0%"
          max="4%"
        />

        <SoilMetricCard
          icon="nitrogen"
          title="Nitrogen (N)"
          value="45"
          unit="kg/ha"
          status="Medium"
          statusType="warning"
          progress={45}
          min="0"
          max="100"
        />

        <SoilMetricCard
          icon="phosphorus"
          title="Phosphorus (P₂O₅)"
          value="22"
          unit="kg/ha"
          status="Low"
          statusType="danger"
          progress={36}
          min="0"
          max="60"
        />

        <SoilMetricCard
          icon="potassium"
          title="Potassium (K₂O)"
          value="210"
          unit="kg/ha"
          status="High"
          statusType="good"
          progress={70}
          min="0"
          max="300"
        />

      </section>

      {/* =====================================================
          MAIN INSIGHTS AREA
      ===================================================== */}

      <section
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-[380px_minmax(0,1fr)_320px]
        "
      >

        {/* Soil Health */}

        <SoilHealthScore />

        {/* Middle insights */}

        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          "
        >

          <SoilInsightCard
            title="Moisture Level"
            value="32%"
            status="Optimal"
            type="water"
            data={[24, 27, 29, 31, 30, 34, 33, 36]}
          />

          <SoilInsightCard
            title="pH Trend"
            value="6.8"
            status="Slightly Acidic"
            type="ph"
            data={[6.5, 6.5, 6.6, 6.9, 6.8, 6.7, 6.8]}
          />

          <SoilInsightCard
            title="Soil Temperature"
            value="29.6°C"
            status="Optimal"
            type="temperature"
            data={[27, 29, 28, 30, 29, 31, 30]}
          />

          <SoilInsightCard
            title="Salinity (EC)"
            value="0.45 dS/m"
            status="Low"
            type="water"
            data={[0.5, 0.48, 0.46, 0.47, 0.43, 0.45, 0.44]}
          />

          <SoilInsightCard
            title="Organic Matter"
            value="2.3%"
            status="Medium"
            type="carbon"
            data={[1.8, 2, 2.2, 2.1, 2.4, 2.3, 2.4]}
          />

          {/* Soil texture */}

          <div
            className="
              rounded-2xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-4
              shadow-[0_4px_18px_rgba(0,0,0,0.025)]
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-bold">
                  Soil Texture
                </p>

                <h3
                  className="
                    mt-2
                    text-[18px]
                    font-extrabold
                    tracking-[-0.5px]
                  "
                >
                  Clay Loam
                </h3>

                <p
                  className="
                    mt-1
                    text-[9px]
                    font-semibold
                    text-[var(--color-primary)]
                  "
                >
                  Balanced Texture
                </p>
              </div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    relative
                    h-[64px]
                    w-[64px]
                    rounded-full
                    [background:conic-gradient(#22c55e_0deg_101deg,#60a5fa_101deg_245deg,#d1d5db_245deg_360deg)]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-[9px]
                      rounded-full
                      bg-[var(--color-surface)]
                    "
                  />
                </div>

              </div>

            </div>

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">

              <span className="text-[8px] text-[var(--color-text-secondary)]">
                <i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#22c55e]" />
                Clay 28%
              </span>

              <span className="text-[8px] text-[var(--color-text-secondary)]">
                <i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#60a5fa]" />
                Silt 40%
              </span>

              <span className="text-[8px] text-[var(--color-text-secondary)]">
                <i className="mr-1 inline-block h-2 w-2 rounded-full bg-gray-300" />
                Sand 32%
              </span>

            </div>
          </div>

        </div>

        {/* AI Recommendation */}

        <SoilRecommendation />

      </section>

      {/* =====================================================
          ANALYTICS ROW
      ===================================================== */}

      <section
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          lg:grid-cols-2
          xl:grid-cols-[330px_minmax(0,1fr)_430px]
        "
      >

        <NutrientLevels />

        <HistoricalTrends />

        <FieldComparison />

      </section>

      {/* =====================================================
          RECENT TESTS
      ===================================================== */}

      <section className="mt-4">
        <RecentSoilTests />
      </section>

    </div>
  );
}

export default Soil;