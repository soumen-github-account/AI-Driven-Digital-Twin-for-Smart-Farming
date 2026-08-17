import {
  Sprout,
  Flower2,
  Wheat,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

const stages = [
  {
    title: "Planting",
    date: "10 Mar 2025",
    icon: Sprout,
    completed: true,
  },
  {
    title: "Germination",
    date: "18 Mar 2025",
    icon: Sprout,
    completed: true,
  },
  {
    title: "Tillering",
    date: "5 Apr 2025",
    icon: Wheat,
    current: true,
  },
  {
    title: "Panicle Initiation",
    date: "20 May 2025",
    icon: Flower2,
  },
  {
    title: "Flowering",
    date: "10 Jun 2025",
    icon: Flower2,
  },
  {
    title: "Grain Filling",
    date: "25 Jun 2025",
    icon: Wheat,
  },
  {
    title: "Harvest",
    date: "10 Sep 2025",
    icon: Wheat,
  },
];

function CropGrowthTimeline() {
  return (
    <div
      className="
        min-h-[320px]
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-bold">
          Crop Growth Timeline
        </h2>

        <Info
          size={15}
          className="text-[var(--color-text-muted)]"
        />
      </div>

      {/* Timeline */}

      <div className="mt-7 overflow-x-auto pb-2">
        <div className="relative min-w-[680px]">
          {/* Line */}

          <div
            className="
              absolute
              left-[28px]
              right-[28px]
              top-[16px]
              h-px
              bg-[var(--color-border)]
            "
          />

          <div className="relative flex justify-between">
            {stages.map((stage) => {
              const Icon = stage.icon;

              return (
                <div
                  key={stage.title}
                  className="
                    flex
                    w-[80px]
                    flex-col
                    items-center
                    text-center
                  "
                >
                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      ${
                        stage.current
                          ? `
                            border-[var(--color-primary)]
                            bg-[var(--color-primary)]
                            text-white
                            shadow-[0_4px_12px_rgba(22,163,74,0.2)]
                          `
                          : stage.completed
                          ? `
                            border-[var(--color-primary)]/20
                            bg-[var(--color-primary)]/10
                            text-[var(--color-primary)]
                          `
                          : `
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            text-[var(--color-text-muted)]
                          `
                      }
                    `}
                  >
                    <Icon size={14} />
                  </div>

                  <p
                    className="
                      mt-2
                      text-[8px]
                      font-semibold
                      leading-tight
                    "
                  >
                    {stage.title}
                  </p>

                  <p
                    className="
                      mt-1
                      whitespace-nowrap
                      text-[7px]
                      text-[var(--color-text-muted)]
                    "
                  >
                    {stage.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Stage */}

      <div className="mt-4">
        <p className="text-[10px] font-semibold">
          Current Stage:
          <span className="ml-1 text-[var(--color-primary)]">
            Tillering (Stage 3 of 7)
          </span>
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
            rounded-xl
            bg-[var(--color-surface-secondary)]
            p-3
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
              bg-[var(--color-primary)]/10
              text-[var(--color-primary)]
            "
          >
            <CheckCircle2 size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-semibold">
              Your crop is in good condition and progressing well.
            </p>

            <p className="mt-1 text-[8px] text-[var(--color-text-secondary)]">
              Maintain optimal irrigation and nutrition for best results.
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-[9px] font-bold text-[var(--color-primary)]">
              45 days
            </p>

            <p className="text-[7px] text-[var(--color-text-muted)]">
              to next stage
            </p>
          </div>
        </div>

        <button
          className="
            mt-3
            flex
            items-center
            gap-1
            text-[9px]
            font-bold
            text-[var(--color-primary)]
          "
        >
          View Growth Details
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

export default CropGrowthTimeline;