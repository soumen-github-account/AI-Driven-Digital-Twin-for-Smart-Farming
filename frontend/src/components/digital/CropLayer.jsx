export default function CropLayer({
  points,
  crop = "Crop",
}) {
  if (
    !points ||
    points.length < 3
  ) {
    return null;
  }

  const xs = points.map(
    ([x]) => x
  );

  const ys = points.map(
    ([, y]) => y
  );

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width =
    maxX - minX;

  const height =
    maxY - minY;

  const spacing =
    Math.max(
      Math.min(
        width,
        height
      ) / 12,
      8
    );

  const rows = [];

  for (
    let y = minY + spacing;
    y < maxY;
    y += spacing
  ) {
    rows.push(
      <line
        key={`row-${y}`}
        x1={minX}
        y1={-y}
        x2={maxX}
        y2={-y}
        stroke="rgba(21,128,61,0.28)"
        strokeWidth="1.2"
        strokeDasharray="2 3"
      />
    );
  }

  return (
    <g
      pointerEvents="none"
      opacity="0.75"
    >
      {rows}

      {/* Crop label */}
      <text
        x={
          minX +
          width / 2
        }
        y={
          -(minY +
            height / 2)
        }
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="700"
        fill="rgba(21,128,61,0.35)"
        letterSpacing="1"
      >
        {crop.toUpperCase()}
      </text>
    </g>
  );
}