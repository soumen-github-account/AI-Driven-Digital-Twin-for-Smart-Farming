export default function FieldLayer({
  points,
}) {
  if (
    !points ||
    points.length < 3
  ) {
    return null;
  }

  const polygonPoints =
    points
      .map(
        ([x, y]) =>
          `${x},${-y}`
      )
      .join(" ");

  return (
    <>
      {/* Outer field glow */}
      <polygon
        points={polygonPoints}
        fill="rgba(34,197,94,0.08)"
        stroke="rgba(34,197,94,0.25)"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Main field */}
      <polygon
        points={polygonPoints}
        fill="url(#fieldGradient)"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Inner boundary */}
      <polygon
        points={polygonPoints}
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeDasharray="5 5"
        strokeLinejoin="round"
      />
    </>
  );
}