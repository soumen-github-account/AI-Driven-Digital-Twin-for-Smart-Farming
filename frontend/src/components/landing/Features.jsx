import {
  Activity,
  Bug,
  CloudSun,
  Droplets,
  Leaf,
  LineChart,
  ScanLine,
  Sprout,
  TrendingUp,
  Wheat,
} from "lucide-react";

const features = [
  {
    title: "Crop Health",
    subtitle: "Monitoring",
    description:
      "Track crop health continuously using AI-powered field analysis.",
    icon: Leaf,
    color: "primary",
    stat: "87%",
    statLabel: "Health Score",
  },
  {
    title: "Disease",
    subtitle: "Detection",
    description:
      "Detect early signs of crop diseases before they spread across fields.",
    icon: ScanLine,
    color: "danger",
    stat: "95%",
    statLabel: "Detection",
  },
  {
    title: "Weather",
    subtitle: "Intelligence",
    description:
      "Understand weather patterns and their impact on your crops.",
    icon: CloudSun,
    color: "water",
    stat: "32°C",
    statLabel: "Today",
  },
  {
    title: "Irrigation",
    subtitle: "Optimization",
    description:
      "Optimize irrigation using soil moisture and crop requirements.",
    icon: Droplets,
    color: "water",
    stat: "68%",
    statLabel: "Water Level",
  },
  {
    title: "Soil",
    subtitle: "Intelligence",
    description:
      "Monitor soil conditions and discover nutrient requirements.",
    icon: Sprout,
    color: "soil",
    stat: "Optimal",
    statLabel: "Condition",
  },
  {
    title: "Yield",
    subtitle: "Prediction",
    description:
      "Predict expected crop yield using historical and real-time data.",
    icon: Wheat,
    color: "primary",
    stat: "4.2",
    statLabel: "Tons / ha",
  },
  {
    title: "Pest",
    subtitle: "Prediction",
    description:
      "Identify pest risks early and take preventive action.",
    icon: Bug,
    color: "warning",
    stat: "Low",
    statLabel: "Risk Level",
  },
  {
    title: "Market / Profit",
    subtitle: "Prediction",
    description:
      "Estimate market trends and maximize your farming profitability.",
    icon: TrendingUp,
    color: "ai",
    stat: "+18%",
    statLabel: "Profit Potential",
  },
];

function Features() {
  return (
    <section
      id="ai-features"
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
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[20%]
          h-[400px]
          w-[600px]
          -translate-x-1/2

          rounded-full

          bg-[var(--color-primary)]

          opacity-[0.025]

          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-150px]
          right-[-100px]

          h-[350px]
          w-[350px]

          rounded-full

          bg-[var(--color-ai)]

          opacity-[0.025]

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
            HEADER
        =================================================== */}

        <div className="mx-auto max-w-[720px] text-center">
          {/* Badge */}

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
            <Activity
              size={13}
              strokeWidth={2.4}
            />

            Intelligent Farming Platform
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
            Core
            <span className="text-[var(--color-primary)]">
              {" "}
              AI Features
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-[620px]

              text-[13px]
              font-medium
              leading-6

              text-[var(--color-text-secondary)]

              sm:text-[14px]
              sm:leading-7
            "
          >
            Farm Intel AI combines computer vision, machine learning,
            satellite data and real-time sensors to give your farm
            intelligent insights.
          </p>
        </div>

        {/* ===================================================
            FEATURE GRID
        =================================================== */}

        <div
          className="
            mt-10

            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2
            sm:gap-4

            lg:grid-cols-4
          "
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* ===================================================
            BOTTOM AI STRIP
        =================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-1
            gap-3

            sm:grid-cols-3
          "
        >
          <MiniInsight
            icon={LineChart}
            title="Predictive Analytics"
            text="Turn farm data into future insights."
          />

          <MiniInsight
            icon={ScanLine}
            title="Computer Vision"
            text="Analyze crops directly from images."
          />

          <MiniInsight
            icon={Activity}
            title="Real-Time Monitoring"
            text="Stay updated with your farm 24/7."
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <div
      className="
        group
        relative
        overflow-hidden

        min-h-[220px]

        rounded-[22px]

        border
        border-[var(--color-border)]

        bg-[var(--color-surface-secondary)]

        p-5

        transition-all
        duration-300

        hover:-translate-y-1.5
        hover:border-[var(--color-primary)]/35

        hover:shadow-[0_16px_35px_rgba(0,0,0,0.07)]
      "
    >
      {/* =================================================
          TOP GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-40px]
          top-[-40px]

          h-32
          w-32

          rounded-full

          bg-[var(--color-primary)]

          opacity-[0.05]

          blur-3xl

          transition-all
          duration-500

          group-hover:scale-150
          group-hover:opacity-[0.09]
        "
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="relative flex items-start justify-between">
        {/* Icon */}

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-[16px]

            border
            border-[var(--color-primary)]/15

            bg-[var(--color-surface)]

            text-[var(--color-primary)]

            shadow-[0_4px_15px_rgba(0,0,0,0.03)]

            transition-all
            duration-300

            group-hover:scale-105
            group-hover:bg-[var(--color-primary)]/10
          "
        >
          <Icon
            size={23}
            strokeWidth={1.9}
          />
        </div>

        {/* Number */}

        <span
          className="
            text-[9px]
            font-black
            tracking-[1px]

            text-[var(--color-text-muted)]
          "
        >
          0{index + 1}
        </span>
      </div>

      {/* =================================================
          TITLE
      ================================================= */}

      <div className="relative mt-5">
        <h3
          className="
            text-[14px]
            font-extrabold
            tracking-[-0.3px]

            text-[var(--color-text-primary)]
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            mt-0.5

            text-[10px]
            font-semibold

            text-[var(--color-primary)]
          "
        >
          {feature.subtitle}
        </p>
      </div>

      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <p
        className="
          relative
          mt-3

          text-[10px]
          font-medium
          leading-[1.65]

          text-[var(--color-text-secondary)]
        "
      >
        {feature.description}
      </p>

      {/* =================================================
          STAT
      ================================================= */}

      <div
        className="
          relative
          mt-5

          flex
          items-end
          justify-between

          border-t
          border-[var(--color-border)]

          pt-3
        "
      >
        <div>
          <p
            className="
              text-[18px]
              font-black
              leading-none

              text-[var(--color-text-primary)]
            "
          >
            {feature.stat}
          </p>

          <p
            className="
              mt-1

              text-[8px]
              font-medium

              text-[var(--color-text-muted)]
            "
          >
            {feature.statLabel}
          </p>
        </div>

        {/* Arrow */}

        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center

            rounded-full

            bg-[var(--color-surface)]

            text-[var(--color-primary)]

            opacity-0

            transition-all
            duration-300

            group-hover:translate-x-0.5
            group-hover:opacity-100
          "
        >
          <TrendingUp
            size={13}
            strokeWidth={2.3}
          />
        </div>
      </div>

      {/* =================================================
          ACTIVE LINE
      ================================================= */}

      <div
        className="
          absolute
          bottom-0
          left-5
          right-5

          h-[2px]

          origin-left
          scale-x-0

          rounded-full

          bg-[var(--color-primary)]

          transition-transform
          duration-300

          group-hover:scale-x-100
        "
      />
    </div>
  );
}

/* =========================================================
   MINI INSIGHT
========================================================= */

function MiniInsight({ icon: Icon, title, text }) {
  return (
    <div
      className="
        group

        flex
        items-center
        gap-3

        rounded-[18px]

        border
        border-[var(--color-border)]

        bg-[var(--color-surface-secondary)]

        px-4
        py-4

        transition-all
        duration-300

        hover:border-[var(--color-primary)]/30
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          rounded-xl

          bg-[var(--color-surface)]

          text-[var(--color-primary)]
        "
      >
        <Icon
          size={17}
          strokeWidth={2}
        />
      </div>

      <div>
        <p
          className="
            text-[10px]
            font-extrabold

            text-[var(--color-text-primary)]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5

            text-[9px]
            font-medium

            text-[var(--color-text-secondary)]
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default Features;