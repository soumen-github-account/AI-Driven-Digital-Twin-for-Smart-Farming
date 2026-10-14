// import {
//   ArrowUpRight,
//   Leaf,
// } from "lucide-react";

// import ListMetric from "./ListMetric";

// export default function FieldListItem({ field }) {
//   return (
//     <div
//       className="
//         flex
//         flex-col
//         gap-[15px]
//         rounded-[16px]
//         border
//         border-[var(--color-border)]
//         bg-[var(--color-surface)]/80
//         p-[12px]
//         backdrop-blur-xl
//         lg:flex-row
//         lg:items-center
//       "
//     >
//       <img
//         src={field.image}
//         alt={field.name}
//         className="
//           h-[80px]
//           w-full
//           rounded-[11px]
//           object-cover
//           lg:w-[120px]
//         "
//       />

//       <div className="min-w-[180px] flex-1">
//         <h3 className="text-[13px] font-bold">
//           {field.name}
//         </h3>

//         <p className="mt-[3px] text-[9px] text-[var(--color-text-muted)]">
//           {field.farm}
//         </p>

//         <div className="mt-[7px] flex items-center gap-[5px] text-[9px]">
//           <Leaf
//             size={11}
//             className="text-[var(--color-primary)]"
//           />
//           {field.crop}
//         </div>
//       </div>

//       <ListMetric
//         label="Area"
//         value={field.area}
//       />

//       <ListMetric
//         label="Health"
//         value={`${field.health}%`}
//       />

//       <ListMetric
//         label="Moisture"
//         value={`${field.moisture}%`}
//       />

//       <ListMetric
//         label="Growth"
//         value={field.growth}
//       />

//       <button
//         className="
//           flex
//           h-[36px]
//           items-center
//           justify-center
//           gap-[5px]
//           rounded-[9px]
//           bg-[var(--color-primary)]/10
//           px-[12px]
//           text-[9px]
//           font-bold
//           text-[var(--color-primary)]
//           hover:bg-[var(--color-primary)]
//           hover:text-white
//         "
//       >
//         View
//         <ArrowUpRight size={13} />
//       </button>
//     </div>
//   );
// }

import {
  ArrowUpRight,
  Droplets,
  Leaf,
  MapPin,
  Tractor,
} from "lucide-react";

import ListMetric from "./ListMetric";

export default function FieldListItem({ field }) {
  const location = [
    field.farm?.location,
    field.farm?.city,
    field.farm?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const updatedDate = field.updatedAt
    ? new Date(field.updatedAt).toLocaleDateString()
    : "Recently";

  return (
    <div
      className="
        flex
        flex-col
        gap-[15px]
        rounded-[16px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]/80
        p-[12px]
        backdrop-blur-xl
        transition-all
        duration-200
        hover:border-[var(--color-primary)]/30
        hover:shadow-[0_10px_30px_rgba(22,163,74,.06)]
        lg:flex-row
        lg:items-center
      "
    >
      {/* FIELD IMAGE */}
      <img
        src={
          field.imageUrl ||
          "/images/default-field.jpg"
        }
        alt={field.name}
        className="
          h-[80px]
          w-full
          rounded-[11px]
          object-cover
          lg:w-[120px]
        "
      />

      {/* FIELD INFO */}
      <div className="min-w-[180px] flex-1">
        <h3 className="text-[13px] font-bold">
          {field.name}
        </h3>

        <div
          className="
            mt-[4px]
            flex
            items-center
            gap-[5px]
            text-[9px]
            text-[var(--color-text-muted)]
          "
        >
          <Tractor size={11} />

          {field.farm?.name || "Unknown farm"}
        </div>

        <div
          className="
            mt-[6px]
            flex
            items-center
            gap-[5px]
            text-[9px]
            text-[var(--color-text-secondary)]
          "
        >
          <Leaf
            size={11}
            className="text-[var(--color-primary)]"
          />

          {field.crop || "No crop"}
        </div>

        {location && (
          <div
            className="
              mt-[5px]
              flex
              items-center
              gap-[5px]
              text-[8px]
              text-[var(--color-text-muted)]
            "
          >
            <MapPin size={10} />
            {location}
          </div>
        )}
      </div>

      {/* AREA */}
      <ListMetric
        label="Area"
        value={`${field.area || 0} ${
          field.areaUnit || "acre"
        }`}
      />

      {/* SOIL */}
      <ListMetric
        label="Soil"
        value={field.soilType || "N/A"}
      />

      {/* IRRIGATION */}
      <div
        className="
          flex
          min-w-[90px]
          items-center
          gap-[7px]
        "
      >
        <div
          className="
            flex
            h-[28px]
            w-[28px]
            items-center
            justify-center
            rounded-[8px]
            bg-sky-500/10
            text-sky-500
          "
        >
          <Droplets size={13} />
        </div>

        <div>
          <p
            className="
              text-[8px]
              text-[var(--color-text-muted)]
            "
          >
            Irrigation
          </p>

          <p
            className="
              max-w-[80px]
              truncate
              text-[9px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            {field.irrigationType || "N/A"}
          </p>
        </div>
      </div>

      {/* UPDATED */}
      <div
        className="
          hidden
          min-w-[75px]
          lg:block
        "
      >
        <p
          className="
            text-[8px]
            text-[var(--color-text-muted)]
          "
        >
          Updated
        </p>

        <p
          className="
            mt-[2px]
            text-[9px]
            font-semibold
            text-[var(--color-text-secondary)]
          "
        >
          {updatedDate}
        </p>
      </div>

      {/* VIEW BUTTON */}
      <button
        className="
          flex
          h-[36px]
          items-center
          justify-center
          gap-[5px]
          rounded-[9px]
          bg-[var(--color-primary)]/10
          px-[12px]
          text-[9px]
          font-bold
          text-[var(--color-primary)]
          transition-all
          hover:bg-[var(--color-primary)]
          hover:text-white
        "
      >
        View
        <ArrowUpRight size={13} />
      </button>
    </div>
  );
}