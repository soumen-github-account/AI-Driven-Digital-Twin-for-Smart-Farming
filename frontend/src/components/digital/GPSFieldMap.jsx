import { useCallback, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

/* -------------------------------------------------------
   Numbered GPS Point Icon
------------------------------------------------------- */

const createPointIcon = (number) => {
  return L.divIcon({
    className: "agri-gps-point-wrapper",
    html: `
      <div
        style="
          width:28px;
          height:28px;
          border-radius:9999px;
          background:#16a34a;
          border:3px solid white;
          box-shadow:0 4px 14px rgba(0,0,0,.25);
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-size:11px;
          font-weight:800;
          font-family:Inter,Arial,sans-serif;
        "
      >
        ${number}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

/* -------------------------------------------------------
   Map Click Handler
------------------------------------------------------- */

function MapClickHandler({ onAddPoint, disabled }) {
  useMapEvents({
    click(event) {
      if (disabled) {
        return;
      }

      const { lat, lng } = event.latlng;

      onAddPoint([lng, lat]);
    },
  });

  return null;
}

/* -------------------------------------------------------
   Map Controller
------------------------------------------------------- */

function MapController({
  onMapReady,
}) {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  useEffect(() => {
    const handler = (event) => {
      const { lat, lng } =
        event.detail || {};

      if (
        Number.isFinite(lat) &&
        Number.isFinite(lng)
      ) {
        map.flyTo(
          [lat, lng],
          17,
          {
            duration: 1.2,
          }
        );
      }
    };

    window.addEventListener(
      "agritwin:focus-location",
      handler
    );

    return () => {
      window.removeEventListener(
        "agritwin:focus-location",
        handler
      );
    };
  }, [map]);

  return null;
}

/* -------------------------------------------------------
   Main Component
------------------------------------------------------- */

export default function GPSFieldMap({
  points = [],
  onChange,
  disabled = false,
  initialCenter = DEFAULT_CENTER,
  initialZoom = DEFAULT_ZOOM,
}) {
  const handleMapReady = useCallback(() => {}, []);

  const handleAddPoint = useCallback(
    (point) => {
      if (disabled) {
        return;
      }

      const nextPoints = [
        ...points,
        point,
      ];

      onChange?.(nextPoints);
    },
    [disabled, onChange, points]
  );

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by this browser."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        window.dispatchEvent(
          new CustomEvent(
            "agritwin:focus-location",
            {
              detail: {
                lat,
                lng,
              },
            }
          )
        );
      },
      () => {
        alert(
          "Unable to get your current location. Please allow location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const mapPoints = points.map(
    ([lng, lat]) => [lat, lng]
  );

  return (
    <div
      className="
        relative
        h-full
        min-h-[520px]
        w-full
        overflow-hidden
        rounded-[18px]
        border
        border-black/[0.06]
        bg-slate-100
        shadow-[0_12px_40px_rgba(15,23,42,.08)]
      "
    >
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom
        doubleClickZoom={false}
        className="h-full min-h-[520px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          onAddPoint={handleAddPoint}
          disabled={disabled}
        />

        <MapController
          onMapReady={handleMapReady}
        />

        {mapPoints.length >= 2 && (
          <Polygon
            positions={mapPoints}
            pathOptions={{
              color: "#16a34a",
              weight: 3,
              fillColor: "#22c55e",
              fillOpacity: 0.18,
            }}
          />
        )}

        {points.map(
          ([lng, lat], index) => (
            <Marker
              key={`${lng}-${lat}-${index}`}
              position={[lat, lng]}
              icon={createPointIcon(
                index + 1
              )}
            />
          )
        )}
      </MapContainer>

      {/* -------------------------------------------------
          Top Instruction
      ------------------------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          left-[16px]
          top-[16px]
          z-[1000]
          max-w-[300px]
          rounded-[12px]
          border
          border-white/50
          bg-white/90
          px-[13px]
          py-[10px]
          shadow-[0_8px_25px_rgba(15,23,42,.12)]
          backdrop-blur-xl
        "
      >
        <p
          className="
            text-[11px]
            font-bold
            text-slate-800
          "
        >
          Mark field boundary
        </p>

        <p
          className="
            mt-[2px]
            text-[9px]
            leading-[14px]
            text-slate-500
          "
        >
          Click each corner of your field
          in clockwise or anticlockwise order.
        </p>
      </div>

      {/* -------------------------------------------------
          Point Counter
      ------------------------------------------------- */}

      <div
        className="
          absolute
          right-[16px]
          top-[16px]
          z-[1000]
          rounded-[10px]
          border
          border-white/50
          bg-white/90
          px-[11px]
          py-[8px]
          shadow-[0_8px_25px_rgba(15,23,42,.12)]
          backdrop-blur-xl
        "
      >
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[.7px]
            text-slate-400
          "
        >
          Boundary points
        </p>

        <p
          className="
            mt-[1px]
            text-[17px]
            font-extrabold
            text-green-600
          "
        >
          {points.length}
        </p>
      </div>

      {/* -------------------------------------------------
          Current Location
      ------------------------------------------------- */}

      <button
        type="button"
        onClick={handleLocate}
        className="
          absolute
          bottom-[18px]
          right-[18px]
          z-[1000]
          flex
          h-[40px]
          items-center
          gap-[7px]
          rounded-[11px]
          border
          border-white/70
          bg-white/95
          px-[12px]
          text-[10px]
          font-bold
          text-slate-700
          shadow-[0_8px_25px_rgba(15,23,42,.15)]
          backdrop-blur-xl
          transition
          hover:bg-white
          hover:text-green-600
        "
      >
        <span className="text-[14px]">
          ◎
        </span>

        My location
      </button>

      {/* -------------------------------------------------
          Map State Overlay
      ------------------------------------------------- */}

      {points.length === 0 && (
        <div
          className="
            pointer-events-none
            absolute
            bottom-[18px]
            left-1/2
            z-[1000]
            -translate-x-1/2
            rounded-full
            bg-slate-900/85
            px-[14px]
            py-[7px]
            text-[9px]
            font-semibold
            text-white
            shadow-lg
          "
        >
          Click on the map to add your first point
        </div>
      )}

      {points.length > 0 &&
        points.length < 3 && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-[18px]
              left-1/2
              z-[1000]
              -translate-x-1/2
              rounded-full
              bg-slate-900/85
              px-[14px]
              py-[7px]
              text-[9px]
              font-semibold
              text-white
              shadow-lg
            "
          >
            Add at least {3 - points.length}{" "}
            more point
            {3 - points.length > 1
              ? "s"
              : ""}
          </div>
        )}
    </div>
  );
}