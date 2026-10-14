
import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Sprout,
  Ruler,
  Droplets,
  CalendarDays,
  FileText,
  ChevronDown,
  Image,
  Loader2,
} from "lucide-react";

import { getMyFarms } from "../../services/farm.service";

function AddFieldDialog({
  isOpen,
  onClose,
  onSubmit,
}) {
  // =========================================================
  // FARMS STATE
  // =========================================================

  const [farms, setFarms] = useState([]);
  const [loadingFarms, setLoadingFarms] = useState(false);
  const [farmError, setFarmError] = useState("");

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    fieldName: "",
    farmId: "",
    area: "",
    unit: "acre",
    crop: "",
    soilType: "",
    irrigation: "",
    plantingDate: "",
    notes: "",
  });

  // =========================================================
  // IMAGE STATE
  // =========================================================

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // =========================================================
  // SUBMIT STATE
  // =========================================================

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // =========================================================
  // GET MY FARMS
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    const loadFarms = async () => {
      try {
        setLoadingFarms(true);
        setFarmError("");

        const response = await getMyFarms();

        setFarms(response?.farms || []);
      } catch (error) {
        console.error("Get My Farms Error:", error);

        setFarms([]);

        setFarmError(
          error?.response?.data?.message ||
            "Failed to load your farms"
        );
      } finally {
        setLoadingFarms(false);
      }
    };

    loadFarms();
  }, [isOpen]);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE IMAGE CHANGE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional image validation
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSubmitError(
        "Please upload a JPG, PNG or WEBP image."
      );

      e.target.value = "";
      return;
    }

    // Save actual File object
    setImage(file);

    // Remove previous preview URL if any
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    setSubmitError("");
  };

  // =========================================================
  // CLEAN IMAGE PREVIEW
  // =========================================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      fieldName: "",
      farmId: "",
      area: "",
      unit: "acre",
      crop: "",
      soilType: "",
      irrigation: "",
      plantingDate: "",
      notes: "",
    });

    setImage(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setSubmitError("");
  };

  // =========================================================
  // CLOSE DIALOG
  // =========================================================

  const handleClose = () => {
    if (submitting) return;

    resetForm();
    onClose?.();
  };

  // =========================================================
  // SUBMIT FIELD
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");

    try {
      setSubmitting(true);

      // ---------------------------------------------
      // CREATE MULTIPART FORM DATA
      // ---------------------------------------------

      const data = new FormData();

      // ---------------------------------------------
      // APPEND FORM VALUES
      // ---------------------------------------------

      data.append("name", formData.fieldName);
      data.append("farmId", formData.farmId);
      data.append("area", formData.area);
      data.append("areaUnit", formData.unit);
      data.append("crop", formData.crop);
      data.append("soilType", formData.soilType);
      data.append("irrigationType", formData.irrigation);
      data.append("plantingDate", formData.plantingDate);
      data.append("notes", formData.notes);

      // ---------------------------------------------
      // APPEND IMAGE
      // ---------------------------------------------

      if (image) {
        data.append("image", image);
      }

      onSubmit?.(data);

      // ---------------------------------------------
      // RESET
      // ---------------------------------------------

      resetForm();

      // ---------------------------------------------
      // CLOSE
      // ---------------------------------------------

      onClose?.();
    } catch (error) {
      console.error(
        "Create Field Error:",
        error?.response?.data?.message ||
          error.message
      );

      setSubmitError(
        error?.response?.data?.message ||
          "Failed to create field. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/45
        px-4
        backdrop-blur-[8px]
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* =====================================================
          DIALOG
      ===================================================== */}

      <div
        className="
          relative
          w-full
          max-w-[590px]
          overflow-hidden
          rounded-[24px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-[0_25px_80px_rgba(0,0,0,.35)]
          animate-[dialogIn_.2s_ease-out]
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--color-border)]
            px-[24px]
            py-[20px]
          "
        >
          <div className="flex items-center gap-[13px]">
            <div
              className="
                flex
                h-[42px]
                w-[42px]
                items-center
                justify-center
                rounded-[13px]
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
              "
            >
              <Sprout size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                className="
                  text-[18px]
                  font-bold
                  tracking-[-0.4px]
                  text-[var(--color-text-primary)]
                "
              >
                Add New Field
              </h2>

              <p
                className="
                  mt-[2px]
                  text-[10px]
                  text-[var(--color-text-secondary)]
                "
              >
                Add a field to one of your farms
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              rounded-full
              text-[var(--color-text-muted)]
              transition
              hover:bg-[var(--color-surface-secondary)]
              hover:text-[var(--color-text-primary)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form onSubmit={handleSubmit}>
          <div
            className="
              max-h-[68vh]
              overflow-y-auto
              px-[24px]
              py-[21px]
            "
          >
            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <SectionTitle
              title="Field Information"
              description="Basic details about your field"
            />

            <div className="mt-[15px] space-y-[16px]">
              {/* FIELD NAME */}

              <FieldInput
                label="Field Name"
                name="fieldName"
                value={formData.fieldName}
                onChange={handleChange}
                placeholder="e.g. North Field"
                icon={Sprout}
                required
              />

              {/* FARM */}

              <SelectField
                label="Farm"
                name="farmId"
                value={formData.farmId}
                onChange={handleChange}
                icon={MapPin}
                required
              >
                <option value="">
                  {loadingFarms
                    ? "Loading farms..."
                    : "Select a farm"}
                </option>

                {farms.map((farm) => (
                  <option
                    key={farm.id}
                    value={farm.id}
                  >
                    {farm.name}
                  </option>
                ))}
              </SelectField>

              {/* FARM ERROR */}

              {farmError && (
                <div
                  className="
                    rounded-[9px]
                    border
                    border-red-500/20
                    bg-red-500/5
                    px-[11px]
                    py-[9px]
                    text-[10px]
                    font-medium
                    text-red-500
                  "
                >
                  {farmError}
                </div>
              )}

              {/* NO FARM */}

              {!loadingFarms &&
                !farmError &&
                farms.length === 0 && (
                  <div
                    className="
                      rounded-[9px]
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-surface-secondary)]/40
                      px-[11px]
                      py-[9px]
                      text-[10px]
                      text-[var(--color-text-muted)]
                    "
                  >
                    You don't have any farms yet.
                    Please create a farm first.
                  </div>
                )}

              {/* AREA */}

              <div className="grid grid-cols-[1fr_145px] gap-[12px]">
                <FieldInput
                  label="Field Area"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 12.5"
                  icon={Ruler}
                  min="0"
                  step="0.1"
                  required
                />

                <SelectField
                  label="Unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="acre">
                    Acre
                  </option>

                  <option value="hectare">
                    Hectare
                  </option>

                  <option value="bigha">
                    Bigha
                  </option>
                </SelectField>
              </div>
            </div>

            {/* =================================================
                CROP INFORMATION
            ================================================= */}

            <div className="mt-[27px]">
              <SectionTitle
                title="Crop & Soil"
                description="Configure the field's agricultural details"
              />

              <div
                className="
                  mt-[15px]
                  grid
                  grid-cols-1
                  gap-[16px]
                  sm:grid-cols-2
                "
              >
                {/* MAIN CROP */}

                <SelectField
                  label="Main Crop"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  icon={Sprout}
                  required
                >
                  <option value="">
                    Select crop
                  </option>

                  <option value="wheat">
                    Wheat
                  </option>

                  <option value="rice">
                    Rice
                  </option>

                  <option value="maize">
                    Maize
                  </option>

                  <option value="potato">
                    Potato
                  </option>

                  <option value="tomato">
                    Tomato
                  </option>

                  <option value="soybean">
                    Soybean
                  </option>

                  <option value="cotton">
                    Cotton
                  </option>

                  <option value="vegetables">
                    Vegetables
                  </option>

                  <option value="other">
                    Other
                  </option>
                </SelectField>

                {/* SOIL */}

                <SelectField
                  label="Soil Type"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                >
                  <option value="">
                    Select soil
                  </option>

                  <option value="loamy">
                    Loamy
                  </option>

                  <option value="clay">
                    Clay
                  </option>

                  <option value="sandy">
                    Sandy
                  </option>

                  <option value="silty">
                    Silty
                  </option>

                  <option value="peaty">
                    Peaty
                  </option>

                  <option value="chalky">
                    Chalky
                  </option>

                  <option value="mixed">
                    Mixed
                  </option>
                </SelectField>

                {/* IRRIGATION */}

                <SelectField
                  label="Irrigation Type"
                  name="irrigation"
                  value={formData.irrigation}
                  onChange={handleChange}
                  icon={Droplets}
                >
                  <option value="">
                    Select irrigation
                  </option>

                  <option value="drip">
                    Drip Irrigation
                  </option>

                  <option value="sprinkler">
                    Sprinkler
                  </option>

                  <option value="surface">
                    Surface Irrigation
                  </option>

                  <option value="rainfed">
                    Rainfed
                  </option>

                  <option value="center-pivot">
                    Center Pivot
                  </option>
                </SelectField>

                {/* PLANTING DATE */}

                <FieldInput
                  label="Planting Date"
                  name="plantingDate"
                  type="date"
                  value={formData.plantingDate}
                  onChange={handleChange}
                  icon={CalendarDays}
                />
              </div>
            </div>

            {/* =================================================
                FIELD IMAGE
            ================================================= */}

            <div className="mt-[27px]">
              <SectionTitle
                title="Field Image"
                description="Add an image of your field"
              />

              <div className="mt-[14px]">
                <label
                  className="
                    relative
                    flex
                    min-h-[150px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[12px]
                    border
                    border-dashed
                    border-[var(--color-border)]
                    bg-[var(--color-surface-secondary)]/30
                    transition
                    hover:border-[var(--color-primary)]
                    hover:bg-[var(--color-primary)]/5
                  "
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Field preview"
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          bg-black/35
                        "
                      >
                        <div
                          className="
                            rounded-[8px]
                            bg-black/50
                            px-[12px]
                            py-[7px]
                            text-[10px]
                            font-semibold
                            text-white
                          "
                        >
                          Change image
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        size={24}
                        strokeWidth={1.5}
                        className="text-[var(--color-text-muted)]"
                      />

                      <span
                        className="
                          mt-[8px]
                          text-[11px]
                          font-semibold
                          text-[var(--color-text-secondary)]
                        "
                      >
                        Upload field image
                      </span>

                      <span
                        className="
                          mt-[3px]
                          text-[9px]
                          text-[var(--color-text-muted)]
                        "
                      >
                        JPG, PNG or WEBP
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    name="image"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {image && (
                  <p
                    className="
                      mt-[6px]
                      truncate
                      text-[9px]
                      text-[var(--color-text-muted)]
                    "
                  >
                    {image.name}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                NOTES
            ================================================= */}

            <div className="mt-[27px]">
              <SectionTitle
                title="Additional Notes"
                description="Optional information about this field"
              />

              <div className="relative mt-[14px]">
                <FileText
                  size={16}
                  strokeWidth={1.6}
                  className="
                    absolute
                    left-[13px]
                    top-[14px]
                    text-[var(--color-text-muted)]
                  "
                />

                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add notes about this field..."
                  className="
                    w-full
                    resize-none
                    rounded-[10px]
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    px-[39px]
                    py-[11px]
                    text-[11px]
                    font-medium
                    text-[var(--color-text-primary)]
                    outline-none
                    placeholder:text-[var(--color-text-muted)]
                    transition
                    focus:border-[var(--color-primary)]
                    focus:ring-[3px]
                    focus:ring-[var(--color-primary)]/10
                  "
                />
              </div>
            </div>

            {/* =================================================
                SUBMIT ERROR
            ================================================= */}

            {submitError && (
              <div
                className="
                  mt-[16px]
                  rounded-[9px]
                  border
                  border-red-500/20
                  bg-red-500/5
                  px-[11px]
                  py-[9px]
                  text-[10px]
                  font-medium
                  text-red-500
                "
              >
                {submitError}
              </div>
            )}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-[10px]
              border-t
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]/30
              px-[24px]
              py-[16px]
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="
                h-[42px]
                rounded-[10px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-[20px]
                text-[11px]
                font-semibold
                text-[var(--color-text-secondary)]
                transition
                hover:border-[var(--color-border-hover)]
                hover:text-[var(--color-text-primary)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loadingFarms ||
                farms.length === 0 ||
                submitting
              }
              className="
                flex
                h-[42px]
                items-center
                justify-center
                gap-[8px]
                rounded-[10px]
                bg-[var(--color-primary)]
                px-[22px]
                text-[11px]
                font-bold
                text-white
                shadow-[0_6px_18px_rgba(22,163,74,.20)]
                transition
                hover:-translate-y-[1px]
                hover:bg-[var(--color-primary-hover)]
                hover:shadow-[0_9px_24px_rgba(22,163,74,.28)]
                active:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {submitting ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />

                  Creating...
                </>
              ) : loadingFarms ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />

                  Loading...
                </>
              ) : (
                <>
                  <Sprout size={15} />
                  Add Field
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
  description,
}) {
  return (
    <div>
      <h3
        className="
          text-[12px]
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-[2px]
          text-[9px]
          text-[var(--color-text-muted)]
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function FieldInput({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  min,
  step,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="
          mb-[6px]
          block
          text-[10px]
          font-semibold
          text-[var(--color-text-primary)]
        "
      >
        {label}

        {required && (
          <span className="ml-[3px] text-[var(--color-primary)]">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.6}
            className="
              absolute
              left-[13px]
              top-1/2
              -translate-y-1/2
              text-[var(--color-text-muted)]
            "
          />
        )}

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
          className={`
            h-[43px]
            w-full
            rounded-[10px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            ${Icon ? "pl-[39px]" : "pl-[13px]"}
            pr-[12px]
            text-[11px]
            font-medium
            text-[var(--color-text-primary)]
            outline-none
            placeholder:text-[var(--color-text-muted)]
            transition-all
            focus:border-[var(--color-primary)]
            focus:ring-[3px]
            focus:ring-[var(--color-primary)]/10
          `}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  name,
  icon: Icon,
  children,
  required = false,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="
          mb-[6px]
          block
          text-[10px]
          font-semibold
          text-[var(--color-text-primary)]
        "
      >
        {label}

        {required && (
          <span className="ml-[3px] text-[var(--color-primary)]">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.6}
            className="
              pointer-events-none
              absolute
              left-[13px]
              top-1/2
              z-10
              -translate-y-1/2
              text-[var(--color-text-muted)]
            "
          />
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            h-[43px]
            w-full
            appearance-none
            rounded-[10px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            ${Icon ? "pl-[39px]" : "pl-[13px]"}
            pr-[35px]
            text-[11px]
            font-medium
            text-[var(--color-text-primary)]
            outline-none
            transition-all
            focus:border-[var(--color-primary)]
            focus:ring-[3px]
            focus:ring-[var(--color-primary)]/10
          `}
        >
          {children}
        </select>

        <ChevronDown
          size={15}
          strokeWidth={1.7}
          className="
            pointer-events-none
            absolute
            right-[12px]
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
          "
        />
      </div>
    </div>
  );
}

export default AddFieldDialog;
