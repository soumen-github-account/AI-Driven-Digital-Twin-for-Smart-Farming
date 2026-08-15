import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CloudSun,
  Droplets,
  Eye,
  Layers3,
  Leaf,
  Map,
  Maximize2,
  Minus,
  Plus,
  RefreshCw,
  Sprout,
  Thermometer,
  TrendingUp,
  Waves,
  Zap,
  Wheat
} from "lucide-react";

function Showcase() {
  return (
    <section
      id="digital-twin"
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
          left-[10%]
          top-[20%]
          h-[350px]
          w-[350px]
          rounded-full
          bg-[var(--color-primary)]
          opacity-[0.035]
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[10%]
          right-[5%]
          h-[300px]
          w-[300px]
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
          overflow-hidden
          rounded-[30px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          px-5
          py-10
          shadow-[0_20px_70px_rgba(0,0,0,0.05)]
          transition-all
          duration-500
          sm:rounded-[36px]
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
            <Layers3 size={13} />

            Your Farm. Digitally Connected.
          </div>

          <h2
            className="
              text-[30px]
              font-black
              leading-[1.05]
              tracking-[-1.5px]
              text-[var(--color-text-primary)]
              sm:text-[38px]
              lg:text-[44px]
            "
          >
            Digital
            <span className="text-[var(--color-primary)]">
              {" "}
              Twin
            </span>{" "}
            Showcase
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-[650px]
              text-[13px]
              font-medium
              leading-6
              text-[var(--color-text-secondary)]
              sm:text-[14px]
              sm:leading-7
            "
          >
            See your entire farm as a living digital model. Monitor
            crops, soil, water and field conditions from one intelligent
            interface.
          </p>
        </div>

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[1.45fr_1fr]
            lg:gap-5
          "
        >
          {/* =================================================
              LEFT — FARM MAP
          ================================================= */}

          <div
            className="
              relative
              min-h-[470px]
              overflow-hidden
              rounded-[24px]
              border
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]
            "
          >
            {/* Map background */}

            <div
              className="
                absolute
                inset-0
                overflow-hidden
              "
            >
              {/* Farm base */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[var(--color-surface-secondary)]
                "
              />

              {/* Fields */}

              <FarmField
                className="
                  left-[8%]
                  top-[18%]
                  h-[28%]
                  w-[26%]
                  rotate-[-5deg]
                "
                type="green"
              />

              <FarmField
                className="
                  left-[35%]
                  top-[12%]
                  h-[31%]
                  w-[24%]
                  rotate-[4deg]
                "
                type="green"
              />

              <FarmField
                className="
                  left-[61%]
                  top-[18%]
                  h-[25%]
                  w-[27%]
                  rotate-[-2deg]
                "
                type="green"
              />

              <FarmField
                className="
                  left-[12%]
                  top-[48%]
                  h-[30%]
                  w-[25%]
                  rotate-[3deg]
                "
                type="yellow"
              />

              <FarmField
                className="
                  left-[39%]
                  top-[46%]
                  h-[28%]
                  w-[27%]
                  rotate-[-4deg]
                "
                type="green"
              />

              <FarmField
                className="
                  left-[68%]
                  top-[47%]
                  h-[30%]
                  w-[21%]
                  rotate-[5deg]
                "
                type="green"
              />

              {/* Roads */}

              <div
                className="
                  absolute
                  left-[-5%]
                  top-[68%]
                  h-[7px]
                  w-[115%]
                  rotate-[-14deg]
                  rounded-full
                  bg-[var(--color-border)]
                "
              />

              <div
                className="
                  absolute
                  left-[48%]
                  top-[-10%]
                  h-[120%]
                  w-[6px]
                  rotate-[16deg]
                  rounded-full
                  bg-[var(--color-border)]
                "
              />

              {/* Water */}

              <div
                className="
                  absolute
                  bottom-[10%]
                  left-[45%]
                  h-[58px]
                  w-[115px]
                  rotate-[-8deg]
                  rounded-[50%]
                  border
                  border-[var(--color-water)]/30
                  bg-[var(--color-water)]/15
                "
              />

              {/* AI Grid */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-40
                  [background-image:linear-gradient(var(--color-primary)/8%_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)/8%_1px,transparent_1px)]
                  [background-size:38px_38px]
                "
              />

              {/* AI connection points */}

              <MapPoint className="left-[28%] top-[30%]" />
              <MapPoint className="left-[52%] top-[25%]" />
              <MapPoint className="left-[72%] top-[38%]" />
              <MapPoint className="left-[43%] top-[58%]" />
              <MapPoint className="left-[77%] top-[63%]" />
            </div>

            {/* =================================================
                MAP TOP BAR
            ================================================= */}

            <div
              className="
                absolute
                left-4
                right-4
                top-4
                z-10
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-[13px]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]/90
                  px-3
                  py-2
                  shadow-sm
                  backdrop-blur-xl
                "
              >
                <Map
                  size={14}
                  className="text-[var(--color-primary)]"
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  Digital Farm Twin
                </span>

                <span
                  className="
                    rounded-full
                    bg-[var(--color-success)]/10
                    px-2
                    py-0.5
                    text-[8px]
                    font-bold
                    text-[var(--color-success)]
                  "
                >
                  LIVE
                </span>
              </div>

              <button
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]/90
                  text-[var(--color-text-secondary)]
                  backdrop-blur-xl
                  transition
                  hover:text-[var(--color-primary)]
                "
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* =================================================
                LAYER PANEL
            ================================================= */}

            <div
              className="
                absolute
                left-4
                top-[78px]
                z-10
                w-[125px]
                rounded-[15px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]/90
                p-2.5
                shadow-sm
                backdrop-blur-xl
              "
            >
              <p
                className="
                  mb-2
                  px-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[var(--color-text-muted)]
                "
              >
                Layers
              </p>

              <LayerItem
                icon={Map}
                label="Fields"
                active
              />

              <LayerItem
                icon={Droplets}
                label="Soil Moisture"
              />

              <LayerItem
                icon={Leaf}
                label="Crop Health"
              />

              <LayerItem
                icon={Thermometer}
                label="Temperature"
              />

              <LayerItem
                icon={Activity}
                label="Vegetation"
              />
            </div>

            {/* =================================================
                MAP CONTROLS
            ================================================= */}

            <div
              className="
                absolute
                bottom-4
                right-4
                z-10
                flex
                overflow-hidden
                rounded-[11px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]/90
                shadow-sm
                backdrop-blur-xl
              "
            >
              <MapControl icon={Plus} />

              <MapControl icon={Minus} />

              <MapControl icon={RefreshCw} />
            </div>

            {/* =================================================
                MAP STATUS
            ================================================= */}

            <div
              className="
                absolute
                bottom-4
                left-4
                z-10
                flex
                items-center
                gap-2
                rounded-[12px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]/90
                px-3
                py-2
                shadow-sm
                backdrop-blur-xl
              "
            >
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
                  text-[8px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                Real-time farm data active
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT — AI DASHBOARD
          ================================================= */}

          <div className="flex flex-col gap-4">
            {/* Health / Yield / Water */}

            <div
              className="
                grid
                grid-cols-3
                gap-3
              "
            >
              <MetricCard
                icon={Leaf}
                title="Crop Health"
                value="87"
                suffix="%"
                status="Good"
              />

              <MetricCard
                icon={Wheat}
                title="Yield Prediction"
                value="4.2"
                suffix=" t/ha"
                status="+12%"
              />

              <MetricCard
                icon={Droplets}
                title="Water Status"
                value="68"
                suffix="%"
                status="Optimal"
              />
            </div>

            {/* =================================================
                RISK ALERTS
            ================================================= */}

            <div
              className="
                rounded-[21px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface-secondary)]
                p-4
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-[11px]
                      font-extrabold
                      text-[var(--color-text-primary)]
                    "
                  >
                    Risk Alerts
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      font-medium
                      text-[var(--color-text-muted)]
                    "
                  >
                    AI detected conditions
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    bg-[var(--color-danger)]/10
                    px-2
                    py-1
                    text-[8px]
                    font-bold
                    text-[var(--color-danger)]
                  "
                >
                  3 Alerts
                </span>
              </div>

              <RiskRow
                icon={AlertTriangle}
                title="High Disease Risk"
                value="High"
                danger
              />

              <RiskRow
                icon={Droplets}
                title="Water Stress"
                value="Medium"
                warning
              />

              <RiskRow
                icon={Sprout}
                title="Pest Risk"
                value="Low"
              />
            </div>

            {/* =================================================
                FARM INSIGHTS
            ================================================= */}

            <div
              className="
                rounded-[21px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface-secondary)]
                p-4
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <p
                  className="
                    text-[11px]
                    font-extrabold
                    text-[var(--color-text-primary)]
                  "
                >
                  Farm Insights
                </p>

                <Eye
                  size={14}
                  className="text-[var(--color-text-muted)]"
                />
              </div>

              <InsightRow
                icon={Droplets}
                title="Optimal time for irrigation"
                text="Tomorrow, 6:00 AM"
              />

              <InsightRow
                icon={Sprout}
                title="Fertilizer recommendation"
                text="Apply 80kg/acre in Field 2"
              />

              <InsightRow
                icon={TrendingUp}
                title="Expected harvest"
                text="In 25–30 days"
              />
            </div>

            {/* =================================================
                AI SCORE
            ================================================= */}

            <div
              className="
                flex
                flex-1
                items-center
                justify-between
                rounded-[21px]
                border
                border-[var(--color-primary)]/20
                bg-[var(--color-primary)]/5
                p-5
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--color-primary)]
                  "
                >
                  AI Farm Score
                </p>

                <p
                  className="
                    mt-1
                    text-[28px]
                    font-black
                    tracking-[-1px]
                    text-[var(--color-text-primary)]
                  "
                >
                  87
                  <span
                    className="
                      ml-1
                      text-[11px]
                      font-bold
                      text-[var(--color-text-muted)]
                    "
                  >
                    / 100
                  </span>
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  Farm performing above average
                </p>
              </div>

              {/* Circular score */}

              <div
                className="
                  relative
                  flex
                  h-[82px]
                  w-[82px]
                  items-center
                  justify-center
                  rounded-full
                  border-[6px]
                  border-[var(--color-primary)]/15
                "
              >
                <div
                  className="
                    absolute
                    inset-[-6px]
                    rounded-full
                    border-[6px]
                    border-transparent
                    border-l-[var(--color-primary)]
                    border-t-[var(--color-primary)]
                    rotate-[-25deg]
                  "
                />

                <Leaf
                  size={22}
                  className="text-[var(--color-primary)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-4
            rounded-[21px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-secondary)]
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
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
                rounded-[13px]
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
              "
            >
              <Zap size={18} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-extrabold
                  text-[var(--color-text-primary)]
                "
              >
                One intelligent view of your entire farm.
              </p>

              <p
                className="
                  mt-0.5
                  text-[8px]
                  font-medium
                  text-[var(--color-text-secondary)]
                "
              >
                Monitor. Predict. Decide. Grow.
              </p>
            </div>
          </div>

          <a
            href="#get-started"
            className="
              inline-flex
              h-9
              items-center
              justify-center
              gap-2
              rounded-[10px]
              bg-[var(--color-primary)]
              px-4
              text-[10px]
              font-bold
              text-white
              shadow-[0_5px_18px_rgba(34,197,94,0.18)]
              transition-all
              duration-200
              hover:bg-[var(--color-primary-hover)]
              hover:-translate-y-0.5
            "
          >
            Explore Digital Twin

            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FARM FIELD
========================================================= */

function FarmField({ className, type = "green" }) {
  return (
    <div
      className={`
        absolute
        overflow-hidden
        rounded-[13px]
        border
        border-[var(--color-primary)]/30
        ${className}
      `}
    >
      <div
        className={`
          absolute
          inset-0
          ${
            type === "yellow"
              ? "bg-[var(--color-warning)]/15"
              : "bg-[var(--color-primary)]/15"
          }
        `}
      />

      <div
        className="
          absolute
          inset-0
          opacity-60
          [background-image:repeating-linear-gradient(90deg,transparent,transparent_8px,var(--color-primary)/15%_9px)]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--color-primary)]
          shadow-[0_0_12px_var(--color-primary)]
        "
      />
    </div>
  );
}

/* =========================================================
   MAP POINT
========================================================= */

function MapPoint({ className }) {
  return (
    <div
      className={`
        absolute
        z-10
        ${className}
      `}
    >
      <div
        className="
          h-3
          w-3
          animate-pulse
          rounded-full
          border-2
          border-white
          bg-[var(--color-primary)]
          shadow-[0_0_14px_var(--color-primary)]
        "
      />
    </div>
  );
}

/* =========================================================
   LAYER ITEM
========================================================= */

function LayerItem({ icon: Icon, label, active = false }) {
  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-[8px]
        px-2
        py-1.5
        ${
          active
            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
            : "text-[var(--color-text-secondary)]"
        }
      `}
    >
      <Icon size={11} />

      <span
        className="
          text-[8px]
          font-semibold
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   MAP CONTROL
========================================================= */

function MapControl({ icon: Icon }) {
  return (
    <button
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        border-r
        border-[var(--color-border)]
        text-[var(--color-text-secondary)]
        transition
        last:border-r-0
        hover:text-[var(--color-primary)]
      "
    >
      <Icon size={13} />
    </button>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  icon: Icon,
  title,
  value,
  suffix,
  status,
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface-secondary)]
        p-3
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[var(--color-primary)]/30
      "
    >
      <div className="flex items-center justify-between">
        <Icon
          size={14}
          className="text-[var(--color-primary)]"
        />

        <ArrowUpRight
          size={11}
          className="text-[var(--color-text-muted)]"
        />
      </div>

      <p
        className="
          mt-3
          text-[8px]
          font-semibold
          text-[var(--color-text-secondary)]
        "
      >
        {title}
      </p>

      <div className="mt-1">
        <span
          className="
            text-[20px]
            font-black
            tracking-[-1px]
            text-[var(--color-text-primary)]
          "
        >
          {value}
        </span>

        <span
          className="
            ml-0.5
            text-[8px]
            font-bold
            text-[var(--color-text-muted)]
          "
        >
          {suffix}
        </span>
      </div>

      <p
        className="
          mt-1
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

/* =========================================================
   RISK ROW
========================================================= */

function RiskRow({
  icon: Icon,
  title,
  value,
  danger,
  warning,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-t
        border-[var(--color-border)]
        py-2.5
        first:border-t-0
      "
    >
      <div className="flex items-center gap-2">
        <Icon
          size={13}
          className={
            danger
              ? "text-[var(--color-danger)]"
              : warning
                ? "text-[var(--color-warning)]"
                : "text-[var(--color-success)]"
          }
        />

        <span
          className="
            text-[9px]
            font-semibold
            text-[var(--color-text-secondary)]
          "
        >
          {title}
        </span>
      </div>

      <span
        className={`
          text-[8px]
          font-bold
          ${
            danger
              ? "text-[var(--color-danger)]"
              : warning
                ? "text-[var(--color-warning)]"
                : "text-[var(--color-success)]"
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   INSIGHT ROW
========================================================= */

function InsightRow({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        border-t
        border-[var(--color-border)]
        py-2.5
        first:border-t-0
      "
    >
      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-[9px]
          bg-[var(--color-surface)]
          text-[var(--color-primary)]
        "
      >
        <Icon size={13} />
      </div>

      <div className="min-w-0">
        <p
          className="
            truncate
            text-[9px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            text-[8px]
            font-medium
            text-[var(--color-text-muted)]
          "
        >
          {text}
        </p>
      </div>

      <ArrowUpRight
        size={12}
        className="
          ml-auto
          shrink-0
          text-[var(--color-text-muted)]
        "
      />
    </div>
  );
}

export default Showcase;