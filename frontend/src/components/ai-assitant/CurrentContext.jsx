import {
  ChevronUp,
  CloudSun,
  Droplets,
  Leaf,
  Radio,
  Sprout,
  Thermometer,
} from "lucide-react";

function ContextCard({ title, children }) {
  return (
    <div
      className="
        rounded-[16px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_2px_10px_rgba(0,0,0,0.025)]
      "
    >
      <h3 className="text-[12px] font-bold">
        {title}
      </h3>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}

function CurrentContext() {
  return (
    <div
      className="
        sticky
        top-[80px]
        space-y-3
      "
    >

      {/* ================================
          HEADER
      ================================= */}

      <div className="flex items-center justify-between px-1">
        <h2 className="text-[14px] font-bold">
          Current Context
        </h2>

        <ChevronUp size={16} />
      </div>

      {/* ================================
          FARM
      ================================= */}

      <ContextCard title="Current Farm">
        <div className="flex gap-3">

          <div
            className="
              h-[54px]
              w-[64px]
              shrink-0
              overflow-hidden
              rounded-xl
              bg-[var(--color-surface-secondary)]
            "
          >
            <img
              src="/images/farm.jpg"
              alt="Green Valley Farm"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-bold">
              Green Valley Farm
            </p>

            <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
              West Bengal, India
            </p>

            <p className="mt-1 text-[10px] font-medium">
              245.6 ha
            </p>
          </div>

        </div>

        <button
          className="
            mt-4
            text-[10px]
            font-semibold
            text-[var(--color-primary)]
          "
        >
          View Farm →
        </button>
      </ContextCard>

      {/* ================================
          CROP
      ================================= */}

      <ContextCard title="Current Crop">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-[65px]
              w-[55px]
              items-center
              justify-center
              rounded-xl
              bg-[var(--color-primary)]/5
              text-[var(--color-primary)]
            "
          >
            <Sprout size={35} strokeWidth={1.5} />
          </div>

          <div>
            <p className="text-[12px] font-bold">
              Rice (Paddy)
            </p>

            <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
              Variety: IR-64
            </p>

            <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
              Growth Stage: Tillering
            </p>

            <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
              (32 Days)
            </p>
          </div>

        </div>

        <button className="mt-3 text-[10px] font-semibold text-[var(--color-primary)]">
          View Crop Details →
        </button>

      </ContextCard>

      {/* ================================
          WEATHER
      ================================= */}

      <ContextCard title="Weather (Now)">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-orange-400/10
              text-orange-500
            "
          >
            <CloudSun size={29} strokeWidth={1.6} />
          </div>

          <div>
            <p className="text-[18px] font-bold">
              29°C
            </p>

            <p className="text-[10px] text-[var(--color-text-secondary)]">
              Partly Cloudy
            </p>
          </div>

        </div>

        <div className="mt-4 space-y-2">

          <ContextRow
            icon={Droplets}
            label="Humidity"
            value="65%"
          />

          <ContextRow
            icon={Radio}
            label="Wind"
            value="12 km/h"
          />

          <ContextRow
            icon={Droplets}
            label="Rainfall"
            value="2.4 mm"
          />

        </div>

        <button className="mt-4 text-[10px] font-semibold text-[var(--color-primary)]">
          View Full Forecast →
        </button>

      </ContextCard>

      {/* ================================
          SOIL
      ================================= */}

      <ContextCard title="Soil (Field 2)">

        <div className="space-y-3">

          <ContextRow
            icon={Droplets}
            label="Moisture"
            value="32% (Low)"
          />

          <ContextRow
            icon={Sprout}
            label="pH"
            value="6.8"
          />

          <ContextRow
            icon={Leaf}
            label="Organic Carbon"
            value="2.3%"
          />

          <ContextRow
            icon={Sprout}
            label="Soil Type"
            value="Clay Loam"
          />

        </div>

        <button className="mt-4 text-[10px] font-semibold text-[var(--color-primary)]">
          View Soil Details →
        </button>

      </ContextCard>

      {/* ================================
          DIGITAL TWIN
      ================================= */}

      <ContextCard title="Digital Twin Status">

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-text-secondary)]">
            Status
          </span>

          <span
            className="
              rounded-full
              bg-[var(--color-primary)]/10
              px-2
              py-1
              text-[8px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            Live & Synced
          </span>
        </div>

        <div className="mt-4 space-y-3">

          <ContextRow
            label="Last Updated"
            value="2 min ago"
          />

          <ContextRow
            label="Data Freshness"
            value="Excellent"
          />

          <ContextRow
            label="Sensors Online"
            value="28 / 30"
          />

        </div>

        <button className="mt-4 text-[10px] font-semibold text-[var(--color-primary)]">
          Open Digital Twin →
        </button>

      </ContextCard>

    </div>
  );
}

function ContextRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-2">

      {Icon && (
        <Icon
          size={14}
          className="shrink-0 text-[var(--color-primary)]"
          strokeWidth={1.7}
        />
      )}

      <span className="min-w-0 flex-1 text-[10px] text-[var(--color-text-secondary)]">
        {label}
      </span>

      <span className="text-right text-[10px] font-semibold text-[var(--color-text-primary)]">
        {value}
      </span>

    </div>
  );
}

export default CurrentContext;