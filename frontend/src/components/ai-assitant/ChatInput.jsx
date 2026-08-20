import {
  ArrowUp,
  Paperclip,
} from "lucide-react";

function ChatInput() {
  return (
    <div
      className="
        mt-4
        flex
        min-h-[64px]
        items-center
        gap-3
        rounded-[16px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-4
        shadow-[0_3px_14px_rgba(0,0,0,0.035)]
        focus-within:border-[var(--color-primary)]/30
        focus-within:ring-4
        focus-within:ring-[var(--color-primary)]/5
      "
    >
      <button
        type="button"
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          text-[var(--color-text-secondary)]
          transition
          hover:bg-[var(--color-surface-secondary)]
          hover:text-[var(--color-primary)]
        "
      >
        <Paperclip size={18} />
      </button>

      <input
        type="text"
        placeholder="Ask anything about your farm..."
        className="
          min-w-0
          flex-1
          bg-transparent
          text-[12px]
          text-[var(--color-text-primary)]
          outline-none
          placeholder:text-[var(--color-text-muted)]
        "
      />

      <button
        type="button"
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[var(--color-primary)]
          text-white
          shadow-[0_5px_15px_rgba(22,163,74,0.18)]
          transition
          hover:bg-[var(--color-primary-hover)]
          active:scale-95
        "
      >
        <ArrowUp size={19} strokeWidth={2.2} />
      </button>
    </div>
  );
}

export default ChatInput;