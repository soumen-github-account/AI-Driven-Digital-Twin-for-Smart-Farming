import {
  ArrowRight,
  BrainCircuit,
  Database,
  GitBranch,
  Lightbulb,
  LineChart,
  Radar,
  Sprout,
  Target,
  Workflow,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Farm Data",
    description:
      "Collect data from sensors, satellite, weather and soil sources.",
    icon: Database,
    accent: "primary",
  },
  {
    number: "02",
    title: "Digital Twin",
    description:
      "Create a real-time virtual model that represents your farm.",
    icon: Workflow,
    accent: "primary",
  },
  {
    number: "03",
    title: "AI Analysis",
    description:
      "AI analyzes farm data to discover patterns and hidden risks.",
    icon: BrainCircuit,
    accent: "ai",
  },
  {
    number: "04",
    title: "Prediction",
    description:
      "Predict crop risks, yield, weather impact and resource needs.",
    icon: LineChart,
    accent: "primary",
  },
  {
    number: "05",
    title: "Recommendation",
    description:
      "Generate smart recommendations tailored to your farm.",
    icon: Lightbulb,
    accent: "ai",
  },
  {
    number: "06",
    title: "Action",
    description:
      "Turn insights into actionable farming decisions and results.",
    icon: Sprout,
    accent: "primary",
  },
];

function WorkingSection() {
  return (
    <section
      id="how-it-works"
      className="
        relative
        overflow-hidden
        bg-[var(--color-bg)]
        px-4
        py-16
        transition-colors
        duration-500

        sm:px-6
        sm:py-20

        lg:px-10
        lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-[300px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[var(--color-primary)]
          opacity-[0.035]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[45%]
          h-[280px]
          w-[280px]
          rounded-full
          bg-[var(--color-ai)]
          opacity-[0.035]
          blur-[100px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1400px]

          rounded-[28px]

          border
          border-[var(--color-border)]

          bg-[var(--color-surface)]

          px-5
          py-10

          shadow-[0_15px_60px_rgba(0,0,0,0.045)]

          transition-all
          duration-500

          sm:rounded-[34px]
          sm:px-8
          sm:py-14

          lg:px-12
          lg:py-16
        "
      >
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div className="mx-auto max-w-[700px] text-center">
          {/* Small label */}

          <div
            className="
              mx-auto
              mb-4
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-[var(--color-primary)]/20

              bg-[var(--color-surface-secondary)]

              px-3.5
              py-1.5

              text-[10px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            <Radar
              size={13}
              strokeWidth={2.4}
            />

            AI-Powered Farming Intelligence
          </div>

          {/* Heading */}

          <h2
            className="
              text-[30px]
              font-black
              leading-[1.05]
              tracking-[-1.5px]

              text-[var(--color-text-primary)]

              sm:text-[38px]
              sm:tracking-[-2px]

              lg:text-[44px]
            "
          >
            How Farm Intel AI
            <span className="text-[var(--color-primary)]">
              {" "}
              Works
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-[600px]

              text-[13px]
              font-medium
              leading-6

              text-[var(--color-text-secondary)]

              sm:text-[14px]
              sm:leading-7
            "
          >
            From raw farm data to intelligent action, AgriTwin AI
            continuously transforms your farm information into
            meaningful decisions.
          </p>
        </div>

        {/* ===================================================
            PROCESS FLOW
        =================================================== */}

        <div
          className="
            relative
            mt-12

            lg:mt-14
          "
        >
          {/* Desktop connecting line */}

          <div
            className="
              absolute
              left-[8%]
              right-[8%]
              top-[42px]
              hidden
              h-[2px]

              bg-gradient-to-r
              from-[var(--color-primary)]/10
              via-[var(--color-primary)]/50
              to-[var(--color-primary)]/10

              lg:block
            "
          />

          {/* Animated line */}

          <div
            className="
              absolute
              left-[8%]
              top-[42px]
              hidden
              h-[2px]
              w-[18%]

              bg-[var(--color-primary)]

              opacity-70

              lg:block

              animate-pulse
            "
          />

          {/* Steps */}

          <div
            className="
              grid
              grid-cols-1
              gap-4

              md:grid-cols-2

              lg:grid-cols-6
              lg:gap-3
            "
          >
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                total={steps.length}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            BOTTOM AI STATUS BAR
        =================================================== */}

        <div
          className="
            mt-10

            flex
            flex-col
            gap-4

            rounded-[20px]

            border
            border-[var(--color-border)]

            bg-[var(--color-surface-secondary)]

            p-4

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-5
          "
        >
          {/* Left */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-[var(--color-primary)]

                text-white

                shadow-[0_5px_18px_rgba(34,197,94,0.25)]
              "
            >
              <GitBranch
                size={18}
                strokeWidth={2.2}
              />
            </div>

            <div>
              <p
                className="
                  text-[11px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                Continuous Intelligence
              </p>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  font-medium
                  text-[var(--color-text-secondary)]
                "
              >
                Your digital twin keeps learning from your farm.
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-2">
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-[var(--color-success)]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                text-[var(--color-success)]
              "
            >
              AI System Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STEP CARD
========================================================= */

function StepCard({ step, index, total }) {
  const Icon = step.icon;

  return (
    <div className="group relative">
      {/* =================================================
          CARD
      ================================================= */}

      <div
        className="
          relative
          h-full
          overflow-hidden

          rounded-[20px]

          border
          border-[var(--color-border)]

          bg-[var(--color-surface)]

          p-5

          shadow-[0_5px_20px_rgba(0,0,0,0.025)]

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[var(--color-primary)]/40
          hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]
        "
      >
        {/* Top subtle fill */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-35px]
            top-[-35px]
            h-24
            w-24
            rounded-full

            bg-[var(--color-primary)]

            opacity-[0.045]

            blur-2xl

            transition-all
            duration-500

            group-hover:scale-150
          "
        />

        {/* =================================================
            NUMBER
        ================================================= */}

        <div className="relative flex items-center justify-between">
          <span
            className="
              text-[10px]
              font-black
              tracking-[1px]

              text-[var(--color-primary)]
            "
          >
            {step.number}
          </span>

          {/* Desktop connector dot */}

          <div
            className="
              hidden

              h-[10px]
              w-[10px]

              rounded-full

              border-2
              border-[var(--color-surface)]

              bg-[var(--color-primary)]

              shadow-[0_0_0_3px_var(--color-primary)]/10

              lg:block
            "
          />
        </div>

        {/* =================================================
            ICON
        ================================================= */}

        <div
          className="
            relative
            mt-5

            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-[17px]

            border
            border-[var(--color-primary)]/15

            bg-[var(--color-surface-secondary)]

            text-[var(--color-primary)]

            transition-all
            duration-300

            group-hover:scale-105
            group-hover:bg-[var(--color-primary)]/10
          "
        >
          <Icon
            size={25}
            strokeWidth={1.9}
          />

          {/* Active glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[17px]

              shadow-[inset_0_0_20px_rgba(34,197,94,0.04)]
            "
          />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            relative
            mt-5

            text-[14px]
            font-extrabold
            tracking-[-0.3px]

            text-[var(--color-text-primary)]
          "
        >
          {step.title}
        </h3>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            relative
            mt-2

            text-[10px]
            font-medium
            leading-[1.65]

            text-[var(--color-text-secondary)]
          "
        >
          {step.description}
        </p>

        {/* =================================================
            BOTTOM ACTIVE INDICATOR
        ================================================= */}

        <div
          className="
            mt-5
            h-[3px]
            w-8

            rounded-full

            bg-[var(--color-primary)]

            opacity-40

            transition-all
            duration-300

            group-hover:w-full
            group-hover:opacity-100
          "
        />
      </div>

      {/* =================================================
          MOBILE CONNECTOR
      ================================================= */}

      {index !== total - 1 && (
        <div
          className="
            absolute
            -bottom-4
            left-1/2
            z-20
            flex
            -translate-x-1/2
            items-center
            justify-center

            md:hidden
          "
        >
          <ArrowRight
            size={15}
            className="
              rotate-90
              text-[var(--color-primary)]
            "
          />
        </div>
      )}
    </div>
  );
}

export default WorkingSection;