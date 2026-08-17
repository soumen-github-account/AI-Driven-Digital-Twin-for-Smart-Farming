import {
  Droplets,
  Leaf,
  Thermometer,
} from "lucide-react";

function SoilInsightCard({
  title,
  value,
  status,
  type,
  data,
}) {
  const icons = {
    water: Droplets,
    ph: Droplets,
    temperature: Thermometer,
    carbon: Leaf,
  };

  const Icon = icons[type] || Leaf;

  const iconClass =
    type === "temperature"
      ? "text-orange-500 bg-orange-500/10"
      : "text-[var(--color-primary)] bg-[var(--color-primary)]/10";

  const points = createPoints(data);

  return (
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

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <div
              className={`
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                ${iconClass}
              `}
            >
              <Icon size={14} strokeWidth={1.8} />
            </div>

            <p
              className="
                truncate
                text-[9px]
                font-semibold
              "
            >
              {title}
            </p>

          </div>

          <h3
            className="
              mt-3
              text-[18px]
              font-extrabold
              tracking-[-0.5px]
            "
          >
            {value}
          </h3>

          <p
            className="
              mt-1
              text-[8px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            {status}
          </p>

        </div>

        {/* Sparkline */}

        <svg
          viewBox="0 0 120 50"
          className="h-[50px] w-[105px] shrink-0"
          preserveAspectRatio="none"
        >

          <defs>
            <linearGradient
              id={`soil-gradient-${title}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="currentColor"
                stopOpacity="0.16"
              />

              <stop
                offset="100%"
                stopColor="currentColor"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <polygon
            points={`0,50 ${points} 120,50`}
            fill={`url(#soil-gradient-${title})`}
            className="text-[var(--color-primary)]"
          />

          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-primary)]"
          />

        </svg>

      </div>

    </div>
  );
}

function createPoints(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);

  return data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 120;

      const normalized =
        max === min
          ? 0.5
          : (value - min) / (max - min);

      const y = 40 - normalized * 28;

      return `${x},${y}`;
    })
    .join(" ");
}

export default SoilInsightCard;