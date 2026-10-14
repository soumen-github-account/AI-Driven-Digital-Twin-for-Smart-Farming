
import { useEffect, useState } from "react";
import { ChevronDown, Sprout } from "lucide-react";
import { getMyFarms } from "../../services/farm.service";
import { getMyFieldsByFarmId } from "../../services/field.service";

const SAVED_FARM_KEY = "agritwin_selected_farm_id";
const SAVED_FIELD_KEY = "agritwin_selected_field_id";

function extractList(response, key) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.data?.[key])) return response.data[key];
  return [];
}

export default function DigitalTwinFieldSelector({
  onFieldChange,
}) {
  const [farms, setFarms] = useState([]);
  const [fields, setFields] = useState([]);
  const [farmId, setFarmId] = useState(
    () => localStorage.getItem(SAVED_FARM_KEY) || ""
  );
  const [fieldId, setFieldId] = useState(
    () => localStorage.getItem(SAVED_FIELD_KEY) || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFarms() {
      try {
        const response = await getMyFarms();
        if (!active) return;

        const list = extractList(response, "farms");
        setFarms(list);

        const savedFarmId = localStorage.getItem(SAVED_FARM_KEY);
        const savedFieldId = localStorage.getItem(SAVED_FIELD_KEY);

        if (savedFarmId && list.some((farm) => farm.id === savedFarmId)) {
          setFarmId(savedFarmId);
          setFieldId(savedFieldId || "");
        } else {
          setFarmId("");
          setFieldId("");
          localStorage.removeItem(SAVED_FARM_KEY);
          localStorage.removeItem(SAVED_FIELD_KEY);
        }
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.message || "Could not load farms."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFarms();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadFields() {
      setFields([]);

      if (!farmId) return;

      try {
        const response = await getMyFieldsByFarmId(farmId);
        if (!active) return;

        const list = extractList(response, "fields");
        setFields(list);

        const savedFieldId = localStorage.getItem(SAVED_FIELD_KEY);
        const validField = list.find(
          (field) => field.id === savedFieldId
        );

        if (validField) {
          setFieldId(validField.id);
          onFieldChange?.(validField);
        } else {
          setFieldId("");
          localStorage.removeItem(SAVED_FIELD_KEY);
          onFieldChange?.(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.message || "Could not load fields."
          );
        }
      }
    }

    loadFields();

    return () => {
      active = false;
    };
  }, [farmId]);

  function handleFarmChange(event) {
    const nextFarmId = event.target.value;

    setFarmId(nextFarmId);
    setFieldId("");
    setFields([]);
    setError("");

    if (nextFarmId) {
      localStorage.setItem(SAVED_FARM_KEY, nextFarmId);
    } else {
      localStorage.removeItem(SAVED_FARM_KEY);
    }

    localStorage.removeItem(SAVED_FIELD_KEY);
    onFieldChange?.(null);
  }

  function handleFieldChange(event) {
    const nextFieldId = event.target.value;
    const selectedField =
      fields.find((field) => field.id === nextFieldId) || null;

    setFieldId(nextFieldId);

    if (selectedField) {
      localStorage.setItem(SAVED_FIELD_KEY, selectedField.id);
    } else {
      localStorage.removeItem(SAVED_FIELD_KEY);
    }

    onFieldChange?.(selectedField);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <select
          value={farmId}
          onChange={handleFarmChange}
          disabled={loading}
          aria-label="Select farm"
          className="h-10 max-w-[190px] appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-3 pr-9 text-xs font-semibold text-[var(--color-text-primary)] outline-none"
        >
          <option value="">
            {loading ? "Loading farms..." : "Select farm"}
          </option>

          {farms.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>

      <div className="relative">
        <Sprout
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]"
        />

        <select
          value={fieldId}
          onChange={handleFieldChange}
          disabled={!farmId || fields.length === 0}
          aria-label="Select field"
          className="h-10 max-w-[190px] appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-8 pr-9 text-xs font-semibold text-[var(--color-text-primary)] outline-none"
        >
          <option value="">Select field</option>

          {fields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name}
              {field.digitalTwin ? " · Twin created" : ""}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>

      {error && (
        <span className="w-full text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
