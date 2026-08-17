function MiniSparkline({ points = [], stroke = "var(--color-primary)" }) {
  if (!points.length) return null;

  const width = 130;
  const height = 28;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((value, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * width;
    const y = height - ((value - min) / range) * (height - 5) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-7 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={coords}
        fill="none"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MiniSparkline;
