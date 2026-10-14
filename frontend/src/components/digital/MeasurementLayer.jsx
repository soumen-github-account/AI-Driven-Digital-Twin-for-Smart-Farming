export default function MeasurementLayer({
  points,
}) {
  if (
    !points ||
    points.length < 2
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

  const formatDistance = (
    value
  ) => {
    if (value >= 1000) {
      return `${(
        value / 1000
      ).toFixed(2)} km`;
    }

    return `${Math.round(
      value
    )} m`;
  };

  return (
    <g
      pointerEvents="none"
      fontFamily="Inter, sans-serif"
    >
      {/* Horizontal dimension */}
      <line
        x1={minX}
        y1={35}
        x2={maxX}
        y2={35}
        stroke="rgba(15,23,42,0.5)"
        strokeWidth="1"
      />

      <line
        x1={minX}
        y1={28}
        x2={minX}
        y2={42}
        stroke="rgba(15,23,42,0.5)"
        strokeWidth="1"
      />

      <line
        x1={maxX}
        y1={28}
        x2={maxX}
        y2={42}
        stroke="rgba(15,23,42,0.5)"
        strokeWidth="1"
      />

      <text
        x={
          minX +
          width / 2
        }
        y={26}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#64748b"
      >
        {formatDistance(
          width
        )}
      </text>

      {/* Vertical dimension */}
      <line
        x1={-35}
        y1={-minY}
        x2={-35}
        y2={-maxY}
        stroke="rgba(15,23,42,0.5)"
        strokeWidth="1"
      />

      <line
        x1={-42}
        y1={-minY}
        x2={-28}
        y2={-minY}
        stroke="rgba(15,23,42,0.5)"
        strokeWidth="1"
      />

      <line
        x1={-42}
        y1={-maxY}
        x2={-28}
        y2={-maxY}
        stroke="rgba(15,23,42,0.5)"
        strokeWidth="1"
      />

      <text
        x={-48}
        y={
          -(minY +
            height / 2)
        }
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#64748b"
        transform={`rotate(-90 -48 ${-(
          minY +
          height / 2
        )})`}
      >
        {formatDistance(
          height
        )}
      </text>
    </g>
  );
}