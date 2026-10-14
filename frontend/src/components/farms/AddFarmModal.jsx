import { X, Ruler, Sprout, ImagePlus, ChevronDown, Check } from "lucide-react";

import { useEffect, useState } from "react";

import LocationPicker from "../location/LocationPicker";

const initialFormData = {
  farmName: "",
  farmType: "Crop Farm",

  city: "",
  state: "",
  country: "India",
  pincode: "",

  latitude: null,
  longitude: null,

  area: "",
  unit: "hectares",

  mainCrop: "",
  description: "",
  tatus: "ACTIVE",

  image: null,
};

function AddFarmModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState(initialFormData);

  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    /* 5MB validation */

    if (file.size > 5 * 1024 * 1024) {
      setError("Farm image must be smaller than 5MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));

    setError("");
  };

  const handleLocationChange = ({ latitude, longitude }) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!formData.farmName.trim()) {
      setError("Please enter the farm name.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Please enter the city.");
      return;
    }

    if (!formData.state.trim()) {
      setError("Please enter the state.");
      return;
    }

    if (!formData.pincode.trim()) {
      setError("Please enter the pincode.");
      return;
    }

    if (!formData.area) {
      setError("Please enter the farm area.");
      return;
    }

    if (Number(formData.area) <= 0) {
      setError("Farm area must be greater than 0.");
      return;
    }

    if (
      typeof formData.latitude !== "number" ||
      typeof formData.longitude !== "number"
    ) {
      setError("Please select the farm location from the map.");
      return;
    }

    const farmData = new FormData();

    // =========================
    // BASIC
    // =========================

    farmData.append("name", formData.farmName.trim());

    farmData.append("description", formData.description.trim());

    farmData.append("farmType", formData.farmType);

    // =========================
    // LOCATION
    // =========================

    farmData.append("city", formData.city.trim());

    farmData.append("state", formData.state.trim());

    farmData.append("country", formData.country.trim() || "India");

    farmData.append("pincode", formData.pincode.trim());

    farmData.append("latitude", String(formData.latitude));

    farmData.append("longitude", String(formData.longitude));

    // =========================
    // FARM DETAILS
    // =========================

    farmData.append("area", String(Number(formData.area)));

    farmData.append("areaUnit", formData.unit);

    farmData.append("mainCrop", formData.mainCrop.trim());

    farmData.append("farmStatus", formData.status);

    // =========================
    // IMAGE
    // =========================

    if (formData.image) {
      farmData.append("image", formData.image);
    }

    // =========================
    // SEND TO PARENT
    // =========================

    onAdd?.(farmData);

    // resetForm();
    // onClose();
  };

  const resetForm = () => {
    setFormData(initialFormData);

    setPreview(null);

    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  /* =========================================
     ESCAPE KEY
  ========================================= */

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  /* =========================================
     NOT RENDER
  ========================================= */

  if (!isOpen) return null;

  /* =========================================
     UI
  ========================================= */

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        p-4
      "
    >
      {/* BACKDROP */}

      <div
        onClick={handleClose}
        className="
          absolute
          inset-0
          bg-black/55
          backdrop-blur-[8px]
        "
      />

      {/* MODAL */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[620px]
          max-h-[92vh]
          overflow-y-auto
          rounded-[24px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-[0_25px_80px_rgba(0,0,0,.28)]
          animate-[modalIn_.22s_ease-out]
        "
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            sticky
            top-0
            z-20
            flex
            items-center
            justify-between
            border-b
            border-[var(--color-border)]
            bg-[var(--color-surface)]/95
            px-[24px]
            py-[19px]
            backdrop-blur-xl
          "
        >
          <div className="flex items-center gap-[12px]">
            <div
              className="
                flex
                h-[42px]
                w-[42px]
                items-center
                justify-center
                rounded-[13px]
                bg-[var(--color-primary)]/12
                text-[var(--color-primary)]
              "
            >
              <Sprout size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                className="
                  text-[17px]
                  font-bold
                  tracking-[-0.4px]
                  text-[var(--color-text-primary)]
                "
              >
                Add New Farm
              </h2>

              <p
                className="
                  mt-[2px]
                  text-[10px]
                  text-[var(--color-text-secondary)]
                "
              >
                Create a new farm for your digital twin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              rounded-full
              bg-[var(--color-surface-secondary)]
              text-[var(--color-text-secondary)]
              transition
              hover:bg-[var(--color-border)]
              hover:text-[var(--color-text-primary)]
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-[20px] px-[24px] py-[23px]">
            {/* =====================================
                ERROR
            ===================================== */}

            {error && (
              <div
                className="
                  rounded-[10px]
                  border
                  border-red-500/20
                  bg-red-500/5
                  px-[12px]
                  py-[9px]
                  text-[10px]
                  font-semibold
                  text-red-500
                "
              >
                {error}
              </div>
            )}

            {/* =====================================
                FARM IMAGE
            ===================================== */}

            <div>
              <label className={labelClass}>
                Farm Image
                <span className="font-normal text-[var(--color-text-muted)]">
                  {" "}
                  (Optional)
                </span>
              </label>

              <label
                className="
                  relative
                  flex
                  h-[135px]
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-dashed
                  border-[var(--color-border)]
                  bg-[var(--color-surface-secondary)]/45
                  transition
                  hover:border-[var(--color-primary)]
                  hover:bg-[var(--color-primary)]/[0.04]
                "
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Farm preview"
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
                        bg-black/20
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        h-[38px]
                        w-[38px]
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[var(--color-primary)]
                        shadow-lg
                      "
                    >
                      <ImagePlus size={18} />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        flex
                        h-[38px]
                        w-[38px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--color-primary)]/10
                        text-[var(--color-primary)]
                      "
                    >
                      <ImagePlus size={18} />
                    </div>

                    <p
                      className="
                        mt-[8px]
                        text-[11px]
                        font-semibold
                        text-[var(--color-text-primary)]
                      "
                    >
                      Upload farm image
                    </p>

                    <p
                      className="
                        mt-[2px]
                        text-[9px]
                        text-[var(--color-text-muted)]
                      "
                    >
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* =====================================
                NAME + TYPE
            ===================================== */}

            <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <InputField
                label="Farm Name"
                name="farmName"
                placeholder="e.g. Green Valley Farm"
                value={formData.farmName}
                onChange={handleChange}
                required
              />

              <div>
                <label className={labelClass}>Farm Type</label>

                <div className="relative">
                  <select
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option>Crop Farm</option>
                    <option>Organic Farm</option>
                    <option>Mixed Farm</option>
                    <option>Livestock Farm</option>
                    <option>Research Farm</option>
                    <option>Greenhouse Farm</option>
                  </select>

                  <ChevronDown
                    size={15}
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
            </div>

            {/* =====================================
                LOCATION
            ===================================== */}

            <div>
              <div className="mb-[10px]">
                <label className={labelClass}>Farm Location</label>

                <p
                  className="
                    mt-[2px]
                    text-[9px]
                    text-[var(--color-text-muted)]
                  "
                >
                  Enter the address details and select the exact location from
                  the map.
                </p>
              </div>

              {/* CITY + STATE */}

              <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
                <InputField
                  label="City"
                  name="city"
                  placeholder="e.g. Kolkata"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="State"
                  name="state"
                  placeholder="e.g. West Bengal"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* COUNTRY + PINCODE */}

              <div className="mt-[12px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
                <InputField
                  label="Country"
                  name="country"
                  placeholder="e.g. India"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Pincode"
                  name="pincode"
                  type="text"
                  placeholder="e.g. 700001"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* MAP */}

              <div className="mt-[14px]">
                <label
                  className="
                    mb-[6px]
                    block
                    text-[10px]
                    font-semibold
                    text-[var(--color-text-primary)]
                  "
                >
                  Select Exact Location
                </label>

                <LocationPicker
                  value={
                    formData.latitude !== null && formData.longitude !== null
                      ? {
                          latitude: formData.latitude,
                          longitude: formData.longitude,
                        }
                      : null
                  }
                  onChange={handleLocationChange}
                  height="260px"
                />
              </div>
            </div>

            {/* =====================================
                AREA + UNIT + CROP
            ===================================== */}

            <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <div>
                <label className={labelClass}>Farm Area</label>

                <div className="flex gap-[7px]">
                  <div className="relative flex-1">
                    <Ruler
                      size={15}
                      strokeWidth={1.7}
                      className="
                        absolute
                        left-[12px]
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-muted)]
                      "
                    />

                    <input
                      name="area"
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="78.5"
                      className={`${inputClass} pl-[38px]`}
                      required
                    />
                  </div>

                  <div className="relative w-[105px]">
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="hectares">ha</option>

                      <option value="acres">acres</option>

                      <option value="bigha">bigha</option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="
                        pointer-events-none
                        absolute
                        right-[10px]
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-muted)]
                      "
                    />
                  </div>
                </div>
              </div>

              <InputField
                label="Main Crop"
                name="mainCrop"
                placeholder="e.g. Wheat"
                value={formData.mainCrop}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClass}>Farm Status</label>

              <div className="grid grid-cols-2 gap-[10px]">
                {["ACTIVE", "INACTIVE"].map((status) => {
                  const active = formData.status === status;

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          status,
                        }))
                      }
                      className={`
                          flex
                          h-[43px]
                          items-center
                          justify-center
                          gap-[7px]
                          rounded-[9px]
                          border
                          text-[11px]
                          font-semibold
                          transition-all
                          ${
                            active
                              ? `
                                border-[var(--color-primary)]
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                              `
                              : `
                                border-[var(--color-border)]
                                bg-[var(--color-surface)]
                                text-[var(--color-text-secondary)]
                                hover:border-[var(--color-primary)]/40
                              `
                          }
                        `}
                    >
                      {active && <Check size={14} strokeWidth={2.5} />}

                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =====================================
                DESCRIPTION
            ===================================== */}

            <div>
              <label className={labelClass}>
                Description
                <span className="font-normal text-[var(--color-text-muted)]">
                  {" "}
                  (Optional)
                </span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us something about this farm..."
                rows={3}
                className="
                  w-full
                  resize-none
                  rounded-[9px]
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                  px-[12px]
                  py-[10px]
                  text-[11px]
                  font-medium
                  text-[var(--color-text-primary)]
                  outline-none
                  placeholder:text-[var(--color-text-muted)]
                  transition-all
                  focus:border-[var(--color-primary)]
                  focus:ring-[3px]
                  focus:ring-[var(--color-primary)]/10
                "
              />
            </div>
          </div>

          {/* =========================================
              FOOTER
          ========================================= */}

          <div
            className="
              flex
              flex-col-reverse
              gap-[9px]
              border-t
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]/30
              px-[24px]
              py-[16px]
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={handleClose}
              className="
                h-[43px]
                rounded-[9px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-[22px]
                text-[11px]
                font-semibold
                text-[var(--color-text-secondary)]
                transition
                hover:border-[var(--color-border-hover)]
                hover:text-[var(--color-text-primary)]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                h-[43px]
                rounded-[9px]
                bg-[var(--color-primary)]
                px-[25px]
                text-[11px]
                font-bold
                text-white
                shadow-[0_6px_18px_rgba(22,163,74,.20)]
                transition-all
                hover:-translate-y-[1px]
                hover:bg-[var(--color-primary-hover)]
                hover:shadow-[0_9px_24px_rgba(22,163,74,.27)]
                active:translate-y-0
              "
            >
              Add Farm
            </button>
          </div>
        </form>
      </div>

      {/* =========================================
          ANIMATION
      ========================================= */}

      <style>
        {`
          @keyframes modalIn {
            from {
              opacity: 0;
              transform: scale(.97) translateY(8px);
            }

            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

const labelClass = `
  mb-[6px]
  block
  text-[10px]
  font-semibold
  text-[var(--color-text-primary)]
`;

const inputClass = `
  h-[43px]
  w-full
  rounded-[9px]
  border
  border-[var(--color-border)]
  bg-[var(--color-surface)]
  px-[12px]
  text-[11px]
  font-medium
  text-[var(--color-text-primary)]
  outline-none
  placeholder:text-[var(--color-text-muted)]
  transition-all
  duration-200
  focus:border-[var(--color-primary)]
  focus:ring-[3px]
  focus:ring-[var(--color-primary)]/10
`;

const selectClass = `
  h-[43px]
  w-full
  appearance-none
  rounded-[9px]
  border
  border-[var(--color-border)]
  bg-[var(--color-surface)]
  px-[12px]
  pr-[32px]
  text-[11px]
  font-medium
  text-[var(--color-text-primary)]
  outline-none
  transition-all
  focus:border-[var(--color-primary)]
  focus:ring-[3px]
`;

export default AddFarmModal;
