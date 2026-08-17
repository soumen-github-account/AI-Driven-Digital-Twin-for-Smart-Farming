function FarmSparkline({
  points = [],
}) {
  if (!points.length) return null;

  const width = 100;
  const height = 38;

  const min = Math.min(...points);
  const max = Math.max(...points);

  const coordinates = points.map((value, index) => {
    const x =
      (index / (points.length - 1)) *
      width;

    const y =
      height -
      ((value - min) / Math.max(max - min, 1)) *
        (height - 8) -
      4;

    return `${x},${y}`;
  });

  const line = coordinates.join(" ");

  return (
    <div className="h-10 w-[92px]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
      >
        <polyline
          points={line}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((value, index) => {
          const x =
            (index / (points.length - 1)) *
            width;

          const y =
            height -
            ((value - min) /
              Math.max(max - min, 1)) *
              (height - 8) -
            4;

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="var(--color-primary)"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default FarmSparkline;