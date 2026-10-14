export default function HealthRing({ health }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (health / 100) * circumference;

  return (
    <div className="relative h-[45px] w-[45px]">
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        className="-rotate-90"
      >
        <circle
          cx="22.5"
          cy="22.5"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-[var(--color-border)]"
        />

        <circle
          cx="22.5"
          cy="22.5"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-[var(--color-primary)]"
        />
      </svg>

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-[9px]
          font-bold
        "
      >
        {health}
      </div>
    </div>
  );
}