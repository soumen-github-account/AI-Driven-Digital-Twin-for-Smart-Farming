function ConfidenceScore() {
  return (
    <div className="flex flex-col items-center">

      <p className="text-[9px] font-medium text-[var(--color-text-secondary)]">
        Confidence Score
      </p>

      <div className="relative mt-2 h-[70px] w-[70px]">

        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-[var(--color-border)]"
          />

          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="239"
            strokeDashoffset="31"
            className="text-[var(--color-primary)]"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[15px] font-bold">
            87%
          </span>

          <span className="text-[8px] text-[var(--color-primary)]">
            High
          </span>
        </div>

      </div>
    </div>
  );
}

export default ConfidenceScore;