import { Sprout } from "lucide-react";

import ConfidenceScore from "./ConfidenceScore";
import AIRecommendation from "./AIRecommendation";
import ReasoningSummary from "./ReasoningSummary";
import DataUsed from "./DataUsed";
import EvidenceSources from "./EvidenceSources";
import RecommendedAction from "./RecommendedAction";

function AIAnswerCard() {
  return (
    <div className="mt-5">

      {/* =====================================
          AI ANSWER HEADER
      ===================================== */}

      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[var(--color-primary)]/20
            bg-[var(--color-primary)]/8
            text-[var(--color-primary)]
          "
        >
          <Sprout size={20} />
        </div>

        <div
          className="
            min-w-0
            flex-1
            rounded-[16px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-5
            shadow-[0_3px_14px_rgba(0,0,0,0.035)]
          "
        >

          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">

            <div className="min-w-0 flex-1">

              <h2 className="text-[15px] font-bold">
                Yes, irrigate Field 2 tomorrow morning.
              </h2>

              <p
                className="
                  mt-3
                  max-w-[800px]
                  text-[12px]
                  leading-5
                  text-[var(--color-text-secondary)]
                "
              >
                Soil moisture is currently low (32%). No significant rainfall
                is expected in the next 24 hours, and crop water demand is high
                at the current growth stage.
              </p>

            </div>

            <ConfidenceScore />

          </div>

          {/* =================================
              INSIGHT CARDS
          ================================= */}

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-3
              md:grid-cols-2
              2xl:grid-cols-4
            "
          >
            <AIRecommendation />
            <ReasoningSummary />
            <DataUsed />
            <EvidenceSources />
          </div>

          <RecommendedAction />

          {/* Helpful */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-end
              gap-3
              border-t
              border-[var(--color-border)]
              pt-3
            "
          >
            <span className="text-[10px] text-[var(--color-text-muted)]">
              Was this answer helpful?
            </span>

            <button
              className="
                rounded-lg
                px-2
                py-1
                text-sm
                transition
                hover:bg-[var(--color-surface-secondary)]
              "
            >
              👍
            </button>

            <button
              className="
                rounded-lg
                px-2
                py-1
                text-sm
                transition
                hover:bg-[var(--color-surface-secondary)]
              "
            >
              👎
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AIAnswerCard;