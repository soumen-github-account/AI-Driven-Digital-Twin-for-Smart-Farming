import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CloudSun,
  Droplets,
  Leaf,
  LineChart,
  MonitorCog,
  Satellite,
  Sprout,
  Timer,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";
import HeroImg from "../../assets/HeroImg2.png"
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-[var(--color-bg)]
        px-3
        pb-6
        pt-[84px]

        transition-colors
        duration-500

        sm:px-5
        sm:pt-[90px]

        lg:px-7
        lg:pb-8
        lg:pt-[96px]
      "
    >
      {/* =========================================================
          BACKGROUND GLOW
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-[80px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[var(--color-primary)]
          opacity-[0.07]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-150px]
          top-[120px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[var(--color-ai)]
          opacity-[0.06]
          blur-[140px]
        "
      />

      {/* =========================================================
          HERO CONTAINER
      ========================================================= */}

      <div
        className="
          relative
          mx-auto
          min-h-[680px]
          max-w-[1480px]
          overflow-hidden

          rounded-[24px]

          border
          border-[var(--color-border)]

          bg-[var(--color-surface)]

          shadow-[0_20px_70px_rgba(0,0,0,0.07)]

          transition-all
          duration-500

          sm:rounded-[30px]

          lg:min-h-[730px]
          lg:rounded-[34px]
        "
      >
        {/* =======================================================
            FARM BACKGROUND / IMAGE AREA
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          {/* Farm image */}

          <img
            src={HeroImg}
            alt="AgriTwin digital farm"
            className="
              absolute
              right-[-4%]
              top-0

              h-full
              w-[72%]

              object-cover
              object-center

              opacity-[0.96]

              transition-opacity
              duration-500

              lg:w-[70%]
            "
          />

          {/* Left white fade */}

          <div
            className="
              absolute
              inset-y-0
              left-0
              w-[68%]

              bg-gradient-to-r
              from-[var(--color-surface)]
              via-[var(--color-surface)]/95
              via-[65%]
              to-transparent
            "
          />

          {/* Bottom fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[35%]

              bg-gradient-to-t
              from-[var(--color-surface)]
              to-transparent
            "
          />

          {/* Dark theme overlay */}

          <div
            className="
              absolute
              inset-0

              hidden
              dark:block

              bg-gradient-to-r
              from-[var(--color-surface)]
              via-[var(--color-surface)]/80
              to-transparent
            "
          />
        </div>

        {/* =======================================================
            HERO CONTENT
        ======================================================= */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[680px]
            flex-col

            px-6
            pb-8
            pt-10

            sm:px-9
            sm:pt-12

            lg:min-h-[730px]
            lg:px-14
            lg:pb-10
            lg:pt-16
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div
            className="
              max-w-[650px]

              lg:max-w-[610px]
            "
          >
            {/* Badge */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[var(--color-primary)]/20

                bg-[var(--color-surface-secondary)]

                px-3.5
                py-2

                text-[10px]
                font-bold
                text-[var(--color-primary)]

                shadow-sm

                sm:mb-6
                sm:px-4
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--color-primary)]/10
                "
              >
                <Leaf
                  size={12}
                  strokeWidth={2.5}
                />
              </span>

              <span>Smarter Farming with AI</span>

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[var(--color-primary)]
                "
              />
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              className="
                max-w-[640px]

                text-[43px]
                font-black
                leading-[0.98]
                tracking-[-2.4px]

                text-[var(--color-text-primary)]

                sm:text-[55px]
                sm:tracking-[-3px]

                lg:text-[62px]
                lg:leading-[0.97]
                xl:text-[62px]
              "
            >
              Your Farm.
              <br />

              Your Digital Twin.
              <br />

              <span
                className="
                  text-[var(--color-primary)]
                "
              >
                Your AI Agronomist.
              </span>
            </h1>

            {/* Decorative green line */}

            <div
              className="
                mt-2
                h-[5px]
                w-[205px]

                rounded-full

                bg-[var(--color-primary)]

                opacity-70

                sm:w-[270px]
              "
            />

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-[570px]

                text-[14px]
                font-medium
                leading-7

                text-[var(--color-text-secondary)]

                sm:text-[15px]
                sm:leading-7

                lg:text-[16px]
              "
            >
              Farm Intel AI creates a real-time digital twin of your farm
              using AI, IoT, weather and satellite data to help you
              predict, decide and increase productivity sustainably.
            </p>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
              "
            >
              {/* Primary */}

              <Link
                to="/dashboard"
                className="
                  group
                  inline-flex
                  h-[52px]
                  items-center
                  justify-center
                  gap-3

                  rounded-[12px]

                  bg-[var(--color-primary)]

                  px-6

                  text-[13px]
                  font-bold
                  text-white

                  shadow-[0_8px_25px_rgba(22,163,74,0.22)]

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:bg-[var(--color-primary-hover)]
                  hover:shadow-[0_12px_30px_rgba(22,163,74,0.3)]

                  active:scale-[0.98]
                "
              >
                <Sprout
                  size={18}
                  strokeWidth={2.3}
                />

                Create Your Farm Twin

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              {/* Secondary */}

              <a
                href="#how-it-works"
                className="
                  group
                  inline-flex
                  h-[52px]
                  items-center
                  justify-center
                  gap-3

                  rounded-[12px]

                  border
                  border-[var(--color-border-hover)]

                  bg-[var(--color-surface)]/80

                  px-6

                  text-[13px]
                  font-bold
                  text-[var(--color-text-primary)]

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-[var(--color-primary)]
                  hover:text-[var(--color-primary)]

                  active:scale-[0.98]
                "
              >
                Explore Platform

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>
            </div>

            {/* =================================================
                FEATURE PILLS
            ================================================= */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-2
              "
            >
              <FeaturePill
                icon={BrainCircuit}
                text="AI-Powered Insights"
              />

              <FeaturePill
                icon={Timer}
                text="Real-Time Monitoring"
              />

              <FeaturePill
                icon={BarChart3}
                text="Data-Driven Decisions"
              />

              <FeaturePill
                icon={Leaf}
                text="Higher Yields"
              />
            </div>
          </div>

          {/* =====================================================
              FLOATING DATA CARDS
          ===================================================== */}

          {/* Crop Health */}

          <MetricCard
            className="
              absolute
              left-[53%]
              top-[22%]

              hidden
              lg:flex
            "
            icon={Leaf}
            iconClass="text-[var(--color-primary)]"
            title="Crop Health"
            value="87"
            status="Good"
            statusClass="text-[var(--color-success)]"
          />

          {/* Soil */}

          <MetricCard
            className="
              absolute
              right-[7%]
              top-[20%]

              hidden
              lg:flex
            "
            icon={Droplets}
            iconClass="text-[var(--color-water)]"
            title="Soil Moisture"
            value="68%"
            status="Optimal"
            statusClass="text-[var(--color-success)]"
          />

          {/* Temperature */}

          <MetricCard
            className="
              absolute
              left-[50%]
              bottom-[27%]

              hidden
              lg:flex
            "
            icon={CloudSun}
            iconClass="text-[var(--color-warning)]"
            title="Temperature"
            value="32.4°C"
            status="Partly Cloudy"
            statusClass="text-[var(--color-info)]"
          />

          {/* Water */}

          <MetricCard
            className="
              absolute
              right-[5%]
              bottom-[24%]

              hidden
              lg:flex
            "
            icon={Droplets}
            iconClass="text-[var(--color-water)]"
            title="Water Status"
            value="Optimal"
            status="Irrigation On"
            statusClass="text-[var(--color-success)]"
          />

          {/* =====================================================
              MOBILE METRICS
          ===================================================== */}

          <div
            className="
              mt-8
              grid
              grid-cols-2
              gap-2

              lg:hidden
            "
          >
            <MobileMetric
              icon={Leaf}
              title="Crop Health"
              value="87"
              status="Good"
              iconClass="text-[var(--color-primary)]"
            />

            <MobileMetric
              icon={Droplets}
              title="Soil Moisture"
              value="68%"
              status="Optimal"
              iconClass="text-[var(--color-water)]"
            />

            <MobileMetric
              icon={CloudSun}
              title="Temperature"
              value="32.4°C"
              status="Partly Cloudy"
              iconClass="text-[var(--color-warning)]"
            />

            <MobileMetric
              icon={Waves}
              title="Water Status"
              value="Optimal"
              status="Irrigation On"
              iconClass="text-[var(--color-water)]"
            />
          </div>

          {/* =====================================================
              WORKFLOW STRIP
          ===================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              hidden
              w-[calc(100%-40px)]
              -translate-x-1/2

              rounded-[22px]

              border
              border-[var(--color-border)]

              bg-[var(--color-surface)]/90

              p-4

              shadow-[0_10px_40px_rgba(0,0,0,0.07)]

              backdrop-blur-xl

              lg:block
              lg:w-[calc(100%-160px)]
              lg:p-5
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <WorkflowItem
                icon={Satellite}
                title="Farm Data"
                description="Collect data from sensors, satellite, weather & soil"
              />

              <WorkflowArrow />

              <WorkflowItem
                icon={MonitorCog}
                title="Digital Twin"
                description="Create a virtual model of your farm"
              />

              <WorkflowArrow />

              <WorkflowItem
                icon={BrainCircuit}
                title="AI Analysis"
                description="Analyze data to find patterns"
              />

              <WorkflowArrow />

              <WorkflowItem
                icon={LineChart}
                title="Prediction"
                description="Predict risks, yield & resource needs"
              />

              <WorkflowArrow />

              <WorkflowItem
                icon={Sprout}
                title="Action"
                description="Get actionable recommendations"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   FEATURE PILL
============================================================= */

function FeaturePill({ icon: Icon, text }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2

        rounded-full

        border
        border-[var(--color-border)]

        bg-[var(--color-surface)]/80

        px-3
        py-2

        text-[10px]
        font-semibold

        text-[var(--color-text-secondary)]

        shadow-sm

        backdrop-blur-md

        transition-all
        duration-200

        hover:border-[var(--color-primary)]
        hover:text-[var(--color-primary)]
      "
    >
      <Icon
        size={13}
        strokeWidth={2.2}
        className="text-[var(--color-primary)]"
      />

      {text}
    </div>
  );
}

/* =============================================================
   DESKTOP METRIC CARD
============================================================= */

function MetricCard({
  className,
  icon: Icon,
  iconClass,
  title,
  value,
  status,
  statusClass,
}) {
  return (
    <div
      className={`
        ${className}

        z-20
        w-[180px]

        flex-col

        rounded-[17px]

        border
        border-white/30

        bg-[var(--color-surface)]/75

        p-3.5

        shadow-[0_10px_35px_rgba(0,0,0,0.13)]

        backdrop-blur-xl

        transition-all
        duration-300

        hover:-translate-y-1
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-xl

            border
            border-[var(--color-border)]

            bg-[var(--color-surface-secondary)]
          "
        >
          <Icon
            size={20}
            className={iconClass}
          />
        </div>

        <div>
          <p
            className="
              text-[9px]
              font-semibold
              text-[var(--color-text-secondary)]
            "
          >
            {title}
          </p>

          <p
            className="
              mt-0.5
              text-[22px]
              font-black
              leading-none
              text-[var(--color-text-primary)]
            "
          >
            {value}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span
          className="
            text-[9px]
            font-medium
            text-[var(--color-text-secondary)]
          "
        >
          Status
        </span>

        <span
          className={`
            text-[9px]
            font-bold
            ${statusClass}
          `}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

/* =============================================================
   MOBILE METRIC
============================================================= */

function MobileMetric({
  icon: Icon,
  title,
  value,
  status,
  iconClass,
}) {
  return (
    <div
      className="
        rounded-[15px]

        border
        border-[var(--color-border)]

        bg-[var(--color-surface)]/85

        p-3

        shadow-sm

        backdrop-blur-md
      "
    >
      <div className="flex items-center gap-2.5">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[var(--color-surface-secondary)]
          "
        >
          <Icon
            size={16}
            className={iconClass}
          />
        </div>

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[8px]
              font-semibold
              text-[var(--color-text-secondary)]
            "
          >
            {title}
          </p>

          <p
            className="
              text-[17px]
              font-black
              leading-tight
              text-[var(--color-text-primary)]
            "
          >
            {value}
          </p>
        </div>
      </div>

      <p
        className="
          mt-2
          text-[8px]
          font-bold
          text-[var(--color-success)]
        "
      >
        {status}
      </p>
    </div>
  );
}

/* =============================================================
   WORKFLOW ITEM
============================================================= */

function WorkflowItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        flex
        min-w-0
        flex-1
        items-center
        gap-3
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center

          rounded-full

          border
          border-[var(--color-primary)]/10

          bg-[var(--color-surface-secondary)]

          text-[var(--color-primary)]
        "
      >
        <Icon
          size={21}
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[11px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            max-w-[135px]

            text-[8px]
            font-medium
            leading-4

            text-[var(--color-text-secondary)]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   WORKFLOW ARROW
============================================================= */

function WorkflowArrow() {
  return (
    <ArrowRight
      size={18}
      className="
        shrink-0
        text-[var(--color-primary)]
        opacity-60
      "
    />
  );
}

export default HeroSection;