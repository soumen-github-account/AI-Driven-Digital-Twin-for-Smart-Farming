import {
  BookOpen,
  Database,
  FileText,
  Globe,
} from "lucide-react";

const sources = [
  "FAO Irrigation Guidelines",
  "ICAR Rice Cultivation Handbook",
  "NASA Soil Moisture Data",
  "Local Weather API",
  "Field Sensor Network",
];

function EvidenceSources() {
  const icons = [
    BookOpen,
    FileText,
    Database,
    Globe,
    Database,
  ];

  return (
    <div
      className="
        rounded-[14px]
        border
        border-orange-400/20
        bg-orange-400/[0.025]
        p-3
      "
    >
      <div className="flex items-center gap-2">
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-orange-500/10
            text-orange-600
          "
        >
          <FileText size={17} />
        </div>

        <span className="text-[11px] font-bold text-orange-700">
          Evidence / Sources
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {sources.map((source, index) => {
          const Icon = icons[index];

          return (
            <div
              key={source}
              className="flex items-center gap-2"
            >
              <Icon
                size={12}
                className="shrink-0 text-[var(--color-text-secondary)]"
              />

              <span className="text-[9px] text-[var(--color-text-secondary)]">
                {source}
              </span>
            </div>
          );
        })}
      </div>

      <button
        className="
          mt-4
          text-[10px]
          font-semibold
          text-[var(--color-primary)]
        "
      >
        View All Sources →
      </button>
    </div>
  );
}

export default EvidenceSources;