import {
  Maximize2,
  Layers,
  Plus,
  Minus,
} from "lucide-react";

function FieldHealthMap() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      {/* Header */}

      <div className="flex h-[50px] items-center justify-between px-4">
        <h2 className="text-[12px] font-bold">
          Field Health Map
        </h2>

        <button
          className="
            flex
            h-8
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--color-border)]
            px-2.5
            text-[9px]
            font-semibold
          "
        >
          Health Index
        </button>
      </div>

      {/* MAP */}

      <div
        className="
          relative
          mx-2
          mb-2
          h-[365px]
          overflow-hidden
          rounded-[14px]
          bg-[#183d24]
        "
      >
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
          alt="Agricultural field"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* Green overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-green-900/20
            via-green-500/10
            to-orange-500/15
          "
        />

        {/* Field blocks */}

        <div
          className="
            absolute
            left-[15%]
            top-[17%]
            h-[32%]
            w-[30%]
            rotate-[5deg]
            border-2
            border-white/90
            bg-green-500/25
          "
        />

        <div
          className="
            absolute
            left-[45%]
            top-[12%]
            h-[32%]
            w-[28%]
            -rotate-[3deg]
            border-2
            border-white/90
            bg-yellow-400/30
          "
        />

        <div
          className="
            absolute
            left-[55%]
            top-[44%]
            h-[36%]
            w-[28%]
            rotate-[4deg]
            border-2
            border-white/90
            bg-red-500/35
          "
        />

        <div
          className="
            absolute
            left-[22%]
            top-[48%]
            h-[35%]
            w-[32%]
            -rotate-[5deg]
            border-2
            border-white/90
            bg-green-500/30
          "
        />

        {/* Map Controls */}

        <div
          className="
            absolute
            left-3
            top-3
            flex
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-white/40
            bg-white/85
            shadow-lg
            backdrop-blur-xl
          "
        >
          <button className="flex h-9 w-9 items-center justify-center">
            <Plus size={15} />
          </button>

          <div className="h-px bg-black/10" />

          <button className="flex h-9 w-9 items-center justify-center">
            <Minus size={15} />
          </button>

          <div className="h-px bg-black/10" />

          <button className="flex h-9 w-9 items-center justify-center">
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Layer */}

        <button
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/40
            bg-white/85
            shadow-lg
            backdrop-blur-xl
          "
        >
          <Layers size={15} />
        </button>

        {/* Legend */}

        <div
          className="
            absolute
            bottom-3
            left-3
            rounded-xl
            border
            border-white/20
            bg-black/55
            px-3
            py-2.5
            text-white
            backdrop-blur-xl
          "
        >
          <p className="mb-2 text-[9px] font-bold">
            Health Index
          </p>

          {[
            ["Healthy", "bg-green-500"],
            ["Moderate", "bg-yellow-400"],
            ["Poor", "bg-orange-500"],
            ["Critical", "bg-red-500"],
          ].map(([label, color]) => (
            <div
              key={label}
              className="mb-1 flex items-center gap-2 last:mb-0"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${color}`}
              />

              <span className="text-[8px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FieldHealthMap;