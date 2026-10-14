import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  select,
} from "d3-selection";

import {
  zoom,
  zoomIdentity,
} from "d3-zoom";

import FieldLayer from "./FieldLayer";
import CropLayer from "./CropLayer";
import MeasurementLayer from "./MeasurementLayer";
import TwinToolbar from "./TwinToolbar";

export default function DigitalTwinCanvas({
  geometry,
  crop = "Crop",
}) {
  const svgRef =
    useRef(null);

  const containerRef =
    useRef(null);

  const zoomRef =
    useRef(null);

  const [transform, setTransform] =
    useState(
      zoomIdentity
    );

  const [containerSize, setContainerSize] =
    useState({
      width: 900,
      height: 550,
    });

  /* -------------------------------------- */
  /* CONTAINER SIZE */
  /* -------------------------------------- */

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer =
      new ResizeObserver(
        (entries) => {
          const rect =
            entries[0]?.contentRect;

          if (!rect) {
            return;
          }

          setContainerSize({
            width: rect.width,
            height: rect.height,
          });
        }
      );

    observer.observe(
      containerRef.current
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  /* -------------------------------------- */
  /* GEOMETRY */
  /* -------------------------------------- */

  const points = useMemo(() => {
    if (
      !geometry?.coordinates
    ) {
      return [];
    }

    return geometry.coordinates;
  }, [geometry]);

  const bounds = useMemo(() => {
    if (!points.length) {
      return null;
    }

    const xs = points.map(
      ([x]) => x
    );

    const ys = points.map(
      ([, y]) => y
    );

    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }, [points]);

  /* -------------------------------------- */
  /* FIT TRANSFORM */
  /* -------------------------------------- */

  const calculateFitTransform =
    () => {
      if (!bounds) {
        return zoomIdentity;
      }

      const padding = 110;

      const geometryWidth =
        Math.max(
          bounds.maxX -
            bounds.minX,
          1
        );

      const geometryHeight =
        Math.max(
          bounds.maxY -
            bounds.minY,
          1
        );

      const availableWidth =
        Math.max(
          containerSize.width -
            padding * 2,
          100
        );

      const availableHeight =
        Math.max(
          containerSize.height -
            padding * 2,
          100
        );

      const scale =
        Math.min(
          availableWidth /
            geometryWidth,
          availableHeight /
            geometryHeight
        );

      const centerX =
        (bounds.minX +
          bounds.maxX) /
        2;

      const centerY =
        (bounds.minY +
          bounds.maxY) /
        2;

      const screenCenterX =
        containerSize.width /
        2;

      const screenCenterY =
        containerSize.height /
        2;

      return zoomIdentity
        .translate(
          screenCenterX,
          screenCenterY
        )
        .scale(
          Math.min(
            Math.max(scale, 0.2),
            15
          )
        )
        .translate(
          -centerX,
          centerY
        );
    };

  /* -------------------------------------- */
  /* INITIAL FIT */
  /* -------------------------------------- */

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    if (!points.length) {
      return;
    }

    const nextTransform =
      calculateFitTransform();

    setTransform(
      nextTransform
    );

    if (zoomRef.current) {
      select(svgRef.current)
        .call(
          zoomRef.current.transform,
          nextTransform
        );
    }
  }, [
    points,
    containerSize.width,
    containerSize.height,
  ]);

  /* -------------------------------------- */
  /* D3 ZOOM */
  /* -------------------------------------- */

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg =
      select(
        svgRef.current
      );

    const zoomBehavior =
      zoom()
        .scaleExtent([
          0.2,
          15,
        ])
        .on(
          "zoom",
          (event) => {
            setTransform(
              event.transform
            );
          }
        );

    zoomRef.current =
      zoomBehavior;

    svg.call(
      zoomBehavior
    );

    return () => {
      svg.on(
        ".zoom",
        null
      );
    };
  }, []);

  /* -------------------------------------- */
  /* ZOOM HELPERS */
  /* -------------------------------------- */

  const zoomIn = () => {
    if (!svgRef.current) {
      return;
    }

    select(
      svgRef.current
    )
      .transition()
      .duration(220)
      .call(
        zoomRef.current.scaleBy,
        1.35
      );
  };

  const zoomOut = () => {
    if (!svgRef.current) {
      return;
    }

    select(
      svgRef.current
    )
      .transition()
      .duration(220)
      .call(
        zoomRef.current.scaleBy,
        0.74
      );
  };

  const reset = () => {
    if (!svgRef.current) {
      return;
    }

    const identity =
      zoomIdentity;

    select(
      svgRef.current
    )
      .transition()
      .duration(300)
      .call(
        zoomRef.current.transform,
        identity
      );
  };

  const fit = () => {
    if (!svgRef.current) {
      return;
    }

    const fitTransform =
      calculateFitTransform();

    select(
      svgRef.current
    )
      .transition()
      .duration(350)
      .call(
        zoomRef.current.transform,
        fitTransform
      );
  };

  /* -------------------------------------- */
  /* EMPTY */
  /* -------------------------------------- */

  if (!geometry) {
    return (
      <div
        className="
          flex
          h-full
          min-h-[500px]
          items-center
          justify-center
          rounded-[22px]
          border
          border-dashed
          border-slate-300
          bg-slate-50
        "
      >
        <p className="text-[12px] text-slate-400">
          Generate a field geometry to preview
          the Digital Twin.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-full
        min-h-[560px]
        w-full
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        bg-[#f7faf8]
      "
    >
      {/* Background */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="
          absolute
          inset-0
          cursor-grab
          active:cursor-grabbing
        "
      >
        <defs>
          {/* Field gradient */}
          <linearGradient
            id="fieldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#dcfce7"
            />

            <stop
              offset="50%"
              stopColor="#bbf7d0"
            />

            <stop
              offset="100%"
              stopColor="#86efac"
            />
          </linearGradient>

          {/* Grid */}
          <pattern
            id="smallGrid"
            width="25"
            height="25"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 25 0 L 0 0 0 25"
              fill="none"
              stroke="rgba(15,23,42,0.035)"
              strokeWidth="1"
            />
          </pattern>

          {/* Larger grid */}
          <pattern
            id="largeGrid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="100"
              height="100"
              fill="url(#smallGrid)"
            />

            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(15,23,42,0.06)"
              strokeWidth="1"
            />
          </pattern>

          {/* Shadow */}
          <filter
            id="fieldShadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="12"
              floodColor="#166534"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* Background */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#largeGrid)"
        />

        {/* Digital Twin world */}
        <g
          transform={`
            translate(
              ${transform.x},
              ${transform.y}
            )
            scale(
              ${transform.k}
            )
          `}
        >
          {/* Shadow field */}
          <g filter="url(#fieldShadow)">
            <FieldLayer
              points={points}
            />
          </g>

          {/* Crop */}
          <CropLayer
            points={points}
            crop={crop}
          />

          {/* Measurements */}
          <MeasurementLayer
            points={points}
          />
        </g>

        {/* North indicator */}
        <g
          transform={`
            translate(
              ${containerSize.width - 75},
              75
            )
          `}
        >
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="white"
            stroke="rgba(15,23,42,0.08)"
            strokeWidth="1"
          />

          <line
            x1="0"
            y1="12"
            x2="0"
            y2="-10"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <path
            d="M 0 -16 L -5 -7 L 5 -7 Z"
            fill="#22c55e"
          />

          <text
            x="0"
            y="-30"
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="#0f172a"
          >
            N
          </text>
        </g>
      </svg>

      {/* Header info */}
      <div
        className="
          absolute
          left-[18px]
          top-[18px]
          z-[20]
          rounded-[13px]
          border
          border-black/5
          bg-white/90
          px-[13px]
          py-[10px]
          shadow-[0_8px_30px_rgba(15,23,42,.08)]
          backdrop-blur-xl
        "
      >
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[1.2px]
            text-green-600
          "
        >
          Digital Twin
        </p>

        <p
          className="
            mt-[2px]
            text-[12px]
            font-extrabold
            text-slate-800
          "
        >
          Field Representation
        </p>
      </div>

      {/* Status */}
      <div
        className="
          absolute
          bottom-[18px]
          left-[18px]
          z-[20]
          flex
          items-center
          gap-[7px]
          rounded-full
          border
          border-green-200
          bg-white/90
          px-[11px]
          py-[7px]
          text-[9px]
          font-bold
          text-green-700
          shadow-sm
          backdrop-blur-xl
        "
      >
        <span
          className="
            h-[6px]
            w-[6px]
            rounded-full
            bg-green-500
          "
        />

        Geometry Ready
      </div>

      <TwinToolbar
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={reset}
        onFit={fit}
      />
    </div>
  );
}