import {
  Droplets,
  CalendarDays,
  Clock3,
  Leaf,
  Sparkles,
} from "lucide-react";

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
        transition duration-200
        hover:-translate-y-[1px]
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]
      "
    >
      <div className="flex items-center gap-2">

        <div
          className="
            flex h-8 w-8 items-center justify-center
            rounded-full
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <Icon size={17} strokeWidth={1.9} />
        </div>

        <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">
          {title}
        </span>
      </div>

      <div className="mt-4">
        {value && (
          <div className="text-[27px] font-bold tracking-[-0.8px] text-[var(--color-text-primary)]">
            {value}
          </div>
        )}

        {subtitle && (
          <div className="mt-1 text-[11px] font-medium text-[var(--color-text-muted)]">
            {subtitle}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

function IrrigationStatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">

      {/* Moisture */}
      <StatCard
        icon={Droplets}
        title="Current Soil Moisture"
        value="32%"
        subtitle="Moderate"
      >
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-text-muted)]">
            Optimal Range: 30% – 60%
          </span>

          <div className="relative h-14 w-14 rounded-full border-[7px] border-[var(--color-border)]">
            <div
              className="
                absolute inset-[-7px]
                rounded-full
                border-[7px]
                border-transparent
                border-t-[var(--color-primary)]
                border-r-[var(--color-primary)]
                rotate-[-25deg]
              "
            />
          </div>
        </div>
      </StatCard>

      {/* Next irrigation */}
      <StatCard
        icon={CalendarDays}
        title="Next Irrigation"
      >
        <div className="mt-4">
          <div className="text-[17px] font-semibold text-[var(--color-text-primary)]">
            Tomorrow
          </div>

          <div className="mt-1 text-[18px] font-bold text-[var(--color-primary)]">
            6:00 AM
          </div>

          <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
            May 14, 2025
          </p>
        </div>
      </StatCard>

      {/* Duration */}
      <StatCard
        icon={Clock3}
        title="Estimated Duration"
        value="2.5 hours"
        subtitle="Based on current conditions"
      >
        <div className="mt-5 h-8 overflow-hidden rounded-full">
          <div className="h-full w-full bg-gradient-to-t from-blue-50 to-transparent" />
        </div>
      </StatCard>

      {/* Water used */}
      <StatCard
        icon={Droplets}
        title="Water Used This Week"
        value="18.6 m³"
      >
        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[var(--color-primary)]">
          ↓ 8%
          <span className="font-normal text-[var(--color-text-muted)]">
            vs last week
          </span>
        </div>

        <div className="mt-4 flex h-8 items-end gap-1.5">
          {[50, 70, 60, 75, 52, 45, 90].map((height, index) => (
            <div
              key={index}
              className="
                flex-1 rounded-t-sm
                bg-[var(--color-primary)]/15
              "
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </StatCard>

      {/* Efficiency */}
      <StatCard
        icon={Leaf}
        title="Water Efficiency Score"
        value="82/100"
        subtitle="Excellent"
      >
        <div className="mt-2 text-[10px] font-semibold text-[var(--color-primary)]">
          ↑ 6 pts vs last week
        </div>
      </StatCard>

      {/* AI */}
      <StatCard
        icon={Sparkles}
        title="AI Recommendation"
      >
        <div className="mt-3">
          <p className="text-[13px] font-semibold leading-5 text-[var(--color-text-primary)]">
            Set irrigation for Field 2 tomorrow morning.
          </p>

          <p className="mt-2 text-[10px] leading-4 text-[var(--color-text-secondary)]">
            Expected rainfall later in the day may reduce water requirement.
          </p>

          <button className="mt-3 text-[11px] font-semibold text-[var(--color-primary)]">
            View Details →
          </button>
        </div>
      </StatCard>

    </div>
  );
}

export default IrrigationStatCards;