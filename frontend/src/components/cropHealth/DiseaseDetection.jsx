import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function DiseaseDetection() {
  return (
    <div
      className="
        h-full
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-bold">
          Disease Detection
        </h2>

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
          AI Powered
        </span>
      </div>

      {/* Status */}

      <div className="mt-6">
        <p className="text-[9px] font-semibold">
          Disease Status
        </p>

        <div className="mt-2 flex items-center gap-2">
          <div
            className="
              flex h-7 w-7 items-center justify-center
              rounded-full
              bg-[var(--color-primary)]/10
              text-[var(--color-primary)]
            "
          >
            <ShieldCheck size={17} />
          </div>

          <div>
            <p className="text-[13px] font-bold text-[var(--color-primary)]">
              Low Risk
            </p>

            <p className="text-[8px] text-[var(--color-text-secondary)]">
              No significant disease detected
            </p>
          </div>
        </div>
      </div>

      {/* Probability */}

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold">
            Disease Probability
          </span>

          <span className="text-[12px] font-bold text-[var(--color-primary)]">
            12%
          </span>
        </div>

        <div className="mt-2 h-1.5 rounded-full bg-[var(--color-border)]">
          <div
            className="
              h-full
              w-[12%]
              rounded-full
              bg-[var(--color-primary)]
            "
          />
        </div>
      </div>

      {/* Symptoms */}

      <div className="mt-6">
        <p className="text-[9px] font-semibold">
          Detected Symptoms
        </p>

        <div className="mt-2 space-y-2">
          {[
            "No leaf spots detected",
            "No yellowing detected",
            "No wilting detected",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2"
            >
              <CheckCircle2
                size={13}
                className="text-[var(--color-primary)]"
              />

              <span className="text-[9px] text-[var(--color-text-secondary)]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence */}

      <div className="mt-6">
        <div className="flex justify-between">
          <span className="text-[9px] font-semibold">
            Confidence Score
          </span>

          <span className="text-[10px] font-bold">
            87%
          </span>
        </div>

        <div className="mt-2 h-1.5 rounded-full bg-[var(--color-border)]">
          <div
            className="
              h-full
              w-[87%]
              rounded-full
              bg-[var(--color-primary)]
            "
          />
        </div>
      </div>

      {/* Recommendation */}

      <div className="mt-6">
        <p className="text-[9px] font-semibold">
          Recommended Action
        </p>

        <div
          className="
            mt-2
            rounded-xl
            bg-[var(--color-surface-secondary)]
            p-3
          "
        >
          <div className="flex gap-2">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-[var(--color-primary)]"
            />

            <div>
              <p className="text-[10px] font-bold">
                No action required
              </p>

              <p className="mt-1 text-[8px] leading-relaxed text-[var(--color-text-secondary)]">
                Continue current management practices and
                monitor regularly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="
          mt-4
          flex
          items-center
          gap-1.5
          text-[9px]
          font-bold
          text-[var(--color-primary)]
        "
      >
        View Details
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

export default DiseaseDetection;