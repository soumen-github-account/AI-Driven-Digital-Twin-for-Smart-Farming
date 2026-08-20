function ConfidenceRing({
  value = 85,
  small = false,
}) {
  const radius = small ? 23 : 39;
  const stroke = small ? 4 : 5;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div
      className={`relative shrink-0 ${
        small ? "h-[58px] w-[58px]" : "h-[92px] w-[92px]"
      }`}
    >
      <svg
        className="-rotate-90"
        width="100%"
        height="100%"
        viewBox={`0 0 ${small ? 58 : 92} ${small ? 58 : 92}`}
      >
        <circle
          cx={small ? 29 : 46}
          cy={small ? 29 : 46}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />

        <circle
          cx={small ? 29 : 46}
          cy={small ? 29 : 46}
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold ${
            small ? "text-[11px]" : "text-[20px]"
          }`}
        >
          {value}%
        </span>

        {!small && (
          <span className="text-[7px] font-semibold uppercase text-[var(--color-primary)]">
            High
          </span>
        )}
      </div>
    </div>
  );
}

export default ConfidenceRing;