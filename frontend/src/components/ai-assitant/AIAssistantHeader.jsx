import { Sparkles } from "lucide-react";

function AIAssistantHeader() {
  return (
    <div className="flex items-start gap-4">

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-[15px]
          border
          border-[var(--color-primary)]/20
          bg-[var(--color-primary)]/8
          text-[var(--color-primary)]
        "
      >
        <Sparkles size={23} strokeWidth={1.8} />
      </div>

      <div>
        <h1
          className="
            text-[25px]
            font-bold
            tracking-[-0.8px]
            text-[var(--color-text-primary)]
          "
        >
          AI Assistant
        </h1>

        <p
          className="
            mt-1
            text-[13px]
            text-[var(--color-text-secondary)]
          "
        >
          Ask questions about your farm and get evidence-based recommendations.
        </p>
      </div>

    </div>
  );
}

export default AIAssistantHeader;