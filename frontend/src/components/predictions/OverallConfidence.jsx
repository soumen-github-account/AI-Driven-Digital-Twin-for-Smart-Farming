import { ShieldCheck } from "lucide-react";
import ConfidenceRing from "./ConfidenceRing";

function OverallConfidence() {
  return (
    <div>

      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-bold">
          Overall Prediction Confidence
        </h3>

        <span className="text-[var(--color-text-muted)]">
          ⓘ
        </span>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <ConfidenceRing value={85} />

        <div>
          <p className="text-[13px] font-bold text-[var(--color-primary)]">
            Very High
          </p>

          <p className="mt-1 text-[9px] text-[var(--color-text-secondary)]">
            Confidence
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-[var(--color-border)] pt-3">

        <div className="flex items-center gap-2">
          <ShieldCheck
            size={14}
            className="text-[var(--color-primary)]"
          />

          <span className="text-[9px] font-semibold">
            Model Reliability: Excellent
          </span>
        </div>

        <p className="mt-2 text-[8px] text-[var(--color-text-muted)]">
          Last Updated: Today, 10:30 AM
        </p>

      </div>

    </div>
  );
}

export default OverallConfidence;