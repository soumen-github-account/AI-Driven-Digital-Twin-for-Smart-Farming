// import {
//   Droplets,
//   Ellipsis,
//   Leaf,
//   MapPin,
//   Tractor,
//   TrendingUp,
// } from "lucide-react";

// import HealthRing from "./HealthRing";
// import Metric from "./Metric";

// export default function FieldCard({ field }) {
//   const healthColor =
//     field.health >= 85
//       ? "text-[var(--color-success)]"
//       : field.health >= 70
//       ? "text-[var(--color-primary)]"
//       : "text-amber-500";

//   return (
//     <article
//       className="
//         overflow-hidden
//         rounded-[18px]
//         border
//         border-[var(--color-border)]
//         bg-[var(--color-surface)]/80
//         shadow-[0_10px_35px_rgba(0,0,0,.05)]
//         backdrop-blur-xl
//         transition-all
//         duration-200
//         hover:-translate-y-[2px]
//         hover:border-[var(--color-primary)]/30
//         hover:shadow-[0_15px_40px_rgba(22,163,74,.08)]
//       "
//     >
//       {/* IMAGE */}

//       <div className="relative h-[165px] overflow-hidden">
//         <img
//           src={field.image}
//           alt={field.name}
//           className="
//             h-full
//             w-full
//             object-cover
//             transition-transform
//             duration-500
//             hover:scale-[1.03]
//           "
//         />

//         <div
//           className="
//             absolute
//             inset-0
//             bg-gradient-to-t
//             from-black/45
//             via-transparent
//             to-black/5
//           "
//         />

//         <div
//           className={`
//             absolute
//             right-[12px]
//             top-[12px]
//             rounded-full
//             px-[9px]
//             py-[5px]
//             text-[9px]
//             font-bold
//             text-white
//             shadow-lg
//             ${
//               field.status === "Attention"
//                 ? "bg-amber-500"
//                 : "bg-[var(--color-primary)]"
//             }
//           `}
//         >
//           {field.status}
//         </div>

//         <div
//           className="
//             absolute
//             bottom-[12px]
//             left-[12px]
//             flex
//             items-center
//             gap-[6px]
//             rounded-full
//             border
//             border-white/20
//             bg-black/30
//             px-[9px]
//             py-[5px]
//             text-[9px]
//             font-semibold
//             text-white
//             backdrop-blur-md
//           "
//         >
//           <Leaf size={11} />
//           {field.crop}
//         </div>
//       </div>

//       {/* BODY */}

//       <div className="p-[15px]">
//         <div className="flex items-start justify-between gap-[10px]">
//           <div>
//             <h3
//               className="
//                 text-[15px]
//                 font-bold
//                 tracking-[-.3px]
//               "
//             >
//               {field.name}
//             </h3>

//             <div
//               className="
//                 mt-[4px]
//                 flex
//                 items-center
//                 gap-[5px]
//                 text-[9px]
//                 text-[var(--color-text-muted)]
//               "
//             >
//               <Tractor size={11} />
//               {field.farm}
//             </div>
//           </div>

//           <button
//             className="
//               flex
//               h-[30px]
//               w-[30px]
//               items-center
//               justify-center
//               rounded-[8px]
//               border
//               border-[var(--color-border)]
//               text-[var(--color-text-muted)]
//               hover:text-[var(--color-primary)]
//             "
//           >
//             <Ellipsis size={16} />
//           </button>
//         </div>

//         {/* LOCATION */}

//         <div
//           className="
//             mt-[12px]
//             flex
//             items-center
//             gap-[5px]
//             text-[9px]
//             text-[var(--color-text-secondary)]
//           "
//         >
//           <MapPin
//             size={12}
//             className="text-[var(--color-primary)]"
//           />

//           {field.location}
//         </div>

//         <div className="my-[13px] h-px bg-[var(--color-border)]" />

//         {/* METRICS */}

//         <div className="grid grid-cols-3">
//           <Metric
//             label="Area"
//             value={field.area}
//           />

//           <Metric
//             label="Moisture"
//             value={`${field.moisture}%`}
//             border
//           />

//           <Metric
//             label="Growth"
//             value={field.growth}
//             border
//           />
//         </div>

//         {/* HEALTH */}

//         <div
//           className="
//             mt-[14px]
//             rounded-[11px]
//             border
//             border-[var(--color-border)]
//             bg-[var(--color-bg)]/60
//             p-[10px]
//           "
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p
//                 className="
//                   text-[9px]
//                   font-semibold
//                   text-[var(--color-text-muted)]
//                 "
//               >
//                 Crop Health
//               </p>

//               <div className="mt-[3px] flex items-center gap-[6px]">
//                 <span
//                   className={`
//                     text-[16px]
//                     font-extrabold
//                     ${healthColor}
//                   `}
//                 >
//                   {field.health}%
//                 </span>

//                 <TrendingUp
//                   size={12}
//                   className={healthColor}
//                 />
//               </div>
//             </div>

//             <HealthRing health={field.health} />
//           </div>

//           <div
//             className="
//               mt-[8px]
//               h-[4px]
//               overflow-hidden
//               rounded-full
//               bg-[var(--color-border)]
//             "
//           >
//             <div
//               className="
//                 h-full
//                 rounded-full
//                 bg-[var(--color-primary)]
//               "
//               style={{
//                 width: `${field.health}%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* IRRIGATION */}

//         <div
//           className="
//             mt-[10px]
//             flex
//             items-center
//             justify-between
//           "
//         >
//           <div className="flex items-center gap-[7px]">
//             <div
//               className="
//                 flex
//                 h-[27px]
//                 w-[27px]
//                 items-center
//                 justify-center
//                 rounded-[8px]
//                 bg-sky-500/10
//                 text-sky-500
//               "
//             >
//               <Droplets size={13} />
//             </div>

//             <div>
//               <p
//                 className="
//                   text-[8px]
//                   text-[var(--color-text-muted)]
//                 "
//               >
//                 Irrigation
//               </p>

//               <p
//                 className={`
//                   text-[9px]
//                   font-bold
//                   ${
//                     field.irrigation === "Needs Water"
//                       ? "text-amber-500"
//                       : "text-[var(--color-primary)]"
//                   }
//                 `}
//               >
//                 {field.irrigation}
//               </p>
//             </div>
//           </div>

//           <span
//             className="
//               text-[8px]
//               text-[var(--color-text-muted)]
//             "
//           >
//             Updated {field.updated}
//           </span>
//         </div>

//         {/* ACTIONS */}

//         <div
//           className="
//             mt-[13px]
//             grid
//             grid-cols-[1fr_1fr_38px]
//             gap-[7px]
//           "
//         >
//           <button
//             className="
//               flex
//               h-[35px]
//               items-center
//               justify-center
//               rounded-[8px]
//               border
//               border-[var(--color-border)]
//               text-[9px]
//               font-bold
//               text-[var(--color-text-secondary)]
//               transition
//               hover:border-[var(--color-primary)]/30
//               hover:text-[var(--color-primary)]
//             "
//           >
//             View Field
//           </button>

//           <button
//             className="
//               flex
//               h-[35px]
//               items-center
//               justify-center
//               rounded-[8px]
//               bg-[var(--color-primary)]/10
//               text-[9px]
//               font-bold
//               text-[var(--color-primary)]
//               transition
//               hover:bg-[var(--color-primary)]
//               hover:text-white
//             "
//           >
//             Manage
//           </button>

//           <button
//             className="
//               flex
//               h-[35px]
//               items-center
//               justify-center
//               rounded-[8px]
//               border
//               border-[var(--color-border)]
//               text-[var(--color-text-muted)]
//               hover:text-[var(--color-primary)]
//             "
//           >
//             <Ellipsis size={15} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

import {
  Droplets,
  Ellipsis,
  Leaf,
  MapPin,
  Tractor,
} from "lucide-react";

import Metric from "./Metric";

export default function FieldCard({ field }) {
  const location = [
    field.farm?.location,
    field.farm?.city,
    field.farm?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const formattedDate = field.updatedAt
    ? new Date(field.updatedAt).toLocaleDateString()
    : "Recently";

  return (
    <article
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]/80
        shadow-[0_10px_35px_rgba(0,0,0,.05)]
        backdrop-blur-xl
        transition-all
        duration-200
        hover:-translate-y-[2px]
        hover:border-[var(--color-primary)]/30
        hover:shadow-[0_15px_40px_rgba(22,163,74,.08)]
      "
    >

      {/* IMAGE */}

      <div className="relative h-[165px] overflow-hidden">

        <img
          src={
            field.imageUrl ||
            "/images/default-field.jpg"
          }
          alt={field.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-[1.03]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-transparent
            to-black/5
          "
        />

        {/* CROP */}

        <div
          className="
            absolute
            bottom-[12px]
            left-[12px]
            flex
            items-center
            gap-[6px]
            rounded-full
            border
            border-white/20
            bg-black/30
            px-[9px]
            py-[5px]
            text-[9px]
            font-semibold
            text-white
            backdrop-blur-md
          "
        >
          <Leaf size={11} />

          {field.crop || "No crop"}
        </div>

      </div>

      {/* BODY */}

      <div className="p-[15px]">

        {/* TITLE */}

        <div className="flex items-start justify-between gap-[10px]">

          <div>

            <h3
              className="
                text-[15px]
                font-bold
                tracking-[-.3px]
              "
            >
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

          </div>

          <button
            className="
              flex
              h-[30px]
              w-[30px]
              items-center
              justify-center
              rounded-[8px]
              border
              border-[var(--color-border)]
              text-[var(--color-text-muted)]
              hover:text-[var(--color-primary)]
            "
          >
            <Ellipsis size={16} />
          </button>

        </div>

        {/* LOCATION */}

        <div
          className="
            mt-[12px]
            flex
            items-center
            gap-[5px]
            text-[9px]
            text-[var(--color-text-secondary)]
          "
        >
          <MapPin
            size={12}
            className="text-[var(--color-primary)]"
          />

          {location || "Location not available"}
        </div>

        <div
          className="
            my-[13px]
            h-px
            bg-[var(--color-border)]
          "
        />

        {/* METRICS */}

        <div className="grid grid-cols-3">

          <Metric
            label="Area"
            value={`${field.area || 0} ${
              field.areaUnit || "acre"
            }`}
          />

          <Metric
            label="Soil"
            value={field.soilType || "N/A"}
            border
          />

          <Metric
            label="Crop"
            value={field.crop || "N/A"}
            border
          />

        </div>

        {/* IRRIGATION */}

        <div
          className="
            mt-[14px]
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-[7px]">

            <div
              className="
                flex
                h-[27px]
                w-[27px]
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
                  text-[9px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                {field.irrigationType ||
                  "Not specified"}
              </p>

            </div>

          </div>

          <span
            className="
              text-[8px]
              text-[var(--color-text-muted)]
            "
          >
            Updated {formattedDate}
          </span>

        </div>

        {/* ACTIONS */}

        <div
          className="
            mt-[13px]
            grid
            grid-cols-[1fr_1fr_38px]
            gap-[7px]
          "
        >

          <button
            className="
              flex
              h-[35px]
              items-center
              justify-center
              rounded-[8px]
              border
              border-[var(--color-border)]
              text-[9px]
              font-bold
              text-[var(--color-text-secondary)]
              transition
              hover:border-[var(--color-primary)]/30
              hover:text-[var(--color-primary)]
            "
          >
            View Field
          </button>

          <button
            className="
              flex
              h-[35px]
              items-center
              justify-center
              rounded-[8px]
              bg-[var(--color-primary)]/10
              text-[9px]
              font-bold
              text-[var(--color-primary)]
              transition
              hover:bg-[var(--color-primary)]
              hover:text-white
            "
          >
            Manage
          </button>

          <button
            className="
              flex
              h-[35px]
              items-center
              justify-center
              rounded-[8px]
              border
              border-[var(--color-border)]
              text-[var(--color-text-muted)]
              hover:text-[var(--color-primary)]
            "
          >
            <Ellipsis size={15} />
          </button>

        </div>

      </div>
    </article>
  );
}