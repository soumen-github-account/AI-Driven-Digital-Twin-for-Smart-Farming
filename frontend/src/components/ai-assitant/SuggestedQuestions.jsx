import {
  Droplets,
  Leaf,
  Scale,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

const questions = [
  {
    label: "Why is my crop health declining?",
    icon: Leaf,
  },
  {
    label: "Should I irrigate Field 2?",
    icon: Droplets,
  },
  {
    label: "What is my disease risk this week?",
    icon: ShieldAlert,
  },
  {
    label: "How can I improve yield?",
    icon: TrendingUp,
  },
  {
    label: "Compare my two fields.",
    icon: Scale,
  },
];

function SuggestedQuestions() {
  return (
    <div className="mt-7">
      <p className="mb-3 px-1 text-[12px] font-semibold text-[var(--color-text-secondary)]">
        Suggested questions
      </p>

      <div
        className="
          grid
          grid-cols-1
          gap-2
          sm:grid-cols-2
          lg:grid-cols-3
          2xl:grid-cols-5
        "
      >
        {questions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="
              group
              flex
              min-h-[62px]
              items-center
              gap-3
              rounded-[14px]
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-3
              text-left
              shadow-[0_2px_10px_rgba(0,0,0,0.025)]
              transition
              hover:-translate-y-[1px]
              hover:border-[var(--color-primary)]/25
              hover:bg-[var(--color-primary)]/[0.025]
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-primary)]/8
                text-[var(--color-primary)]
              "
            >
              <Icon size={18} strokeWidth={1.8} />
            </span>

            <span
              className="
                text-[11px]
                font-medium
                leading-4
                text-[var(--color-text-primary)]
              "
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;