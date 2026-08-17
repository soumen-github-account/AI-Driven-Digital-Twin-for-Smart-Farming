import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Sparkles,
} from "lucide-react";

function SoilRecommendation() {
  return (
    <div
      className="
        flex
        flex-col
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.025)]
      "
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[var(--color-ai)]/10
              text-[var(--color-ai)]
            "
          >
            <Sparkles size={15} />
          </div>

          <h2 className="text-[11px] font-bold">
            AI Soil Recommendation
          </h2>

        </div>

        <span
          className="
            rounded-full
            bg-[var(--color-primary)]/10
            px-2
            py-1
            text-[7px]
            font-bold
            text-[var(--color-primary)]
          "
        >
          AI Powered
        </span>

      </div>

      <div
        className="
          mt-4
          flex-1
          rounded-xl
          border
          border-[var(--color-primary)]/10
          bg-[var(--color-surface-secondary)]
          p-3
        "
      >

        <div className="flex gap-3">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]/10
              text-[var(--color-primary)]
            "
          >
            <Leaf size={22} />
          </div>

          <div>

            <h3
              className="
                text-[13px]
                font-extrabold
                leading-snug
              "
            >
              Apply nitrogen-rich fertilizer to Field 2 within
              the next 5 days.
            </h3>

          </div>

        </div>

        <p
          className="
            mt-4
            text-[9px]
            leading-relaxed
            text-[var(--color-text-secondary)]
          "
        >
          Based on current nitrogen levels and crop growth
          stage (Tillering), additional nitrogen will improve
          yield potential by 8–12%.
        </p>

        <div className="mt-4">

          <p
            className="
              text-[8px]
              font-bold
              text-[var(--color-text-primary)]
            "
          >
            Recommended Action
          </p>

          <div className="mt-2 space-y-2">

            <Action text="Fertilizer Type: Urea (46% N)" />
            <Action text="Dose: 75 kg/ha" />
            <Action text="Application Method: Top Dressing" />
            <Action text="Optimal Time: Within 5 days" />

          </div>

        </div>

      </div>

      <button
        type="button"
        className="
          mt-3
          flex
          h-9
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[var(--color-primary)]
          text-[9px]
          font-bold
          text-white
          transition
          hover:bg-[var(--color-primary-hover)]
        "
      >
        View Full Recommendation
        <ArrowRight size={13} />
      </button>

    </div>
  );
}

function Action({ text }) {
  return (
    <div className="flex items-center gap-2">

      <CheckCircle2
        size={12}
        className="shrink-0 text-[var(--color-primary)]"
      />

      <span
        className="
          text-[8px]
          text-[var(--color-text-secondary)]
        "
      >
        {text}
      </span>

    </div>
  );
}

export default SoilRecommendation;