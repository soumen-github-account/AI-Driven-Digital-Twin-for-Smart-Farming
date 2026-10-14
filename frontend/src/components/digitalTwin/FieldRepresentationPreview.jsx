import {
  CheckCircle2,
  MapPin,
  Maximize2,
  RotateCcw,
} from "lucide-react";

import {
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";


// --------------------------------------------------
// MAP FITTER
// --------------------------------------------------

function FitFieldBounds({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (!coordinates?.length) return;

    const bounds = coordinates.map(
      ([lat, lng]) => [lat, lng]
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [coordinates, map]);

  return null;
}


// --------------------------------------------------
// PREVIEW
// --------------------------------------------------

export default function FieldRepresentationPreview({
  representation,
  onReset,
}) {
  if (!representation) {
    return null;
  }


  // ------------------------------------------------
  // SIMPLE FIELD
  // ------------------------------------------------

  if (representation.type === "simple") {
    const {
      length,
      width,
      unit,
    } = representation.dimensions;

    const area = representation.area;

    return (
      <section
        className="
          overflow-hidden
          rounded-[22px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-[0_15px_50px_rgba(0,0,0,.06)]
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-[12px]
            border-b
            border-[var(--color-border)]
            p-[18px]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-[8px]
              "
            >

              <h2
                className="
                  text-[18px]
                  font-extrabold
                  tracking-[-.5px]
                "
              >
                Field Digital Twin
              </h2>

              <span
                className="
                  flex
                  items-center
                  gap-[4px]
                  rounded-full
                  bg-[var(--color-primary)]/10
                  px-[8px]
                  py-[4px]
                  text-[8px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                <CheckCircle2 size={10} />
                Ready
              </span>

            </div>

            <p
              className="
                mt-[4px]
                text-[10px]
                text-[var(--color-text-muted)]
              "
            >
              Digital representation generated
              successfully.
            </p>

          </div>


          <button
            type="button"
            onClick={onReset}
            className="
              flex
              h-[34px]
              items-center
              justify-center
              gap-[6px]
              rounded-[9px]
              border
              border-[var(--color-border)]
              px-[11px]
              text-[9px]
              font-bold
              text-[var(--color-text-secondary)]
              transition
              hover:border-[var(--color-primary)]/30
              hover:text-[var(--color-primary)]
            "
          >
            <RotateCcw size={12} />
            Recreate
          </button>

        </div>


        {/* FIELD VISUALIZATION */}

        <div className="p-[18px]">

          <div
            className="
              relative
              flex
              min-h-[430px]
              items-center
              justify-center
              overflow-hidden
              rounded-[18px]
              border
              border-[var(--color-border)]
              bg-gradient-to-br
              from-emerald-50
              via-green-50
              to-sky-50
            "
          >

            {/* GRID */}

            <div
              className="
                absolute
                inset-0
                opacity-[0.35]
                [background-image:linear-gradient(rgba(22,163,74,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(22,163,74,.12)_1px,transparent_1px)]
                [background-size:35px_35px]
              "
            />


            {/* NORTH */}

            <div
              className="
                absolute
                right-[18px]
                top-[18px]
                flex
                flex-col
                items-center
                text-[9px]
                font-bold
                text-[var(--color-text-secondary)]
              "
            >
              <span className="text-[14px]">
                ↑
              </span>

              NORTH
            </div>


            {/* FIELD */}

            <div
              className="
                relative
                flex
                items-center
                justify-center
                overflow-hidden
                rounded-[12px]
                border-[3px]
                border-[var(--color-primary)]
                bg-[rgba(34,197,94,.18)]
                shadow-[0_15px_45px_rgba(22,163,74,.12)]
              "
              style={{
                width: `${Math.min(
                  Math.max(
                    (length / width) * 240,
                    160
                  ),
                  460
                )}px`,
                height: `${Math.min(
                  Math.max(
                    (width / length) * 240,
                    130
                  ),
                  300
                )}px`,
                transform: `rotate(${representation.orientation || 0}deg)`,
              }}
            >

              {/* CROP ROWS */}

              <div
                className="
                  absolute
                  inset-[12px]
                  grid
                  grid-cols-8
                  gap-[7px]
                  opacity-50
                "
              >
                {Array.from({
                  length: 40,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="
                      flex
                      items-center
                      justify-center
                      text-[12px]
                    "
                  >
                    🌱
                  </span>
                ))}
              </div>


              {/* CENTER INFO */}

              <div
                className="
                  relative
                  z-10
                  rounded-[12px]
                  border
                  border-white/70
                  bg-white/85
                  px-[18px]
                  py-[12px]
                  text-center
                  shadow-lg
                  backdrop-blur-md
                "
              >

                <p
                  className="
                    text-[11px]
                    font-extrabold
                    text-[var(--color-text-primary)]
                  "
                >
                  Field Representation
                </p>

                <p
                  className="
                    mt-[3px]
                    text-[9px]
                    text-[var(--color-text-muted)]
                  "
                >
                  {length}m × {width}m
                </p>

              </div>

            </div>


            {/* DIMENSION LABEL */}

            <div
              className="
                absolute
                bottom-[18px]
                left-1/2
                -translate-x-1/2
                rounded-full
                border
                border-[var(--color-border)]
                bg-white/90
                px-[12px]
                py-[6px]
                text-[9px]
                font-bold
                shadow
                backdrop-blur-md
              "
            >
              {length}m × {width}m
            </div>

          </div>


          {/* INFORMATION CARDS */}

          <div
            className="
              mt-[14px]
              grid
              grid-cols-1
              gap-[10px]
              sm:grid-cols-3
            "
          >

            <InfoCard
              label="Field Area"
              value={`${area.toLocaleString()} m²`}
            />

            <InfoCard
              label="Dimensions"
              value={`${length}m × ${width}m`}
            />

            <InfoCard
              label="Orientation"
              value={`${representation.orientation || 0}°`}
            />

          </div>


          {/* STATUS */}

          <div
            className="
              mt-[14px]
              flex
              items-center
              gap-[8px]
              rounded-[11px]
              border
              border-[var(--color-primary)]/20
              bg-[var(--color-primary)]/5
              px-[12px]
              py-[10px]
            "
          >

            <CheckCircle2
              size={15}
              className="text-[var(--color-primary)]"
            />

            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                Field boundary created
              </p>

              <p
                className="
                  mt-[2px]
                  text-[8px]
                  text-[var(--color-text-muted)]
                "
              >
                Ready for sensor placement,
                monitoring and Digital Twin data.
              </p>

            </div>

          </div>

        </div>

      </section>
    );
  }


  // ------------------------------------------------
  // GPS FIELD
  // ------------------------------------------------

  if (representation.type === "gps") {
    const coordinates =
      representation.coordinates.map(
        (point) => [
          point.latitude,
          point.longitude,
        ]
      );

    const center = coordinates[0];


    return (
      <section
        className="
          overflow-hidden
          rounded-[22px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-[0_15px_50px_rgba(0,0,0,.06)]
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-[12px]
            border-b
            border-[var(--color-border)]
            p-[18px]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-[8px]
              "
            >

              <h2
                className="
                  text-[18px]
                  font-extrabold
                "
              >
                Field Digital Twin
              </h2>

              <span
                className="
                  rounded-full
                  bg-[var(--color-primary)]/10
                  px-[8px]
                  py-[4px]
                  text-[8px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                GPS Boundary
              </span>

            </div>

            <p
              className="
                mt-[4px]
                text-[10px]
                text-[var(--color-text-muted)]
              "
            >
              {coordinates.length} boundary
              points detected.
            </p>

          </div>


          <button
            type="button"
            onClick={onReset}
            className="
              flex
              h-[34px]
              items-center
              justify-center
              gap-[6px]
              rounded-[9px]
              border
              border-[var(--color-border)]
              px-[11px]
              text-[9px]
              font-bold
              hover:text-[var(--color-primary)]
            "
          >
            <RotateCcw size={12} />
            Recreate
          </button>

        </div>


        {/* GPS MAP */}

        <div className="p-[18px]">

          <div
            className="
              relative
              h-[480px]
              overflow-hidden
              rounded-[16px]
            "
          >

            <MapContainer
              center={center}
              zoom={17}
              scrollWheelZoom={true}
              className="h-full w-full"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FitFieldBounds
                coordinates={coordinates}
              />

              <Polygon
                positions={coordinates}
                pathOptions={{
                  color: "#16a34a",
                  fillColor: "#22c55e",
                  fillOpacity: 0.3,
                  weight: 4,
                }}
              />

            </MapContainer>


            <div
              className="
                absolute
                left-[14px]
                top-[14px]
                z-[1000]
                flex
                items-center
                gap-[6px]
                rounded-[9px]
                bg-white/90
                px-[10px]
                py-[7px]
                text-[9px]
                font-bold
                shadow
                backdrop-blur-md
              "
            >

              <MapPin
                size={12}
                className="text-[var(--color-primary)]"
              />

              Digital Field Boundary

            </div>

          </div>


          {/* GPS POINTS */}

          <div
            className="
              mt-[14px]
              grid
              grid-cols-1
              gap-[8px]
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {representation.coordinates.map(
              (point, index) => (
                <div
                  key={index}
                  className="
                    rounded-[10px]
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-bg)]
                    p-[10px]
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-[9px]
                        font-bold
                      "
                    >
                      Corner {index + 1}
                    </span>

                    <span
                      className="
                        text-[8px]
                        text-[var(--color-primary)]
                      "
                    >
                      ●
                    </span>

                  </div>

                  <p
                    className="
                      mt-[5px]
                      text-[8px]
                      text-[var(--color-text-muted)]
                    "
                  >
                    {point.latitude.toFixed(6)}
                    {" , "}
                    {point.longitude.toFixed(6)}
                  </p>

                </div>
              )
            )}

          </div>


          {/* STATUS */}

          <div
            className="
              mt-[14px]
              flex
              items-center
              gap-[8px]
              rounded-[11px]
              border
              border-[var(--color-primary)]/20
              bg-[var(--color-primary)]/5
              px-[12px]
              py-[10px]
            "
          >

            <CheckCircle2
              size={15}
              className="text-[var(--color-primary)]"
            />

            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                GPS field boundary created
              </p>

              <p
                className="
                  mt-[2px]
                  text-[8px]
                  text-[var(--color-text-muted)]
                "
              >
                Ready for sensor placement and
                Digital Twin monitoring.
              </p>

            </div>

          </div>

        </div>

      </section>
    );
  }


  return null;
}


// --------------------------------------------------
// INFO CARD
// --------------------------------------------------

function InfoCard({ label, value }) {
  return (
    <div
      className="
        rounded-[11px]
        border
        border-[var(--color-border)]
        bg-[var(--color-bg)]
        p-[11px]
      "
    >

      <p
        className="
          text-[8px]
          text-[var(--color-text-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]
          text-[12px]
          font-extrabold
        "
      >
        {value}
      </p>

    </div>
  );
}