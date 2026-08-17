import {
  Camera,
  ChevronDown,
  Layers3,
  Maximize2,
  Plus,
  RotateCcw,
} from "lucide-react";

const fields = [
  { name: "Field 1", area: "12.4 ha", x: "28%", y: "25%", tone: "good" },
  { name: "Field 2", area: "18.7 ha", x: "52%", y: "28%", tone: "moderate" },
  { name: "Field 3", area: "15.3 ha", x: "73%", y: "30%", tone: "poor" },
  { name: "Field 4", area: "20.6 ha", x: "34%", y: "58%", tone: "excellent" },
  { name: "Field 5", area: "14.2 ha", x: "63%", y: "62%", tone: "moderate" },
];

const toneClass = {
  excellent: "border-[var(--color-primary)] bg-[var(--color-primary)]/25",
  good: "border-[#84cc16] bg-[#84cc16]/25",
  moderate: "border-[var(--color-warning)] bg-[var(--color-warning)]/25",
  poor: "border-[var(--color-danger)] bg-[var(--color-danger)]/25",
};

function TwinMap() {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_6px_25px_rgba(0,0,0,0.04)]">
      <div className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[560px]">
        {/* Replace this URL with your local Green Valley farm image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85')",
          }}
        />

        {/* map color treatment */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,30,12,0.02),rgba(5,25,12,0.16))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(34,197,94,0.12),transparent_42%)]" />

        {/* field overlays */}
        {fields.map((field) => (
          <div
            key={field.name}
            className={`absolute h-[23%] w-[24%] rounded-[24px] border-2 shadow-[inset_0_0_25px_rgba(255,255,255,0.08)] ${toneClass[field.tone]}`}
            style={{
              left: field.x,
              top: field.y,
              transform: "rotate(-8deg)",
            }}
          />
        ))}

        {fields.map((field) => (
          <div
            key={`${field.name}-label`}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-black/55 px-2.5 py-1.5 text-center text-white shadow-lg backdrop-blur-md"
            style={{ left: field.x, top: field.y }}
          >
            <p className="text-[10px] font-bold">{field.name}</p>
            <p className="mt-0.5 text-[8px] text-white/75">{field.area}</p>
          </div>
        ))}

        {/* top-left view controls */}
        <div className="absolute left-3 top-3 overflow-hidden rounded-xl border border-white/35 bg-white/85 shadow-lg backdrop-blur-xl dark:bg-black/55">
          <button className="map-tool active">
            <Layers3 size={15} />
            <span>3D View</span>
          </button>
          <button className="map-tool">
            <Layers3 size={15} />
            <span>2D Map</span>
          </button>
          <button className="map-tool">
            <span className="text-[13px]">◫</span>
            <span>Split View</span>
          </button>
          <button className="map-tool">
            <Camera size={15} />
            <span>Camera</span>
          </button>
          <button className="map-tool">
            <RotateCcw size={15} />
            <span>Reset View</span>
          </button>
        </div>

        {/* layer panel */}
        <div className="absolute right-3 top-3 w-[170px] rounded-2xl border border-white/35 bg-white/88 p-2.5 shadow-xl backdrop-blur-xl dark:bg-black/60">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[10px] font-bold text-[var(--color-text-primary)]">
              Layer Controls
            </p>
            <ChevronDown size={13} className="text-[var(--color-text-secondary)]" />
          </div>

          {[
            ["Crop Health", "●", true],
            ["Soil Moisture", "◌"],
            ["Water Stress", "◌"],
            ["Disease Risk", "✳"],
            ["Temperature", "♨"],
            ["NDVI", "⌁"],
          ].map(([label, icon, active]) => (
            <button
              key={label}
              className={`mb-1 flex h-8 w-full items-center gap-2 rounded-lg px-2 text-left text-[9px] font-semibold ${
                active
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/8"
              }`}
            >
              <span className="w-4 text-center">{icon}</span>
              {label}
            </button>
          ))}

          <button className="mt-1 flex h-8 w-full items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-[9px] font-semibold text-[var(--color-text-primary)]">
            <Plus size={14} />
            Custom Layer
          </button>
        </div>

        {/* legend */}
        <div className="absolute bottom-3 left-3 rounded-xl border border-white/20 bg-black/65 px-3 py-2.5 text-white shadow-xl backdrop-blur-xl">
          <p className="mb-1.5 text-[9px] font-bold">Crop Health (Current)</p>
          {[
            ["Excellent", "80–100%", "bg-[var(--color-primary)]"],
            ["Good", "60–79%", "bg-[#84cc16]"],
            ["Moderate", "40–59%", "bg-[var(--color-warning)]"],
            ["Poor", "20–39%", "bg-[var(--color-danger)]"],
            ["Critical", "0–19%", "bg-red-700"],
          ].map(([label, range, dot]) => (
            <div key={label} className="flex items-center gap-2 py-0.5 text-[8px]">
              <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
              <span className="font-medium">{label}</span>
              <span className="text-white/65">({range})</span>
            </div>
          ))}
        </div>

        {/* map zoom */}
        <div className="absolute bottom-3 right-3 overflow-hidden rounded-xl border border-white/35 bg-white/90 shadow-xl backdrop-blur-xl dark:bg-black/65">
          <button className="flex h-9 w-9 items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/10">
            <Plus size={17} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center border-t border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/10">
            <span className="text-lg leading-none">−</span>
          </button>
          <button className="flex h-9 w-9 items-center justify-center border-t border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/10">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TwinMap;
