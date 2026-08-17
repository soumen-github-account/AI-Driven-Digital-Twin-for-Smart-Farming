import {
  CloudSun,
  Droplets,
  Factory,
  Leaf,
  Sprout,
  Tractor,
} from "lucide-react";

const items = [
  {
    title: "Farms",
    value: "3",
    icon: Tractor,
    type: "green",
  },
  {
    title: "Fields",
    value: "18",
    icon: Factory,
    type: "green",
  },
  {
    title: "Crops",
    value: "5",
    icon: Sprout,
    type: "green",
  },
  {
    title: "Soil Health",
    value: "Good",
    icon: Leaf,
    type: "green",
  },
  {
    title: "Weather",
    value: "24°C",
    sub: "Sunny",
    icon: CloudSun,
    type: "blue",
  },
  {
    title: "Next Irrigation",
    value: "Tomorrow",
    sub: "Field 7, Field 9",
    icon: Droplets,
    type: "blue",
  },
  {
    title: "Next Operation",
    value: "Fertilization",
    sub: "Field 3, Field 6",
    icon: Factory,
    type: "green",
  },
];

function QuickOverview() {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_4px_16px_rgba(15,23,42,0.035)]
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-[var(--color-border)]
          px-4
          py-2.5
        "
      >
        <h3
          className="
            text-[10px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          Quick Overview
        </h3>
      </div>

      {/* Items */}

      <div
        className="
          grid
          grid-cols-2

          sm:grid-cols-3

          lg:grid-cols-4

          xl:grid-cols-7
        "
      >
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`
                flex
                min-h-[72px]
                items-center
                gap-2.5
                px-4
                py-3

                ${
                  index !== items.length - 1
                    ? "border-b border-[var(--color-border)] xl:border-b-0 xl:border-r"
                    : ""
                }

                ${
                  index % 2 !== 1
                    ? ""
                    : "sm:border-r-0"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  ${
                    item.type === "blue"
                      ? "bg-[var(--color-water)]/10 text-[var(--color-water)]"
                      : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  }
                `}
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-[8px]
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[11px]
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  {item.value}
                </p>

                {item.sub && (
                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[7px]
                      font-medium
                      text-[var(--color-text-muted)]
                    "
                  >
                    {item.sub}
                  </p>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickOverview;