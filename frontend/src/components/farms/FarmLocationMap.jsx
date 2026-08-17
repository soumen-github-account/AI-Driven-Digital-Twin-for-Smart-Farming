import {
  Expand,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";

const markers = [
  {
    top: "23%",
    left: "13%",
  },
  {
    top: "45%",
    left: "20%",
  },
  {
    top: "70%",
    left: "65%",
  },
  {
    top: "39%",
    left: "83%",
  },
];

function FarmLocationMap() {
  return (
    <section
      className="
        overflow-hidden
        rounded-[16px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_3px_14px_rgba(23,32,26,0.045)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          h-[52px]
          items-center
          justify-between
          border-b
          border-[var(--color-border)]
          px-4
        "
      >
        <h2
          className="
            text-[12px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          Farm Locations
        </h2>

        <button
          type="button"
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            text-[var(--color-text-secondary)]
            transition
            hover:bg-[var(--color-surface-secondary)]
            hover:text-[var(--color-primary)]
          "
        >
          <Expand size={14} />
        </button>
      </div>

      {/* MAP */}

      <div
        className="
          relative
          h-[410px]
          overflow-hidden
          bg-[#e7eadc]
          dark:bg-[#18231b]
        "
      >
        {/* MAP BACKGROUND */}

        <div
          className="
            absolute
            inset-0
            opacity-80
            dark:opacity-35
          "
          style={{
            backgroundImage: `
              linear-gradient(
                30deg,
                transparent 48%,
                rgba(130,150,100,.22) 49%,
                transparent 50%
              ),
              linear-gradient(
                145deg,
                transparent 48%,
                rgba(130,150,100,.18) 49%,
                transparent 50%
              )
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* ROAD / STATE LINES */}

        <div
          className="
            absolute
            left-[8%]
            top-[15%]
            h-[120%]
            w-[1px]
            rotate-[17deg]
            bg-[#c4cbb7]
            dark:bg-[#405044]
          "
        />

        <div
          className="
            absolute
            left-[45%]
            top-[-10%]
            h-[130%]
            w-[1px]
            rotate-[30deg]
            bg-[#c4cbb7]
            dark:bg-[#405044]
          "
        />

        <div
          className="
            absolute
            left-[-10%]
            top-[50%]
            h-px
            w-[130%]
            rotate-[-8deg]
            bg-[#c4cbb7]
            dark:bg-[#405044]
          "
        />

        {/* COUNTRY LABEL */}

        <div
          className="
            absolute
            left-1/2
            top-[48%]
            -translate-x-1/2
            text-[15px]
            font-semibold
            tracking-wide
            text-[#68705f]
            dark:text-[#778579]
          "
        >
          United States
        </div>

        {/* STATE LABELS */}

        <span className="absolute left-[23%] top-[18%] text-[7px] font-semibold text-[#89917e]">
          WASHINGTON
        </span>

        <span className="absolute left-[49%] top-[12%] text-[7px] font-semibold text-[#89917e]">
          MONTANA
        </span>

        <span className="absolute left-[16%] top-[42%] text-[7px] font-semibold text-[#89917e]">
          OREGON
        </span>

        <span className="absolute left-[58%] top-[28%] text-[7px] font-semibold text-[#89917e]">
          WYOMING
        </span>

        <span className="absolute left-[70%] top-[57%] text-[7px] font-semibold text-[#89917e]">
          TEXAS
        </span>

        {/* MARKERS */}

        {markers.map((marker, index) => (
          <div
            key={index}
            className="
              absolute
              -translate-x-1/2
              -translate-y-1/2
            "
            style={{
              top: marker.top,
              left: marker.left,
            }}
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-[var(--color-primary)]
                text-white
                shadow-[0_4px_12px_rgba(22,163,74,0.3)]
              "
            >
              <MapPin size={14} fill="currentColor" />
            </div>
          </div>
        ))}

        {/* ZOOM */}

        <div
          className="
            absolute
            bottom-3
            right-3
            overflow-hidden
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          <button
            type="button"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border-b
              border-[var(--color-border)]
              text-[var(--color-text-primary)]
              transition
              hover:bg-[var(--color-surface-secondary)]
            "
          >
            <Plus size={15} />
          </button>

          <button
            type="button"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              text-[var(--color-text-primary)]
              transition
              hover:bg-[var(--color-surface-secondary)]
            "
          >
            <Minus size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FarmLocationMap;