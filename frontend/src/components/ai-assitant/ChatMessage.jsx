import { Sprout, CheckCheck } from "lucide-react";

function ChatMessage({
  type = "ai",
  message,
  time,
}) {
  const isAI = type === "ai";

  return (
    <div
      className={`flex ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-[90%] items-end gap-3 ${
          isAI ? "flex-row" : "flex-row-reverse"
        }`}
      >

        {/* AI avatar */}

        {isAI && (
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
        )}

        <div
          className={`
            rounded-[16px]
            border
            px-4
            py-3
            shadow-[0_2px_10px_rgba(0,0,0,0.025)]
            ${
              isAI
                ? `
                  rounded-bl-md
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                `
                : `
                  rounded-br-md
                  border-[var(--color-primary)]/15
                  bg-[var(--color-primary)]/[0.07]
                `
            }
          `}
        >
          <p className="text-[13px] leading-5 text-[var(--color-text-primary)]">
            {message}
          </p>

          <div
            className={`
              mt-1.5
              flex
              items-center
              gap-1
              text-[9px]
              text-[var(--color-text-muted)]
              ${isAI ? "" : "justify-end"}
            `}
          >
            {time}

            {!isAI && (
              <CheckCheck
                size={12}
                className="text-[var(--color-primary)]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;