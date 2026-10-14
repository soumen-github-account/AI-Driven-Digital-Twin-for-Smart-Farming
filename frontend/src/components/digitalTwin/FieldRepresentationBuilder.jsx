import { Check, Crosshair, MapPin, RotateCcw, Trash2 } from "lucide-react";

import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect, useMemo, useState } from "react";
import FieldRepresentationPreview from "./FieldRepresentationPreview";

// --------------------------------------------------
// MAP CLICK HANDLER
// --------------------------------------------------

function MapClickHandler({ points, setPoints }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      setPoints((current) => [...current, [lat, lng]]);
    },
  });

  return null;
}

// --------------------------------------------------
// MAP CENTER CONTROLLER
// --------------------------------------------------

function MapCenterController({ center }) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;

    map.setView(center, 17);
  }, [center, map]);

  return null;
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function FieldRepresentationBuilder({ onGenerate }) {
  const [generatedRepresentation, setGeneratedRepresentation] = useState(null);
  const [mode, setMode] = useState("simple");

  // SIMPLE FIELD
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [orientation, setOrientation] = useState(0);

  // GPS FIELD
  const [points, setPoints] = useState([]);

  // MAP
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]);

  const [locationLoading, setLocationLoading] = useState(false);

  const [locationError, setLocationError] = useState("");

  // --------------------------------------------------
  // GET CURRENT LOCATION
  // --------------------------------------------------

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");

      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;

        const lng = position.coords.longitude;

        setMapCenter([lat, lng]);

        setLocationLoading(false);
      },
      (error) => {
        console.error("Location Error:", error);

        setLocationError("Unable to get your current location.");

        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // --------------------------------------------------
  // CLEAR GPS POINTS
  // --------------------------------------------------

  const handleClearPoints = () => {
    setPoints([]);
  };

  // --------------------------------------------------
  // REMOVE LAST POINT
  // --------------------------------------------------

  const handleRemoveLastPoint = () => {
    setPoints((current) => current.slice(0, -1));
  };

  // --------------------------------------------------
  // SIMPLE FIELD PREVIEW
  // --------------------------------------------------

  const simplePreview = useMemo(() => {
    const numericLength = Number(length);
    const numericWidth = Number(width);

    if (
      !numericLength ||
      !numericWidth ||
      numericLength <= 0 ||
      numericWidth <= 0
    ) {
      return null;
    }

    return {
      length: numericLength,
      width: numericWidth,
      area: numericLength * numericWidth,
    };
  }, [length, width]);

  // --------------------------------------------------
  // GENERATE REPRESENTATION
  // --------------------------------------------------

  // const handleGenerate = () => {
  //   if (mode === "simple") {
  //     if (!simplePreview) {
  //       return;
  //     }

  //     const representation = {
  //       type: "simple",
  //       dimensions: {
  //         length: Number(length),
  //         width: Number(width),
  //         unit: "meter",
  //       },
  //       orientation,
  //       area: simplePreview.area,
  //     };

  //     console.log(
  //       "Simple Field Representation:",
  //       representation
  //     );

  //     onGenerate?.(representation);

  //     return;
  //   }

  //   // GPS MODE

  //   if (points.length < 3) {
  //     alert(
  //       "Please select at least 3 field corners."
  //     );

  //     return;
  //   }

  //   const representation = {
  //     type: "gps",
  //     coordinates: points.map(
  //       ([lat, lng]) => ({
  //         latitude: lat,
  //         longitude: lng,
  //       })
  //     ),
  //   };

  //   console.log(
  //     "GPS Field Representation:",
  //     representation
  //   );

  //   onGenerate?.(representation);
  // };

  const handleGenerate = () => {
    if (mode === "simple") {
      if (!simplePreview) {
        return;
      }

      const representation = {
        type: "simple",

        dimensions: {
          length: Number(length),
          width: Number(width),
          unit: "meter",
        },

        orientation,

        area: simplePreview.area,
      };

      console.log("Generated Field Representation:", representation);

      setGeneratedRepresentation(representation);

      return;
    }

    // GPS MODE

    if (points.length < 3) {
      alert("Please select at least 3 field corners.");

      return;
    }

    const representation = {
      type: "gps",

      coordinates: points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      })),
    };

    console.log("Generated GPS Field Representation:", representation);

    setGeneratedRepresentation(representation);
  };

  if (generatedRepresentation) {
    return (
      <FieldRepresentationPreview
        representation={
          generatedRepresentation
        }
        onReset={() =>
          setGeneratedRepresentation(null)
        }
      />
    );
  }

  return (
    <div
      className="
        w-full
        rounded-[20px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-[18px]
        shadow-[0_10px_40px_rgba(0,0,0,.05)]
      "
    >
      {/* HEADER */}

      <div className="mb-[18px]">
        <h2
          className="
            text-[18px]
            font-extrabold
            tracking-[-.5px]
          "
        >
          Create Field Representation
        </h2>

        <p
          className="
            mt-[4px]
            text-[10px]
            text-[var(--color-text-muted)]
          "
        >
          Create the digital boundary of your real agricultural field.
        </p>
      </div>

      {/* MODE SELECTOR */}

      <div
        className="
          mb-[18px]
          grid
          grid-cols-2
          gap-[8px]
        "
      >
        <button
          type="button"
          onClick={() => setMode("simple")}
          className={`
            rounded-[11px]
            border
            px-[12px]
            py-[11px]
            text-[10px]
            font-bold
            transition
            ${
              mode === "simple"
                ? `
                  border-[var(--color-primary)]
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                `
                : `
                  border-[var(--color-border)]
                  text-[var(--color-text-secondary)]
                `
            }
          `}
        >
          Simple Field
          <span
            className="
              mt-[2px]
              block
              text-[8px]
              font-normal
              opacity-70
            "
          >
            Length × Width
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode("gps")}
          className={`
            rounded-[11px]
            border
            px-[12px]
            py-[11px]
            text-[10px]
            font-bold
            transition
            ${
              mode === "gps"
                ? `
                  border-[var(--color-primary)]
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                `
                : `
                  border-[var(--color-border)]
                  text-[var(--color-text-secondary)]
                `
            }
          `}
        >
          GPS Field
          <span
            className="
              mt-[2px]
              block
              text-[8px]
              font-normal
              opacity-70
            "
          >
            Select field corners
          </span>
        </button>
      </div>

      {/* SIMPLE MODE */}

      {mode === "simple" && (
        <div>
          <div
            className="
              grid
              grid-cols-1
              gap-[12px]
              md:grid-cols-2
            "
          >
            {/* LENGTH */}

            <div>
              <label
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-bold
                "
              >
                Field Length
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  placeholder="Example: 200"
                  className="
                    h-[42px]
                    w-full
                    rounded-[10px]
                    border
                    border-[var(--color-border)]
                    bg-transparent
                    px-[11px]
                    pr-[55px]
                    text-[11px]
                    outline-none
                    focus:border-[var(--color-primary)]
                  "
                />

                <span
                  className="
                    absolute
                    right-[11px]
                    top-1/2
                    -translate-y-1/2
                    text-[9px]
                    text-[var(--color-text-muted)]
                  "
                >
                  meters
                </span>
              </div>
            </div>

            {/* WIDTH */}

            <div>
              <label
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-bold
                "
              >
                Field Width
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  placeholder="Example: 100"
                  className="
                    h-[42px]
                    w-full
                    rounded-[10px]
                    border
                    border-[var(--color-border)]
                    bg-transparent
                    px-[11px]
                    pr-[55px]
                    text-[11px]
                    outline-none
                    focus:border-[var(--color-primary)]
                  "
                />

                <span
                  className="
                    absolute
                    right-[11px]
                    top-1/2
                    -translate-y-1/2
                    text-[9px]
                    text-[var(--color-text-muted)]
                  "
                >
                  meters
                </span>
              </div>
            </div>
          </div>

          {/* ORIENTATION */}

          <div className="mt-[12px]">
            <label
              className="
                mb-[5px]
                block
                text-[9px]
                font-bold
              "
            >
              Field Orientation
            </label>

            <input
              type="number"
              value={orientation}
              onChange={(event) => setOrientation(Number(event.target.value))}
              className="
                h-[42px]
                w-full
                rounded-[10px]
                border
                border-[var(--color-border)]
                bg-transparent
                px-[11px]
                text-[11px]
                outline-none
                focus:border-[var(--color-primary)]
              "
              placeholder="0 = North"
            />

            <p
              className="
                mt-[4px]
                text-[8px]
                text-[var(--color-text-muted)]
              "
            >
              0° = North, 90° = East, 180° = South
            </p>
          </div>

          {/* SIMPLE PREVIEW */}

          {simplePreview && (
            <div
              className="
                mt-[18px]
                rounded-[14px]
                border
                border-[var(--color-border)]
                bg-[var(--color-bg)]
                p-[15px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      text-[var(--color-text-muted)]
                    "
                  >
                    Generated Area
                  </p>

                  <p
                    className="
                      mt-[2px]
                      text-[18px]
                      font-extrabold
                      text-[var(--color-primary)]
                    "
                  >
                    {simplePreview.area.toLocaleString()}
                    <span
                      className="
                        ml-[4px]
                        text-[9px]
                        font-medium
                      "
                    >
                      m²
                    </span>
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-[110px]
                    w-[180px]
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      h-[80px]
                      w-[140px]
                      items-center
                      justify-center
                      rounded-[6px]
                      border-2
                      border-[var(--color-primary)]
                      bg-[var(--color-primary)]/10
                    "
                    style={{
                      transform: `rotate(${orientation}deg)`,
                    }}
                  >
                    <span
                      className="
                        text-[9px]
                        font-bold
                        text-[var(--color-primary)]
                      "
                    >
                      {simplePreview.length}m × {simplePreview.width}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GPS MODE */}

      {mode === "gps" && (
        <div>
          {/* MAP ACTIONS */}

          <div
            className="
              mb-[10px]
              flex
              flex-wrap
              gap-[7px]
            "
          >
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={locationLoading}
              className="
                flex
                h-[35px]
                items-center
                gap-[6px]
                rounded-[9px]
                border
                border-[var(--color-border)]
                px-[10px]
                text-[9px]
                font-bold
                hover:border-[var(--color-primary)]
                hover:text-[var(--color-primary)]
              "
            >
              <Crosshair size={13} />

              {locationLoading ? "Locating..." : "My Location"}
            </button>

            <button
              type="button"
              onClick={handleRemoveLastPoint}
              disabled={points.length === 0}
              className="
                flex
                h-[35px]
                items-center
                gap-[6px]
                rounded-[9px]
                border
                border-[var(--color-border)]
                px-[10px]
                text-[9px]
                font-bold
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <RotateCcw size={13} />
              Undo
            </button>

            <button
              type="button"
              onClick={handleClearPoints}
              disabled={points.length === 0}
              className="
                flex
                h-[35px]
                items-center
                gap-[6px]
                rounded-[9px]
                border
                border-red-500/20
                px-[10px]
                text-[9px]
                font-bold
                text-red-500
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Trash2 size={13} />
              Clear
            </button>
          </div>

          {/* MAP */}

          <div
            className="
              relative
              h-[430px]
              overflow-hidden
              rounded-[14px]
              border
              border-[var(--color-border)]
            "
          >
            <MapContainer
              center={mapCenter}
              zoom={17}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapCenterController center={mapCenter} />

              <MapClickHandler points={points} setPoints={setPoints} />

              {points.map(([lat, lng], index) => (
                <Marker key={`${lat}-${lng}-${index}`} position={[lat, lng]} />
              ))}

              {points.length >= 3 && (
                <Polygon
                  positions={points}
                  pathOptions={{
                    color: "#16a34a",
                    fillColor: "#22c55e",
                    fillOpacity: 0.2,
                    weight: 3,
                  }}
                />
              )}
            </MapContainer>

            {/* MAP INSTRUCTION */}

            <div
              className="
                absolute
                left-[12px]
                top-[12px]
                z-[1000]
                rounded-[9px]
                bg-white/90
                px-[10px]
                py-[7px]
                text-[9px]
                font-semibold
                shadow
                backdrop-blur-md
              "
            >
              Click each corner of your field
            </div>
          </div>

          {/* GPS STATUS */}

          <div
            className="
              mt-[10px]
              flex
              items-center
              justify-between
              rounded-[10px]
              border
              border-[var(--color-border)]
              bg-[var(--color-bg)]
              px-[11px]
              py-[9px]
            "
          >
            <div
              className="
                flex
                items-center
                gap-[6px]
              "
            >
              <MapPin size={13} className="text-[var(--color-primary)]" />

              <span
                className="
                  text-[9px]
                  font-semibold
                "
              >
                {points.length} corner
                {points.length !== 1 ? "s" : ""} selected
              </span>
            </div>

            <span
              className="
                text-[8px]
                text-[var(--color-text-muted)]
              "
            >
              Minimum 3 corners
            </span>
          </div>

          {locationError && (
            <p
              className="
                mt-[7px]
                text-[9px]
                text-red-500
              "
            >
              {locationError}
            </p>
          )}
        </div>
      )}

      {/* GENERATE BUTTON */}

      <div className="mt-[18px]">
        <button
          type="button"
          onClick={() => handleGenerate(mode)}
          disabled={mode === "simple" ? !simplePreview : points.length < 3}
          className="
            flex
            h-[44px]
            w-full
            items-center
            justify-center
            gap-[7px]
            rounded-[11px]
            bg-[var(--color-primary)]
            text-[10px]
            font-bold
            text-white
            shadow-[0_8px_20px_rgba(22,163,74,.18)]
            transition
            hover:bg-[var(--color-primary-hover)]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Check size={14} />
          Generate Field Representation
        </button>
      </div>
    </div>
  );
}
