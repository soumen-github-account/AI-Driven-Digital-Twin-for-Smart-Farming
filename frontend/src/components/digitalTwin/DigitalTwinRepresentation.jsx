
import { useEffect, useState } from "react";
import { Activity, MapPin, Ruler, Sprout } from "lucide-react";
import api from "../../services/api";

function formatNumber(value, digits = 2) {
  const number = Number(value);
  return Number.isFinite(number)
    ? number.toLocaleString(undefined, {
        maximumFractionDigits: digits,
      })
    : "—";
}

export default function DigitalTwinRepresentation({
  field,
}) {
  const [twin, setTwin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTwin() {
      setTwin(null);
      setError("");

      if (!field?.id) return;

      setLoading(true);

      try {
        // Assumes your backend route is:
        // GET /digital-twins/field/:fieldId
        const response = await api.get(
          `/digital-twins/field/${field.id}`
        );

        const data = response.data;
        const savedTwin =
          data?.digitalTwin ?? data?.twin ?? data?.data ?? data;

        if (active) {
          setTwin(savedTwin?.id ? savedTwin : null);

          if (!savedTwin?.id) {
            setError("No Digital Twin has been created for this field.");
          }
        }
      } catch (err) {
        if (active) {
          const status = err?.response?.status;

          setError(
            status === 404
              ? "No Digital Twin has been created for this field."
              : err?.response?.data?.message ||
                  "Could not load Digital Twin data."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTwin();

    return () => {
      active = false;
    };
  }, [field?.id]);

  if (!field) {
    return (
      <section className="rounded-2xl border border-[var(--color-border)] p-6">
        <h2 className="text-base font-bold text-[var(--color-text-primary)]">
          Digital Twin Representation
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Select a farm and field from the header to view its representation.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="rounded-2xl border border-[var(--color-border)] p-6">
        Loading Digital Twin data...
      </section>
    );
  }

  if (error || !twin) {
    return (
      <section className="rounded-2xl border border-[var(--color-border)] p-6">
        <h2 className="text-base font-bold text-[var(--color-text-primary)]">
          {field.name} — Digital Twin
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {error || "Digital Twin data is not available."}
        </p>
      </section>
    );
  }

  const geometry = twin.geometryJson || {};
  const coordinates =
    twin.localCoordinates || geometry.coordinates || [];
  const gpsCoordinates =
    twin.gpsCoordinates || geometry.gpsCoordinates || [];
  const area = twin.area ?? geometry.area;
  const perimeter = twin.perimeter ?? geometry.perimeter;

  const metrics = [
    {
      label: "Area",
      value: `${formatNumber(area)} ${twin.areaUnit || "sqm"}`,
      icon: Ruler,
    },
    {
      label: "Perimeter",
      value: `${formatNumber(perimeter)} m`,
      icon: Activity,
    },
    {
      label: "Crop",
      value: twin.crop || field.crop || "—",
      icon: Sprout,
    },
    {
      label: "GPS boundary points",
      value: String(gpsCoordinates.length),
      icon: MapPin,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Digital Twin Representation
          </p>
          <h2 className="mt-1 text-lg font-extrabold text-[var(--color-text-primary)]">
            {twin.name}
          </h2>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            {field.name} · {twin.status || "Unknown status"}
          </p>
        </div>

        <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold text-[var(--color-primary)]">
          {twin.geometryType || geometry.type || "Polygon"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--color-border)] p-4"
          >
            <Icon size={18} className="text-[var(--color-primary)]" />
            <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
              {label}
            </p>
            <p className="mt-1 break-words text-sm font-bold text-[var(--color-text-primary)]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] p-4">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            Local boundary coordinates
          </h3>

          <pre className="mt-3 max-h-64 overflow-auto rounded-xl bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-secondary)]">
            {JSON.stringify(coordinates, null, 2)}
          </pre>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] p-4">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            GPS boundary coordinates
          </h3>

          <pre className="mt-3 max-h-64 overflow-auto rounded-xl bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-secondary)]">
            {JSON.stringify(gpsCoordinates, null, 2)}
          </pre>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] p-4">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
          Twin details
        </h3>
        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
          Season: {twin.season || "—"}
        </p>
        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
          Coordinate system:{" "}
          {twin.coordinateSystem || geometry.coordinateSystem || "—"}
        </p>
        <p className="mt-2 whitespace-pre-wrap text-xs text-[var(--color-text-secondary)]">
          Notes: {twin.notes || "No notes"}
        </p>
      </div>
    </section>
  );
}
