// import {
//   Expand,
//   MapPin,
//   Minus,
//   Plus,
// } from "lucide-react";

// const markers = [
//   {
//     top: "23%",
//     left: "13%",
//   },
//   {
//     top: "45%",
//     left: "20%",
//   },
//   {
//     top: "70%",
//     left: "65%",
//   },
//   {
//     top: "39%",
//     left: "83%",
//   },
// ];

// function FarmLocationMap() {
//   return (
//     <section
//       className="
//         overflow-hidden
//         rounded-[16px]
//         border
//         border-[var(--color-border)]
//         bg-[var(--color-surface)]
//         shadow-[0_3px_14px_rgba(23,32,26,0.045)]
//       "
//     >
//       {/* HEADER */}

//       <div
//         className="
//           flex
//           h-[52px]
//           items-center
//           justify-between
//           border-b
//           border-[var(--color-border)]
//           px-4
//         "
//       >
//         <h2
//           className="
//             text-[12px]
//             font-bold
//             text-[var(--color-text-primary)]
//           "
//         >
//           Farm Locations
//         </h2>

//         <button
//           type="button"
//           className="
//             flex
//             h-7
//             w-7
//             items-center
//             justify-center
//             rounded-lg
//             text-[var(--color-text-secondary)]
//             transition
//             hover:bg-[var(--color-surface-secondary)]
//             hover:text-[var(--color-primary)]
//           "
//         >
//           <Expand size={14} />
//         </button>
//       </div>

//       {/* MAP */}

//       <div
//         className="
//           relative
//           h-[410px]
//           overflow-hidden
//           bg-[#e7eadc]
//           dark:bg-[#18231b]
//         "
//       >
//         {/* MAP BACKGROUND */}

//         <div
//           className="
//             absolute
//             inset-0
//             opacity-80
//             dark:opacity-35
//           "
//           style={{
//             backgroundImage: `
//               linear-gradient(
//                 30deg,
//                 transparent 48%,
//                 rgba(130,150,100,.22) 49%,
//                 transparent 50%
//               ),
//               linear-gradient(
//                 145deg,
//                 transparent 48%,
//                 rgba(130,150,100,.18) 49%,
//                 transparent 50%
//               )
//             `,
//             backgroundSize: "80px 80px",
//           }}
//         />

//         {/* ROAD / STATE LINES */}

//         <div
//           className="
//             absolute
//             left-[8%]
//             top-[15%]
//             h-[120%]
//             w-[1px]
//             rotate-[17deg]
//             bg-[#c4cbb7]
//             dark:bg-[#405044]
//           "
//         />

//         <div
//           className="
//             absolute
//             left-[45%]
//             top-[-10%]
//             h-[130%]
//             w-[1px]
//             rotate-[30deg]
//             bg-[#c4cbb7]
//             dark:bg-[#405044]
//           "
//         />

//         <div
//           className="
//             absolute
//             left-[-10%]
//             top-[50%]
//             h-px
//             w-[130%]
//             rotate-[-8deg]
//             bg-[#c4cbb7]
//             dark:bg-[#405044]
//           "
//         />

//         {/* COUNTRY LABEL */}

//         <div
//           className="
//             absolute
//             left-1/2
//             top-[48%]
//             -translate-x-1/2
//             text-[15px]
//             font-semibold
//             tracking-wide
//             text-[#68705f]
//             dark:text-[#778579]
//           "
//         >
//           United States
//         </div>

//         {/* STATE LABELS */}

//         <span className="absolute left-[23%] top-[18%] text-[7px] font-semibold text-[#89917e]">
//           WASHINGTON
//         </span>

//         <span className="absolute left-[49%] top-[12%] text-[7px] font-semibold text-[#89917e]">
//           MONTANA
//         </span>

//         <span className="absolute left-[16%] top-[42%] text-[7px] font-semibold text-[#89917e]">
//           OREGON
//         </span>

//         <span className="absolute left-[58%] top-[28%] text-[7px] font-semibold text-[#89917e]">
//           WYOMING
//         </span>

//         <span className="absolute left-[70%] top-[57%] text-[7px] font-semibold text-[#89917e]">
//           TEXAS
//         </span>

//         {/* MARKERS */}

//         {markers.map((marker, index) => (
//           <div
//             key={index}
//             className="
//               absolute
//               -translate-x-1/2
//               -translate-y-1/2
//             "
//             style={{
//               top: marker.top,
//               left: marker.left,
//             }}
//           >
//             <div
//               className="
//                 flex
//                 h-8
//                 w-8
//                 items-center
//                 justify-center
//                 rounded-full
//                 border-2
//                 border-white
//                 bg-[var(--color-primary)]
//                 text-white
//                 shadow-[0_4px_12px_rgba(22,163,74,0.3)]
//               "
//             >
//               <MapPin size={14} fill="currentColor" />
//             </div>
//           </div>
//         ))}

//         {/* ZOOM */}

//         <div
//           className="
//             absolute
//             bottom-3
//             right-3
//             overflow-hidden
//             rounded-xl
//             border
//             border-[var(--color-border)]
//             bg-[var(--color-surface)]
//             shadow-lg
//           "
//         >
//           <button
//             type="button"
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               border-b
//               border-[var(--color-border)]
//               text-[var(--color-text-primary)]
//               transition
//               hover:bg-[var(--color-surface-secondary)]
//             "
//           >
//             <Plus size={15} />
//           </button>

//           <button
//             type="button"
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               text-[var(--color-text-primary)]
//               transition
//               hover:bg-[var(--color-surface-secondary)]
//             "
//           >
//             <Minus size={15} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FarmLocationMap;

// import {
//   Expand,
//   MapPin,
//   Minus,
//   Plus,
//   X,
// } from "lucide-react";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";

// import L from "leaflet";
// import { useEffect } from "react";

// import "leaflet/dist/leaflet.css";

// /* =========================================================
//    FIX LEAFLET DEFAULT ICON
// ========================================================= */

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
// });

// function ZoomControls() {
//   const map = useMap();

//   return (
//     <div
//       className="
//         absolute
//         bottom-3
//         right-3
//         z-[500]
//         overflow-hidden
//         rounded-xl
//         border
//         border-[var(--color-border)]
//         bg-[var(--color-surface)]/95
//         shadow-lg
//         backdrop-blur-xl
//       "
//     >
//       <button
//         type="button"
//         onClick={() => map.zoomIn()}
//         className="
//           flex
//           h-9
//           w-9
//           items-center
//           justify-center
//           border-b
//           border-[var(--color-border)]
//           text-[var(--color-text-primary)]
//           transition
//           hover:bg-[var(--color-surface-secondary)]
//           hover:text-[var(--color-primary)]
//         "
//       >
//         <Plus size={15} />
//       </button>

//       <button
//         type="button"
//         onClick={() => map.zoomOut()}
//         className="
//           flex
//           h-9
//           w-9
//           items-center
//           justify-center
//           text-[var(--color-text-primary)]
//           transition
//           hover:bg-[var(--color-surface-secondary)]
//           hover:text-[var(--color-primary)]
//         "
//       >
//         <Minus size={15} />
//       </button>
//     </div>
//   );
// }

// /* =========================================================
//    MAP FIT CONTROLLER
// ========================================================= */

// function MapBoundsController({ farms }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!farms?.length) return;

//     const validFarms = farms.filter(
//       (farm) =>
//         typeof Number(farm.latitude) === "number" &&
//         typeof Number(farm.longitude) === "number" &&
//         !Number.isNaN(Number(farm.latitude)) &&
//         !Number.isNaN(Number(farm.longitude))
//     );

//     if (!validFarms.length) return;

//     const bounds = L.latLngBounds(
//       validFarms.map((farm) => [
//         Number(farm.latitude),
//         Number(farm.longitude),
//       ])
//     );

//     if (validFarms.length === 1) {
//       map.flyTo(
//         [
//           Number(validFarms[0].latitude),
//           Number(validFarms[0].longitude),
//         ],
//         12,
//         {
//           duration: 0.8,
//         }
//       );
//     } else {
//       map.fitBounds(bounds, {
//         padding: [40, 40],
//         maxZoom: 12,
//         animate: true,
//       });
//     }
//   }, [farms, map]);

//   return null;
// }

// /* =========================================================
//    CUSTOM FARM MARKER
// ========================================================= */

// const createFarmIcon = (status) => {
//   const isActive =
//     String(status || "").toUpperCase() === "ACTIVE";

//   const color = isActive ? "#22c55e" : "#ef4444";

//   const shadow = isActive
//     ? "rgba(34,197,94,.45)"
//     : "rgba(239,68,68,.45)";

//   return L.divIcon({
//     className: "farm-custom-marker",

//     html: `
//       <div
//         style="
//           position: relative;
//           width: 42px;
//           height: 42px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         "
//       >

//         <!-- Animated dotted ring -->
//         <div
//           style="
//             position: absolute;
//             inset: 0;
//             border-radius: 9999px;
//             border: 2px dotted ${color};
//             animation: farmMarkerPulse 1.8s ease-in-out infinite;
//             box-shadow:
//               0 0 0 4px ${shadow},
//               0 0 18px ${shadow};
//           "
//         ></div>

//         <!-- Inner marker -->
//         <div
//           style="
//             position: relative;
//             width: 27px;
//             height: 27px;
//             border-radius: 9999px;
//             background: ${color};
//             border: 3px solid white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             box-shadow:
//               0 4px 12px ${shadow},
//               0 0 20px ${shadow};
//             z-index: 2;
//           "
//         >

//           <!-- Pin -->
//           <div
//             style="
//               width: 8px;
//               height: 8px;
//               border-radius: 9999px;
//               background: white;
//             "
//           ></div>

//         </div>

//       </div>
//     `,

//     iconSize: [42, 42],
//     iconAnchor: [21, 21],
//     popupAnchor: [0, -20],
//   });
// };

// /* =========================================================
//    FARM LOCATION MAP
// ========================================================= */

// function FarmLocationMap({
//   farms = [],
//   onExpand,
// }) {
//   /* =======================================================
//      VALID FARMS ONLY
//   ======================================================= */

//   const validFarms = farms.filter((farm) => {
//     const latitude = Number(farm.latitude);
//     const longitude = Number(farm.longitude);

//     return (
//       Number.isFinite(latitude) &&
//       Number.isFinite(longitude) &&
//       latitude >= -90 &&
//       latitude <= 90 &&
//       longitude >= -180 &&
//       longitude <= 180
//     );
//   });

//   /* =======================================================
//      DEFAULT CENTER
//      India
//   ======================================================= */

//   const defaultCenter = [20.5937, 78.9629];

//   /* =======================================================
//      EMPTY MAP
//   ======================================================= */

//   return (
//     <section
//       className="
//         overflow-hidden
//         rounded-[16px]
//         border
//         border-[var(--color-border)]
//         bg-[var(--color-surface)]
//         shadow-[0_3px_14px_rgba(23,32,26,0.045)]
//       "
//     >
//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div
//         className="
//           flex
//           h-[52px]
//           items-center
//           justify-between
//           border-b
//           border-[var(--color-border)]
//           px-4
//         "
//       >
//         <div className="flex items-center gap-[8px]">
//           <MapPin
//             size={14}
//             className="text-[var(--color-primary)]"
//           />

//           <div>
//             <h2
//               className="
//                 text-[12px]
//                 font-bold
//                 text-[var(--color-text-primary)]
//               "
//             >
//               Farm Locations
//             </h2>

//             <p
//               className="
//                 text-[8px]
//                 text-[var(--color-text-muted)]
//               "
//             >
//               {validFarms.length}{" "}
//               {validFarms.length === 1
//                 ? "farm"
//                 : "farms"}{" "}
//               mapped
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={onExpand}
//           className="
//             flex
//             h-7
//             w-7
//             items-center
//             justify-center
//             rounded-lg
//             text-[var(--color-text-secondary)]
//             transition
//             hover:bg-[var(--color-surface-secondary)]
//             hover:text-[var(--color-primary)]
//           "
//           aria-label="Expand map"
//         >
//           <Expand size={14} />
//         </button>
//       </div>

//       {/* =================================================
//           MAP
//       ================================================= */}

//       <div
//         className="
//           relative
//           h-[410px]
//           overflow-hidden
//         "
//       >
//         <MapContainer
//           center={defaultCenter}
//           zoom={5}
//           scrollWheelZoom
//           zoomControl={false}
//           className="h-full w-full"
//         >
//           {/* =================================================
//               TILE LAYER
//           ================================================= */}

//           <TileLayer
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* =================================================
//               AUTO FIT
//           ================================================= */}

//           <MapBoundsController
//             farms={validFarms}
//           />

//           {/* =================================================
//               FARM MARKERS
//           ================================================= */}

//           {validFarms.map((farm) => {
//             const latitude = Number(farm.latitude);
//             const longitude = Number(farm.longitude);

//             const isActive =
//               String(farm.farmStatus || farm.status || "")
//                 .toUpperCase() === "ACTIVE";

//             return (
//               <Marker
//                 key={farm.id}
//                 position={[latitude, longitude]}
//                 icon={createFarmIcon(
//                   farm.farmStatus || farm.status
//                 )}
//               >
//                 <Popup>
//                   <div
//                     style={{
//                       minWidth: "180px",
//                       fontFamily: "Inter, sans-serif",
//                     }}
//                   >
//                     {/* Farm name */}

//                     <div
//                       style={{
//                         fontSize: "13px",
//                         fontWeight: 700,
//                         marginBottom: "5px",
//                         color: "#17201a",
//                       }}
//                     >
//                       {farm.name || "Unnamed Farm"}
//                     </div>

//                     {/* Location */}

//                     <div
//                       style={{
//                         fontSize: "10px",
//                         color: "#647067",
//                         marginBottom: "8px",
//                       }}
//                     >
//                       {farm.location ||
//                         [
//                           farm.city,
//                           farm.state,
//                           farm.country,
//                         ]
//                           .filter(Boolean)
//                           .join(", ") ||
//                         "Location unavailable"}
//                     </div>

//                     {/* Status */}

//                     <div
//                       style={{
//                         display: "inline-flex",
//                         alignItems: "center",
//                         gap: "5px",
//                         padding: "4px 8px",
//                         borderRadius: "999px",
//                         fontSize: "9px",
//                         fontWeight: 700,
//                         color: isActive
//                           ? "#15803d"
//                           : "#dc2626",
//                         background: isActive
//                           ? "#dcfce7"
//                           : "#fee2e2",
//                       }}
//                     >
//                       <span
//                         style={{
//                           width: "6px",
//                           height: "6px",
//                           borderRadius: "50%",
//                           background: isActive
//                             ? "#22c55e"
//                             : "#ef4444",
//                         }}
//                       />

//                       {isActive
//                         ? "ACTIVE"
//                         : "INACTIVE"}
//                     </div>

//                     {/* Coordinates */}

//                     <div
//                       style={{
//                         marginTop: "8px",
//                         paddingTop: "7px",
//                         borderTop:
//                           "1px solid #e5e7eb",
//                         fontSize: "8px",
//                         color: "#647067",
//                       }}
//                     >
//                       {latitude.toFixed(6)},{" "}
//                       {longitude.toFixed(6)}
//                     </div>
//                   </div>
//                 </Popup>
//               </Marker>
//             );
//           })}

//           {/* =================================================
//               ZOOM CONTROLS
//           ================================================= */}

//           <div
//             className="
//               absolute
//               bottom-3
//               right-3
//               z-[500]
//               overflow-hidden
//               rounded-xl
//               border
//               border-[var(--color-border)]
//               bg-[var(--color-surface)]/95
//               shadow-lg
//               backdrop-blur-xl
//             "
//           >
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//               }}
//               className="
//                 flex
//                 h-9
//                 w-9
//                 items-center
//                 justify-center
//                 border-b
//                 border-[var(--color-border)]
//                 text-[var(--color-text-primary)]
//                 transition
//                 hover:bg-[var(--color-surface-secondary)]
//                 hover:text-[var(--color-primary)]
//               "
//               aria-label="Zoom in"
//             >
//               <Plus size={15} />
//             </button>

//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//               }}
//               className="
//                 flex
//                 h-9
//                 w-9
//                 items-center
//                 justify-center
//                 text-[var(--color-text-primary)]
//                 transition
//                 hover:bg-[var(--color-surface-secondary)]
//                 hover:text-[var(--color-primary)]
//               "
//               aria-label="Zoom out"
//             >
//               <Minus size={15} />
//             </button>
//           </div>
//         </MapContainer>

//         {/* =================================================
//             EMPTY STATE
//         ================================================= */}

//         {validFarms.length === 0 && (
//           <div
//             className="
//               absolute
//               inset-0
//               z-[450]
//               flex
//               items-center
//               justify-center
//               bg-[var(--color-surface)]/65
//               backdrop-blur-[2px]
//             "
//           >
//             <div
//               className="
//                 flex
//                 flex-col
//                 items-center
//                 text-center
//               "
//             >
//               <div
//                 className="
//                   flex
//                   h-[42px]
//                   w-[42px]
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[var(--color-primary)]/10
//                   text-[var(--color-primary)]
//                 "
//               >
//                 <MapPin size={19} />
//               </div>

//               <p
//                 className="
//                   mt-2
//                   text-[10px]
//                   font-bold
//                   text-[var(--color-text-primary)]
//                 "
//               >
//                 No farm locations
//               </p>

//               <p
//                 className="
//                   mt-1
//                   text-[8px]
//                   text-[var(--color-text-muted)]
//                 "
//               >
//                 Add a farm with a map location
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* =================================================
//           MAP LEGEND
//       ================================================= */}

//       <div
//         className="
//           flex
//           items-center
//           justify-end
//           gap-4
//           border-t
//           border-[var(--color-border)]
//           px-4
//           py-2.5
//         "
//       >
//         <div className="flex items-center gap-[5px]">
//           <span
//             className="
//               h-[7px]
//               w-[7px]
//               rounded-full
//               bg-[#22c55e]
//               shadow-[0_0_6px_rgba(34,197,94,.7)]
//             "
//           />

//           <span
//             className="
//               text-[8px]
//               font-medium
//               text-[var(--color-text-secondary)]
//             "
//           >
//             Active
//           </span>
//         </div>

//         <div className="flex items-center gap-[5px]">
//           <span
//             className="
//               h-[7px]
//               w-[7px]
//               rounded-full
//               bg-[#ef4444]
//               shadow-[0_0_6px_rgba(239,68,68,.7)]
//             "
//           />

//           <span
//             className="
//               text-[8px]
//               font-medium
//               text-[var(--color-text-secondary)]
//             "
//           >
//             Inactive
//           </span>
//         </div>
//       </div>

//       {/* =================================================
//           ANIMATION
//       ================================================= */}

//       <style>
//         {`
//           @keyframes farmMarkerPulse {
//             0% {
//               transform: scale(.78);
//               opacity: .95;
//             }

//             50% {
//               transform: scale(1.12);
//               opacity: .35;
//             }

//             100% {
//               transform: scale(.78);
//               opacity: .95;
//             }
//           }

//           .farm-custom-marker {
//             background: transparent !important;
//             border: none !important;
//           }

//           .leaflet-container {
//             font-family: Inter, sans-serif;
//           }

//           .leaflet-popup-content-wrapper {
//             border-radius: 12px;
//           }

//           .leaflet-popup-content {
//             margin: 12px;
//           }

//           .leaflet-popup-tip {
//             background: white;
//           }
//         `}
//       </style>
//     </section>
//   );
// }

// export default FarmLocationMap;

import {
  Expand,
  MapPin,
  Minus,
  Plus,
  X,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";

/* =========================================================
   FIX LEAFLET DEFAULT ICON
========================================================= */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/* =========================================================
   ZOOM CONTROLS
========================================================= */

function ZoomControls() {
  const map = useMap();

  const handleZoomIn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    map.zoomIn();
  };

  const handleZoomOut = (e) => {
    e.preventDefault();
    e.stopPropagation();

    map.zoomOut();
  };

  return (
    <div
      className="
        absolute
        bottom-4
        right-4
        z-[1000]
        overflow-hidden
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]/95
        shadow-lg
        backdrop-blur-xl
      "
    >
      {/* Zoom In */}
      <button
        type="button"
        onClick={handleZoomIn}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          border-b
          border-[var(--color-border)]
          text-[var(--color-text-primary)]
          transition
          hover:bg-[var(--color-surface-secondary)]
          hover:text-[var(--color-primary)]
          active:scale-95
        "
        aria-label="Zoom in"
        title="Zoom in"
      >
        <Plus size={16} strokeWidth={2.2} />
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        onClick={handleZoomOut}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          text-[var(--color-text-primary)]
          transition
          hover:bg-[var(--color-surface-secondary)]
          hover:text-[var(--color-primary)]
          active:scale-95
        "
        aria-label="Zoom out"
        title="Zoom out"
      >
        <Minus size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}

/* =========================================================
   MAP BOUNDS CONTROLLER
========================================================= */

function MapBoundsController({ farms }) {
  const map = useMap();

  useEffect(() => {
    if (!farms?.length) return;

    const validFarms = farms.filter((farm) => {
      const latitude = Number(farm.latitude);
      const longitude = Number(farm.longitude);

      return (
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180
      );
    });

    if (!validFarms.length) return;

    const bounds = L.latLngBounds(
      validFarms.map((farm) => [
        Number(farm.latitude),
        Number(farm.longitude),
      ])
    );

    /* =====================================================
       SINGLE FARM
    ===================================================== */

    if (validFarms.length === 1) {
      const latitude = Number(validFarms[0].latitude);
      const longitude = Number(validFarms[0].longitude);

      map.flyTo(
        [latitude, longitude],
        12,
        {
          duration: 0.8,
        }
      );

      return;
    }

    /* =====================================================
       MULTIPLE FARMS
    ===================================================== */

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 12,
      animate: true,
    });
  }, [farms, map]);

  return null;
}

/* =========================================================
   CUSTOM FARM MARKER
========================================================= */

const createFarmIcon = (status) => {
  const isActive =
    String(status || "").toUpperCase() === "ACTIVE";

  const color = isActive
    ? "#22c55e"
    : "#ef4444";

  const shadow = isActive
    ? "rgba(34,197,94,.45)"
    : "rgba(239,68,68,.45)";

  return L.divIcon({
    className: "farm-custom-marker",

    html: `
      <div
        style="
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >

        <!-- Animated dotted ring -->
        <div
          style="
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            border: 2px dotted ${color};
            animation: farmMarkerPulse 1.8s ease-in-out infinite;
            box-shadow:
              0 0 0 4px ${shadow},
              0 0 18px ${shadow};
          "
        ></div>

        <!-- Inner marker -->
        <div
          style="
            position: relative;
            width: 27px;
            height: 27px;
            border-radius: 9999px;
            background: ${color};
            border: 3px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow:
              0 4px 12px ${shadow},
              0 0 20px ${shadow};
            z-index: 2;
          "
        >

          <!-- Pin -->
          <div
            style="
              width: 8px;
              height: 8px;
              border-radius: 9999px;
              background: white;
            "
          ></div>

        </div>

      </div>
    `,

    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -20],
  });
};

/* =========================================================
   FARM LOCATION MAP
========================================================= */

function FarmLocationMap({
  farms = [],
  onExpand,
  expanded = false,
}) {
  /* =======================================================
     VALID FARMS
  ======================================================= */

  const validFarms = farms.filter((farm) => {
    const latitude = Number(farm.latitude);
    const longitude = Number(farm.longitude);

    return (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  });

  /* =======================================================
     DEFAULT CENTER
  ======================================================= */

  const defaultCenter = [
    20.5937,
    78.9629,
  ];

  /* =======================================================
     MAP HEIGHT
  ======================================================= */

  const mapHeight = expanded
    ? "h-full"
    : "h-[410px]";

  return (
    <section
      className={`
        overflow-hidden
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_3px_14px_rgba(23,32,26,0.045)]
        ${
          expanded
            ? "h-full rounded-2xl"
            : "rounded-[16px]"
        }
      `}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          h-[52px]
          shrink-0
          items-center
          justify-between
          border-b
          border-[var(--color-border)]
          px-4
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-[8px]">
          <MapPin
            size={14}
            className="text-[var(--color-primary)]"
          />

          <div>
            <h2
              className="
                text-[12px]
                font-bold
                text-[var(--color-text-primary)]
              "
            >
              Farm Locations
            </h2>

            <p
              className="
                text-[8px]
                text-[var(--color-text-muted)]
              "
            >
              {validFarms.length}{" "}
              {validFarms.length === 1
                ? "farm"
                : "farms"}{" "}
              mapped
            </p>
          </div>
        </div>

        {/* EXPAND / CLOSE */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (onExpand) {
              onExpand();
            }
          }}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[var(--color-text-secondary)]
            transition
            hover:bg-[var(--color-surface-secondary)]
            hover:text-[var(--color-primary)]
            active:scale-95
          "
          aria-label={
            expanded
              ? "Close expanded map"
              : "Expand map"
          }
          title={
            expanded
              ? "Close"
              : "Expand map"
          }
        >
          {expanded ? (
            <X size={15} />
          ) : (
            <Expand size={15} />
          )}
        </button>
      </div>

      {/* =================================================
          MAP
      ================================================= */}

      <div
        className={`
          relative
          w-full
          overflow-hidden
          ${mapHeight}
        `}
      >
        <MapContainer
          center={defaultCenter}
          zoom={5}
          scrollWheelZoom={true}
          zoomControl={false}
          doubleClickZoom={true}
          dragging={true}
          touchZoom={true}
          keyboard={true}
          className="h-full w-full"
        >
          {/* =================================================
              TILE LAYER
          ================================================= */}

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* =================================================
              AUTO FIT
          ================================================= */}

          <MapBoundsController
            farms={validFarms}
          />

          {/* =================================================
              FARM MARKERS
          ================================================= */}

          {validFarms.map((farm, index) => {
            const latitude = Number(
              farm.latitude
            );

            const longitude = Number(
              farm.longitude
            );

            const isActive =
              String(
                farm.farmStatus ||
                  farm.status ||
                  ""
              ).toUpperCase() === "ACTIVE";

            return (
              <Marker
                key={
                  farm.id ||
                  farm._id ||
                  `farm-${index}`
                }
                position={[
                  latitude,
                  longitude,
                ]}
                icon={createFarmIcon(
                  farm.farmStatus ||
                    farm.status
                )}
              >
                <Popup>
                  <div
                    style={{
                      minWidth: "180px",
                      fontFamily:
                        "Inter, sans-serif",
                    }}
                  >
                    {/* FARM NAME */}

                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        marginBottom: "5px",
                        color: "#17201a",
                      }}
                    >
                      {farm.name ||
                        "Unnamed Farm"}
                    </div>

                    {/* LOCATION */}

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#647067",
                        marginBottom: "8px",
                      }}
                    >
                      {farm.location ||
                        [
                          farm.city,
                          farm.state,
                          farm.country,
                        ]
                          .filter(Boolean)
                          .join(", ") ||
                        "Location unavailable"}
                    </div>

                    {/* STATUS */}

                    <div
                      style={{
                        display:
                          "inline-flex",
                        alignItems:
                          "center",
                        gap: "5px",
                        padding:
                          "4px 8px",
                        borderRadius:
                          "999px",
                        fontSize: "9px",
                        fontWeight: 700,
                        color: isActive
                          ? "#15803d"
                          : "#dc2626",
                        background:
                          isActive
                            ? "#dcfce7"
                            : "#fee2e2",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius:
                            "50%",
                          background:
                            isActive
                              ? "#22c55e"
                              : "#ef4444",
                        }}
                      />

                      {isActive
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </div>

                    {/* COORDINATES */}

                    <div
                      style={{
                        marginTop: "8px",
                        paddingTop: "7px",
                        borderTop:
                          "1px solid #e5e7eb",
                        fontSize: "8px",
                        color: "#647067",
                      }}
                    >
                      {latitude.toFixed(
                        6
                      )}
                      ,{" "}
                      {longitude.toFixed(
                        6
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* =================================================
              CUSTOM ZOOM CONTROLS
          ================================================= */}

          <ZoomControls />
        </MapContainer>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {validFarms.length === 0 && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[450]
              flex
              items-center
              justify-center
              bg-[var(--color-surface)]/65
              backdrop-blur-[2px]
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
                text-center
              "
            >
              <div
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                "
              >
                <MapPin size={19} />
              </div>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                No farm locations
              </p>

              <p
                className="
                  mt-1
                  text-[8px]
                  text-[var(--color-text-muted)]
                "
              >
                Add a farm with a map
                location
              </p>
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          MAP LEGEND
      ================================================= */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-end
          gap-4
          border-t
          border-[var(--color-border)]
          px-4
          py-2.5
        "
      >
        {/* ACTIVE */}

        <div className="flex items-center gap-[5px]">
          <span
            className="
              h-[7px]
              w-[7px]
              rounded-full
              bg-[#22c55e]
              shadow-[0_0_6px_rgba(34,197,94,.7)]
            "
          />

          <span
            className="
              text-[8px]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            Active
          </span>
        </div>

        {/* INACTIVE */}

        <div className="flex items-center gap-[5px]">
          <span
            className="
              h-[7px]
              w-[7px]
              rounded-full
              bg-[#ef4444]
              shadow-[0_0_6px_rgba(239,68,68,.7)]
            "
          />

          <span
            className="
              text-[8px]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            Inactive
          </span>
        </div>
      </div>

      {/* =================================================
          CUSTOM STYLES
      ================================================= */}

      <style>
        {`
          @keyframes farmMarkerPulse {
            0% {
              transform: scale(.78);
              opacity: .95;
            }

            50% {
              transform: scale(1.12);
              opacity: .35;
            }

            100% {
              transform: scale(.78);
              opacity: .95;
            }
          }

          .farm-custom-marker {
            background: transparent !important;
            border: none !important;
          }

          .leaflet-container {
            font-family: Inter, sans-serif;
            width: 100%;
            height: 100%;
          }

          .leaflet-popup-content-wrapper {
            border-radius: 12px;
          }

          .leaflet-popup-content {
            margin: 12px;
          }

          .leaflet-popup-tip {
            background: white;
          }

          .leaflet-control-attribution {
            font-size: 8px !important;
          }
        `}
      </style>
    </section>
  );
}

export default FarmLocationMap;