import {
  Sprout,
  Droplets,
  Bug,
  Tractor,
  SunMedium,
} from "lucide-react";

const impacts = [
  {
    title: "Spray Conditions",
    status: "Good",
    description: "Low wind and no rain",
    icon: Sprout,
  },
  {
    title: "Field Work",
    status: "Good",
    description: "Suitable for field work",
    icon: Tractor,
  },
  {
    title: "Irrigation Need",
    status: "Low",
    description: "Rain expected tomorrow",
    icon: Droplets,
  },
  {
    title: "Disease Risk",
    status: "Moderate",
    description: "Higher humidity",
    icon: Bug,
  },
  {
    title: "Evapotranspiration",
    status: "3.2 mm/day",
    description: "Moderate",
    icon: SunMedium,
  },
];

function AgriculturalImpact() {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
      "
    >
      <h2 className="text-[13px] font-bold">
        Agricultural Impact
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">

        {impacts.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-xl
                border
                border-[var(--color-border)]
                p-3
                text-center
              "
            >
              <Icon
                size={18}
                className="mx-auto text-[var(--color-primary)]"
              />

              <p className="mt-2 text-[8px] text-[var(--color-text-muted)]">
                {item.title}
              </p>

              <p className="mt-1 text-[11px] font-bold text-[var(--color-primary)]">
                {item.status}
              </p>

              <p className="mt-1 text-[8px] leading-4 text-[var(--color-text-muted)]">
                {item.description}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default AgriculturalImpact;