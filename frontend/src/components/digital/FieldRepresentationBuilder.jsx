
// import {
//   Check,
//   ChevronLeft,
//   Crosshair,
//   MapPin,
//   RotateCcw,
//   Trash2,
// } from "lucide-react";

// import { useEffect, useMemo, useState } from "react";

// import GPSFieldMap from "./GPSFieldMap";
// import DigitalTwinCanvas from "./DigitalTwinCanvas";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// import {
//   buildFieldGeometry,
//   validateGPSCoordinates,
// } from "../../utils/fieldGeometry";
// import { getMyFarms } from "../../services/farm.service";

// export default function FieldRepresentationBuilder() {
  
//   const [mode, setMode] =
//     useState("rectangle");

//   const [length, setLength] =
//     useState("");

//   const [width, setWidth] =
//     useState("");

//   const [orientation, setOrientation] =
//     useState(0);

//   const [crop, setCrop] =
//     useState("Rice");

//   const [gpsPoints, setGpsPoints] =
//     useState([]);

//   const [geometry, setGeometry] =
//     useState(null);

//   const [gpsCompleted, setGpsCompleted] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const navigate = useNavigate();
//   const [showSaveDialog, setShowSaveDialog] = useState(false);
//   const [farms, setFarms] = useState([]);
//   const [fields, setFields] = useState([]);

//   const [saving, setSaving] = useState(false);
//   const [loadingFarms, setLoadingFarms] = useState(false);
//   const [loadingFields, setLoadingFields] = useState(false);

//   const [saveForm, setSaveForm] = useState({
//     name: "",
//     farmId: "",
//     fieldId: "",
//     season: "",
//     notes: "",
//   });

//   /* ---------------------------------------------------
//      Rectangle generation
//   --------------------------------------------------- */

//   const generateRectangle = () => {
//     try {
//       setError("");

//       const generated =
//         buildFieldGeometry({
//           mode: "rectangle",
//           length,
//           width,
//           orientation,
//         });

//       setGeometry(generated);
//     } catch (error) {
//       setGeometry(null);

//       setError(
//         error?.message ||
//           "Unable to generate field geometry."
//       );
//     }
//   };

//   /* ---------------------------------------------------
//      GPS points update
//   --------------------------------------------------- */

//   const handleGPSPointsChange = (
//     points
//   ) => {
//     setGpsPoints(points);

//     setGeometry(null);
//     setGpsCompleted(false);
//     setError("");
//   };

//   /* ---------------------------------------------------
//      Finish GPS Boundary
//   --------------------------------------------------- */

//   const finishGPSBoundary = () => {
//     try {
//       setError("");

//       const validation =
//         validateGPSCoordinates(
//           gpsPoints
//         );

//       if (!validation.valid) {
//         setError(
//           validation.message
//         );

//         return;
//       }

//       const generated =
//         buildFieldGeometry({
//           mode: "gps",
//           coordinates: gpsPoints,
//         });

//       setGeometry(generated);
//       setGpsCompleted(true);
//     } catch (error) {
//       setGeometry(null);

//       setError(
//         error?.message ||
//           "Unable to generate Digital Twin."
//       );
//     }
//   };

//   /* ---------------------------------------------------
//      Undo GPS point
//   --------------------------------------------------- */

//   const undoLastPoint = () => {
//     if (gpsPoints.length === 0) {
//       return;
//     }

//     setGpsPoints(
//       gpsPoints.slice(
//         0,
//         -1
//       )
//     );

//     setGeometry(null);
//     setGpsCompleted(false);
//     setError("");
//   };

//   /* ---------------------------------------------------
//      Clear GPS
//   --------------------------------------------------- */

//   const clearGPSPoints = () => {
//     setGpsPoints([]);
//     setGeometry(null);
//     setGpsCompleted(false);
//     setError("");
//   };

//   /* ---------------------------------------------------
//      Edit GPS boundary
//   --------------------------------------------------- */

//   const editGPSBoundary = () => {
//     setGpsCompleted(false);
//     setGeometry(null);
//     setError("");
//   };

//   /* ---------------------------------------------------
//      Change mode
//   --------------------------------------------------- */

//   const changeMode = (
//     nextMode
//   ) => {
//     setMode(nextMode);
//     setError("");

//     if (
//       nextMode === "gps"
//     ) {
//       setGeometry(null);
//       setGpsCompleted(false);
//     }
//   };

//   const areaInAcres =
//     geometry?.area
//       ? geometry.area /
//         4046.8564224
//       : 0;

//   const areaInHectares =
//     geometry?.area
//       ? geometry.area /
//         10000
//       : 0;

//   const openSaveDialog = async () => {
//     if (!geometry) {
//       setError("Please generate the field geometry first.");
//       return;
//     }

//     setError("");
//     setLoadingFarms(true);
//     setShowSaveDialog(true);

//     try {
//       const [farmResponse, fieldResponse] = await Promise.all([
//         api.get("/farms/get-my-farms"),
//         api.get("/fields/get-my-fields"),
//       ]);

//       setFarms(farmResponse.data.farms ?? []);
//       setFields(fieldResponse.data.fields ?? []);
//     } catch (error) {
//       console.error("Failed to load farms and fields:", error);
//       setError(
//         error.response?.data?.message ||
//           "Could not load your farms and fields."
//       );
//     } finally {
//       setLoadingFarms(false);
//     }
//   };

//   const handleSaveFormChange = (event) => {
//     const { name, value } = event.target;

//     setSaveForm((previous) => ({
//       ...previous,
//       [name]: value,

//       // Reset the field whenever the farm changes.
//       ...(name === "farmId" ? { fieldId: "" } : {}),
//     }));
//   };

//   const handleSaveDigitalTwin = async (event) => {
//     event.preventDefault();

//     if (!geometry) {
//       setError("Generate the field geometry first.");
//       return;
//     }

//     if (!saveForm.farmId || !saveForm.fieldId) {
//       setError("Please select both a farm and a field.");
//       return;
//     }

//     setSaving(true);
//     setError("");

//     try {
//       const payload = {
//         name: saveForm.name.trim(),
//         farmId: saveForm.farmId,
//         fieldId: saveForm.fieldId,
//         geometryType: geometry.type || "polygon",
//         coordinateSystem: geometry.coordinateSystem || "local-meter",
//         geometryJson: geometry,
//         gpsCoordinates: geometry.gpsCoordinates ?? undefined,
//         localCoordinates: geometry.coordinates,
//         area: Number(geometry.area),
//         areaUnit: "sqm",
//         perimeter: Number(geometry.perimeter),
//         crop,
//         season: saveForm.season.trim() || undefined,
//         notes: saveForm.notes.trim() || undefined,
//       };

//       await api.post("/digital-twins/create", payload);

//       setShowSaveDialog(false);

//       // Return to the main Digital Twin page.
//       navigate(-1);
//     } catch (error) {
//       console.error("Save Digital Twin Error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to save Digital Twin. Please try again."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   useEffect(() => {
//       const loadFarms = async () => {
//         try {
//           setLoadingFarms(true);
  
//           const response = await getMyFarms();
   
//           setFarms(response?.farms || []);
//         } catch (error) {
//           console.error("Get My Farms Error:", error);
  
//           setFarms([]);
//         } finally {
//           setLoadingFarms(false);
//         }
//       };

//       const loadFields = async () => {
//         try {
//           setLoadingFields(true)

//           const response = getMyFieldsByFarmId()
//         } catch (error) {
          
//         }
//       }
  
//       loadFarms();
//     }, []);

//   return (
//     <main
//       className="
//         min-h-screen
//         bg-[var(--color-bg)]
//         px-[28px]
//         pb-[40px]
//         pt-[22px]
//         text-[var(--color-text-primary)]
//         xl:px-[30px]
//       "
//     >
//       {/* ------------------------------------------------
//           Header
//       ------------------------------------------------ */}

//       <section
//         className="
//           mb-[20px]
//           flex
//           flex-col
//           gap-[12px]
//           lg:flex-row
//           lg:items-center
//           lg:justify-between
//         "
//       >
//         <div>
//           <div
//             className="
//               flex
//               items-center
//               gap-[8px]
//             "
//           >
//             <span
//               className="
//                 flex
//                 h-[32px]
//                 w-[32px]
//                 items-center
//                 justify-center
//                 rounded-[9px]
//                 bg-green-500/10
//                 text-green-600
//               "
//             >
//               <MapPin size={16} />
//             </span>

//             <h1
//               className="
//                 text-[25px]
//                 font-extrabold
//                 tracking-[-1px]
//               "
//             >
//               Field Digital Twin
//             </h1>
//           </div>

//           <p
//             className="
//               mt-[5px]
//               max-w-[650px]
//               text-[11px]
//               leading-[17px]
//               text-[var(--color-text-secondary)]
//             "
//           >
//             Create the real-world geometric
//             representation of your agricultural
//             field before adding sensors, crop
//             intelligence and AI layers.
//           </p>
//         </div>
//       </section>

//       {/* ------------------------------------------------
//           Main Builder
//       ------------------------------------------------ */}

//       <section
//         className="
//           grid
//           grid-cols-1
//           gap-[18px]
//           xl:grid-cols-[330px_minmax(0,1fr)]
//         "
//       >
//         {/* =================================================
//             LEFT CONTROL PANEL
//         ================================================= */}

//         <aside
//           className="
//             rounded-[18px]
//             border
//             border-black/[0.06]
//             bg-white
//             p-[18px]
//             shadow-[0_12px_40px_rgba(15,23,42,.06)]
//           "
//         >
//           {/* Mode */}

//           <div>
//             <p
//               className="
//                 text-[10px]
//                 font-bold
//                 uppercase
//                 tracking-[.8px]
//                 text-slate-400
//               "
//             >
//               Field geometry
//             </p>

//             <div
//               className="
//                 mt-[9px]
//                 grid
//                 grid-cols-2
//                 gap-[7px]
//               "
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   changeMode(
//                     "rectangle"
//                   )
//                 }
//                 className={`
//                   rounded-[10px]
//                   border
//                   px-[10px]
//                   py-[10px]
//                   text-[10px]
//                   font-bold
//                   transition
//                   ${
//                     mode ===
//                     "rectangle"
//                       ? "border-green-500 bg-green-500/10 text-green-600"
//                       : "border-slate-200 text-slate-500 hover:bg-slate-50"
//                   }
//                 `}
//               >
//                 Length / Width
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   changeMode("gps")
//                 }
//                 className={`
//                   rounded-[10px]
//                   border
//                   px-[10px]
//                   py-[10px]
//                   text-[10px]
//                   font-bold
//                   transition
//                   ${
//                     mode === "gps"
//                       ? "border-green-500 bg-green-500/10 text-green-600"
//                       : "border-slate-200 text-slate-500 hover:bg-slate-50"
//                   }
//                 `}
//               >
//                 GPS Boundary
//               </button>
//             </div>
//           </div>

//           {/* Crop */}

//           <div className="mt-[20px]">
//             <label
//               className="
//                 text-[10px]
//                 font-bold
//                 text-slate-500
//               "
//             >
//               Farm
//             </label>
//             <select
//             className="
//                 mt-[6px]
//                 h-[40px]
//                 w-full
//                 rounded-[10px]
//                 border
//                 border-slate-200
//                 bg-white
//                 px-[10px]
//                 text-[11px]
//                 font-semibold
//                 outline-none
//                 focus:border-green-500
//               "
//             >
//               <option value="">
//                 {loadingFarms
//                   ? "Loading farms..."
//                   : "Select a farm"}
//               </option>

//               {farms.map((farm) => (
//                 <option
//                   key={farm.id}
//                   value={farm.id}
//                 >
//                   {farm.name}
//                 </option>
//               ))}
//             </select>
//             <label
//               className="
//                 text-[10px]
//                 font-bold
//                 text-slate-500
//               "
//             >
//               Crop
//             </label>

//             <select
//               value={crop}
//               onChange={(event) =>
//                 setCrop(
//                   event.target.value
//                 )
//               }
//               className="
//                 mt-[6px]
//                 h-[40px]
//                 w-full
//                 rounded-[10px]
//                 border
//                 border-slate-200
//                 bg-white
//                 px-[10px]
//                 text-[11px]
//                 font-semibold
//                 outline-none
//                 focus:border-green-500
//               "
//             >
//               <option>
//                 Rice
//               </option>

//               <option>
//                 Wheat
//               </option>

//               <option>
//                 Maize
//               </option>

//               <option>
//                 Potato
//               </option>

//               <option>
//                 Tomato
//               </option>

//               <option>
//                 Other
//               </option>
//             </select>
//           </div>

//           {/* =================================================
//               RECTANGLE CONTROLS
//           ================================================= */}

//           {mode ===
//             "rectangle" && (
//             <>
//               <div
//                 className="
//                   mt-[18px]
//                   grid
//                   grid-cols-2
//                   gap-[8px]
//                 "
//               >
//                 <div>
//                   <label
//                     className="
//                       text-[10px]
//                       font-bold
//                       text-slate-500
//                     "
//                   >
//                     Length (m)
//                   </label>

//                   <input
//                     type="number"
//                     min="1"
//                     value={length}
//                     onChange={(event) =>
//                       setLength(
//                         event.target.value
//                       )
//                     }
//                     placeholder="100"
//                     className="
//                       mt-[6px]
//                       h-[40px]
//                       w-full
//                       rounded-[10px]
//                       border
//                       border-slate-200
//                       px-[10px]
//                       text-[11px]
//                       outline-none
//                       focus:border-green-500
//                     "
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className="
//                       text-[10px]
//                       font-bold
//                       text-slate-500
//                     "
//                   >
//                     Width (m)
//                   </label>

//                   <input
//                     type="number"
//                     min="1"
//                     value={width}
//                     onChange={(event) =>
//                       setWidth(
//                         event.target.value
//                       )
//                     }
//                     placeholder="50"
//                     className="
//                       mt-[6px]
//                       h-[40px]
//                       w-full
//                       rounded-[10px]
//                       border
//                       border-slate-200
//                       px-[10px]
//                       text-[11px]
//                       outline-none
//                       focus:border-green-500
//                     "
//                   />
//                 </div>
//               </div>

//               <div className="mt-[15px]">
//                 <label
//                   className="
//                     flex
//                     items-center
//                     justify-between
//                     text-[10px]
//                     font-bold
//                     text-slate-500
//                   "
//                 >
//                   Orientation

//                   <span className="text-green-600">
//                     {orientation}°
//                   </span>
//                 </label>

//                 <input
//                   type="range"
//                   min="0"
//                   max="360"
//                   value={orientation}
//                   onChange={(event) =>
//                     setOrientation(
//                       Number(
//                         event.target.value
//                       )
//                     )
//                   }
//                   className="
//                     mt-[9px]
//                     w-full
//                     accent-green-600
//                   "
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   generateRectangle
//                 }
//                 className="
//                   mt-[20px]
//                   flex
//                   h-[42px]
//                   w-full
//                   items-center
//                   justify-center
//                   gap-[7px]
//                   rounded-[10px]
//                   bg-green-600
//                   text-[10px]
//                   font-bold
//                   text-white
//                   shadow-[0_8px_20px_rgba(22,163,74,.18)]
//                   transition
//                   hover:bg-green-700
//                 "
//               >
//                 <Check size={14} />
//                 Generate Digital Twin
//               </button>
//             </>
//           )}

//           {/* =================================================
//               GPS CONTROLS
//           ================================================= */}

//           {mode === "gps" && (
//             <>
//               {!gpsCompleted ? (
//                 <>
//                   <div
//                     className="
//                       mt-[18px]
//                       rounded-[12px]
//                       bg-green-50
//                       p-[12px]
//                     "
//                   >
//                     <p
//                       className="
//                         text-[10px]
//                         font-bold
//                         text-green-700
//                       "
//                     >
//                       How to mark your field
//                     </p>

//                     <ol
//                       className="
//                         mt-[7px]
//                         space-y-[5px]
//                         text-[9px]
//                         leading-[14px]
//                         text-green-700/80
//                       "
//                     >
//                       <li>
//                         1. Move the map to
//                         your field.
//                       </li>

//                       <li>
//                         2. Click each corner
//                         of the field.
//                       </li>

//                       <li>
//                         3. Continue around
//                         the boundary.
//                       </li>

//                       <li>
//                         4. Finish when all
//                         corners are marked.
//                       </li>
//                     </ol>
//                   </div>

//                   <div
//                     className="
//                       mt-[14px]
//                       flex
//                       items-center
//                       justify-between
//                       rounded-[10px]
//                       border
//                       border-slate-200
//                       px-[11px]
//                       py-[9px]
//                     "
//                   >
//                     <div>
//                       <p
//                         className="
//                           text-[9px]
//                           font-bold
//                           text-slate-400
//                         "
//                       >
//                         Selected points
//                       </p>

//                       <p
//                         className="
//                           mt-[1px]
//                           text-[15px]
//                           font-extrabold
//                           text-slate-800
//                         "
//                       >
//                         {gpsPoints.length}
//                       </p>
//                     </div>

//                     <div
//                       className="
//                         flex
//                         gap-[5px]
//                       "
//                     >
//                       <button
//                         type="button"
//                         disabled={
//                           gpsPoints.length ===
//                           0
//                         }
//                         onClick={
//                           undoLastPoint
//                         }
//                         className="
//                           flex
//                           h-[32px]
//                           items-center
//                           gap-[5px]
//                           rounded-[8px]
//                           border
//                           border-slate-200
//                           px-[9px]
//                           text-[9px]
//                           font-bold
//                           text-slate-600
//                           disabled:cursor-not-allowed
//                           disabled:opacity-40
//                         "
//                       >
//                         <RotateCcw
//                           size={12}
//                         />

//                         Undo
//                       </button>

//                       <button
//                         type="button"
//                         disabled={
//                           gpsPoints.length ===
//                           0
//                         }
//                         onClick={
//                           clearGPSPoints
//                         }
//                         className="
//                           flex
//                           h-[32px]
//                           items-center
//                           gap-[5px]
//                           rounded-[8px]
//                           border
//                           border-red-200
//                           px-[9px]
//                           text-[9px]
//                           font-bold
//                           text-red-500
//                           disabled:cursor-not-allowed
//                           disabled:opacity-40
//                         "
//                       >
//                         <Trash2
//                           size={12}
//                         />

//                         Clear
//                       </button>
//                     </div>
//                   </div>

//                   {gpsPoints.length >=
//                     3 && (
//                     <button
//                       type="button"
//                       onClick={
//                         finishGPSBoundary
//                       }
//                       className="
//                         mt-[12px]
//                         flex
//                         h-[42px]
//                         w-full
//                         items-center
//                         justify-center
//                         gap-[7px]
//                         rounded-[10px]
//                         bg-green-600
//                         text-[10px]
//                         font-bold
//                         text-white
//                         shadow-[0_8px_20px_rgba(22,163,74,.18)]
//                         transition
//                         hover:bg-green-700
//                       "
//                     >
//                       <Check size={14} />

//                       Finish & Generate Twin
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   <div
//                     className="
//                       mt-[18px]
//                       rounded-[12px]
//                       border
//                       border-green-200
//                       bg-green-50
//                       p-[12px]
//                     "
//                   >
//                     <div
//                       className="
//                         flex
//                         items-center
//                         gap-[7px]
//                       "
//                     >
//                       <span
//                         className="
//                           flex
//                           h-[25px]
//                           w-[25px]
//                           items-center
//                           justify-center
//                           rounded-full
//                           bg-green-600
//                           text-white
//                         "
//                       >
//                         <Check
//                           size={13}
//                         />
//                       </span>

//                       <div>
//                         <p
//                           className="
//                             text-[10px]
//                             font-bold
//                             text-green-700
//                           "
//                         >
//                           Boundary generated
//                         </p>

//                         <p
//                           className="
//                             text-[8px]
//                             text-green-700/70
//                           "
//                         >
//                           Digital Twin ready
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className="
//                       mt-[12px]
//                       grid
//                       grid-cols-2
//                       gap-[7px]
//                     "
//                   >
//                     <div
//                       className="
//                         rounded-[10px]
//                         bg-slate-50
//                         p-[10px]
//                       "
//                     >
//                       <p className="text-[8px] text-slate-400">
//                         Area
//                       </p>

//                       <p className="mt-[2px] text-[12px] font-extrabold text-slate-800">
//                         {areaInAcres.toFixed(
//                           2
//                         )}{" "}
//                         acre
//                       </p>
//                     </div>

//                     <div
//                       className="
//                         rounded-[10px]
//                         bg-slate-50
//                         p-[10px]
//                       "
//                     >
//                       <p className="text-[8px] text-slate-400">
//                         Perimeter
//                       </p>

//                       <p className="mt-[2px] text-[12px] font-extrabold text-slate-800">
//                         {geometry?.perimeter
//                           ? `${Math.round(
//                               geometry.perimeter
//                             )} m`
//                           : "--"}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={
//                       editGPSBoundary
//                     }
//                     className="
//                       mt-[12px]
//                       flex
//                       h-[40px]
//                       w-full
//                       items-center
//                       justify-center
//                       gap-[6px]
//                       rounded-[10px]
//                       border
//                       border-slate-200
//                       text-[10px]
//                       font-bold
//                       text-slate-600
//                       transition
//                       hover:bg-slate-50
//                     "
//                   >
//                     <MapPin size={13} />

//                     Edit Boundary
//                   </button>
//                   {geometry && (
//                     <button
//                       type="button"
//                       onClick={openSaveDialog}
//                       className="
//                         mt-[12px]
//                         flex h-[44px] w-full
//                         items-center justify-center gap-[8px]
//                         rounded-[10px]
//                         bg-green-700
//                         text-[11px] font-bold text-white
//                         shadow-[0_8px_20px_rgba(22,163,74,.18)]
//                         transition hover:bg-green-800
//                       "
//                     >
//                       <Check size={15} />
//                       Save Digital Twin
//                     </button>
//                   )}
//                 </>
//               )}
//             </>
//           )}

//           {/* Error */}

//           {error && (
//             <div
//               className="
//                 mt-[14px]
//                 rounded-[10px]
//                 border
//                 border-red-200
//                 bg-red-50
//                 px-[10px]
//                 py-[9px]
//                 text-[9px]
//                 font-semibold
//                 leading-[14px]
//                 text-red-600
//               "
//             >
//               {error}
//             </div>
//           )}
//         </aside>

//         {/* =================================================
//             RIGHT VISUALIZATION
//         ================================================= */}

//         <section
//           className="
//             min-h-[560px]
//             overflow-hidden
//             rounded-[18px]
//             border
//             border-black/[0.06]
//             bg-white
//             shadow-[0_12px_40px_rgba(15,23,42,.06)]
//           "
//         >
//           {/* GPS MAP */}

//           {mode === "gps" &&
//             !gpsCompleted && (
//               <GPSFieldMap
//                 points={gpsPoints}
//                 onChange={
//                   handleGPSPointsChange
//                 }
//               />
//             )}

//           {/* DIGITAL TWIN */}

//           {(mode !== "gps" ||
//             gpsCompleted) &&
//             geometry && (
//               <div className="h-full min-h-[560px]">
//                 <DigitalTwinCanvas
//                   geometry={geometry}
//                   crop={crop}
//                 />
//               </div>
//             )}

//           {/* Empty rectangle state */}

//           {mode === "rectangle" &&
//             !geometry && (
//               <div
//                 className="
//                   flex
//                   min-h-[560px]
//                   items-center
//                   justify-center
//                   px-[30px]
//                   text-center
//                 "
//               >
//                 <div>
//                   <div
//                     className="
//                       mx-auto
//                       flex
//                       h-[54px]
//                       w-[54px]
//                       items-center
//                       justify-center
//                       rounded-[16px]
//                       bg-green-500/10
//                       text-green-600
//                     "
//                   >
//                     <Crosshair
//                       size={24}
//                     />
//                   </div>

//                   <h3
//                     className="
//                       mt-[13px]
//                       text-[14px]
//                       font-bold
//                       text-slate-800
//                     "
//                   >
//                     Field representation
//                   </h3>

//                   <p
//                     className="
//                       mx-auto
//                       mt-[5px]
//                       max-w-[330px]
//                       text-[10px]
//                       leading-[16px]
//                       text-slate-400
//                     "
//                   >
//                     Enter the physical dimensions
//                     of your field and generate its
//                     custom Digital Twin.
//                   </p>
//                 </div>
//               </div>
//             )}

            
//         </section>
        
//       </section>
//     </main>
//   );

  
// }


import {
  Check,
  ChevronLeft,
  Crosshair,
  MapPin,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import GPSFieldMap from "./GPSFieldMap";
import DigitalTwinCanvas from "./DigitalTwinCanvas";

import api from "../../services/api";
import { getMyFarms } from "../../services/farm.service";

import {
  buildFieldGeometry,
  validateGPSCoordinates,
} from "../../utils/fieldGeometry";
import { getMyFieldsByFarmId } from "../../services/field.service";

export default function FieldRepresentationBuilder() {
  const navigate = useNavigate();

  // Geometry state
  const [mode, setMode] = useState("rectangle");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [orientation, setOrientation] = useState(0);
  const [gpsPoints, setGpsPoints] = useState([]);
  const [geometry, setGeometry] = useState(null);
  const [gpsCompleted, setGpsCompleted] = useState(false);

  // Farm and field state
  const [farms, setFarms] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [selectedFieldId, setSelectedFieldId] = useState("");

  const [loadingFarms, setLoadingFarms] = useState(false);
  const [loadingFields, setLoadingFields] = useState(false);

  // Save dialog state
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const [saveForm, setSaveForm] = useState({
    name: "",
    season: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");

  // Selected farm and field
  const selectedFarm = useMemo(
    () => farms.find((farm) => farm.id === selectedFarmId),
    [farms, selectedFarmId]
  );

  const selectedField = useMemo(
    () => fields.find((field) => field.id === selectedFieldId),
    [fields, selectedFieldId]
  );

  const areaInAcres = geometry?.area
    ? geometry.area / 4046.8564224
    : 0;

  const areaInHectares = geometry?.area
    ? geometry.area / 10000
    : 0;

  // Normalize common API response shapes.
  const extractList = (response, key) => {
    if (Array.isArray(response?.[key])) {
      return response[key];
    }

    if (Array.isArray(response?.data?.[key])) {
      return response.data[key];
    }

    if (Array.isArray(response?.data?.data?.[key])) {
      return response.data.data[key];
    }

    return [];
  };

  /* ---------------------------------------------------
     Load farms once
  --------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    const loadFarms = async () => {
      try {
        setLoadingFarms(true);

        const response = await getMyFarms();

        if (cancelled) return;

        setFarms(extractList(response, "farms"));
      } catch (err) {
        console.error("Get My Farms Error:", err);

        if (!cancelled) {
          setFarms([]);
          setError(
            err?.response?.data?.message ||
              "Could not load your farms."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingFarms(false);
        }
      }
    };

    loadFarms();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------------------------------
     Load fields when farm changes
  --------------------------------------------------- */

  // const handleFarmChange = async (event) => {
  //   const farmId = event.target.value;

  //   setSelectedFarmId(farmId);
  //   setSelectedFieldId("");
  //   setFields([]);
  //   setError("");
  //   setSaveError("");

  //   if (!farmId) {
  //     return;
  //   }

  //   try {
  //     setLoadingFields(true);
  //     const response = getMyFieldsByFarmId(farmId);
  //     console.log(response)

  //     setFields(extractList(response.fields, "fields"));
  //   } catch (err) {
  //     console.error("Get Fields By Farm Error:", err);

  //     setFields([]);
  //     setError(
  //       err?.response?.data?.message ||
  //         "Could not load fields for this farm."
  //     );
  //   } finally {
  //     setLoadingFields(false);
  //   }
  // };

  
  const handleFarmChange = async (event) => {
    console.log("called")
    const farmId = event.target.value;

    setSelectedFarmId(farmId);
    setSelectedFieldId("");
    setFields([]);
    setError("");
    setSaveError("");

    if (!farmId) {
      console.log("dont have farmid")
      return;
    }

    try {
      console.log("called")
      setLoadingFields(true);

      const response = await getMyFieldsByFarmId(farmId);

      console.log("Fields API response:", response);

      setFields(
        Array.isArray(response?.fields)
          ? response.fields
          : []
      );
    } catch (err) {
      console.error("Get Fields By Farm Error:", err);

      setFields([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Could not load fields for this farm."
      );
    } finally {
      setLoadingFields(false);
    }
  };


  const handleFieldChange = (event) => {
    const fieldId = event.target.value;

    setSelectedFieldId(fieldId);
    setError("");
    setSaveError("");
  };

  /* ---------------------------------------------------
     Rectangle generation
  --------------------------------------------------- */

  const generateRectangle = () => {
    try {
      setError("");

      const generated = buildFieldGeometry({
        mode: "rectangle",
        length,
        width,
        orientation,
      });

      setGeometry(generated);
      setGpsCompleted(false);
    } catch (err) {
      setGeometry(null);

      setError(
        err?.message ||
          "Unable to generate field geometry."
      );
    }
  };

  /* ---------------------------------------------------
     GPS points update
  --------------------------------------------------- */

  const handleGPSPointsChange = (points) => {
    setGpsPoints(points);
    setGeometry(null);
    setGpsCompleted(false);
    setError("");
  };

  /* ---------------------------------------------------
     Finish GPS boundary
  --------------------------------------------------- */

  const finishGPSBoundary = () => {
    try {
      setError("");

      const validation = validateGPSCoordinates(gpsPoints);

      if (!validation.valid) {
        setError(validation.message);
        return;
      }

      const generated = buildFieldGeometry({
        mode: "gps",
        coordinates: gpsPoints,
      });

      setGeometry(generated);
      setGpsCompleted(true);
    } catch (err) {
      setGeometry(null);

      setError(
        err?.message ||
          "Unable to generate Digital Twin."
      );
    }
  };

  /* ---------------------------------------------------
     Undo GPS point
  --------------------------------------------------- */

  const undoLastPoint = () => {
    if (gpsPoints.length === 0) return;

    setGpsPoints((previous) => previous.slice(0, -1));
    setGeometry(null);
    setGpsCompleted(false);
    setError("");
  };

  /* ---------------------------------------------------
     Clear GPS points
  --------------------------------------------------- */

  const clearGPSPoints = () => {
    setGpsPoints([]);
    setGeometry(null);
    setGpsCompleted(false);
    setError("");
  };

  /* ---------------------------------------------------
     Edit GPS boundary
  --------------------------------------------------- */

  const editGPSBoundary = () => {
    setGpsCompleted(false);
    setGeometry(null);
    setError("");
  };

  /* ---------------------------------------------------
     Change geometry mode
  --------------------------------------------------- */

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setGeometry(null);
    setGpsCompleted(false);
    setError("");

    if (nextMode === "gps") {
      setGpsPoints([]);
    }
  };

  /* ---------------------------------------------------
     Open save dialog
  --------------------------------------------------- */

  const openSaveDialog = () => {
    if (!geometry) {
      setError("Please generate the field geometry first.");
      return;
    }

    if (!selectedFarmId || !selectedFieldId) {
      setError("Please select a farm and its field first.");
      return;
    }

    if (selectedField?.digitalTwin) {
      setError(
        "This field already has a Digital Twin. Please select another field."
      );
      return;
    }

    setError("");
    setSaveError("");

    setSaveForm({
      name: selectedField?.name
        ? `${selectedField.name} Digital Twin`
        : "",
      season: "",
      notes: "",
    });

    setShowSaveDialog(true);
  };

  /* ---------------------------------------------------
     Save form input
  --------------------------------------------------- */

  const handleSaveFormChange = (event) => {
    const { name, value } = event.target;

    setSaveForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ---------------------------------------------------
     Save Digital Twin
  --------------------------------------------------- */

  const handleSaveDigitalTwin = async (event) => {
    event.preventDefault();

    if (!geometry) {
      setSaveError("Generate the field geometry first.");
      return;
    }

    if (!selectedFarmId || !selectedFieldId) {
      setSaveError("Please select a farm and a field.");
      return;
    }

    if (!saveForm.name.trim()) {
      setSaveError("Please enter a Digital Twin name.");
      return;
    }

    if (selectedField?.digitalTwin) {
      setSaveError(
        "This field already has a Digital Twin."
      );
      return;
    }

    const area = Number(geometry.area);
    const perimeter = Number(geometry.perimeter);

    if (!Number.isFinite(area) || area <= 0) {
      setSaveError("The generated field area is invalid.");
      return;
    }

    if (!Number.isFinite(perimeter) || perimeter < 0) {
      setSaveError("The generated perimeter is invalid.");
      return;
    }

    setSaving(true);
    setSaveError("");

    try {
      const payload = {
        name: saveForm.name.trim(),
        farmId: selectedFarmId,
        fieldId: selectedFieldId,

        geometryType: geometry.type || "polygon",
        coordinateSystem:
          geometry.coordinateSystem || "local-meter",

        geometryJson: geometry,

        ...(geometry.gpsCoordinates
          ? { gpsCoordinates: geometry.gpsCoordinates }
          : {}),

        ...(geometry.coordinates
          ? { localCoordinates: geometry.coordinates }
          : {}),

        area,
        areaUnit: "sqm",
        perimeter,

        ...(saveForm.season
          ? { season: saveForm.season }
          : {}),

        ...(saveForm.notes.trim()
          ? { notes: saveForm.notes.trim() }
          : {}),

        // Do not send crop.
        // Backend reads crop from the selected Field record.
      };

      await api.post("/digital-twins/create", payload);

      setShowSaveDialog(false);

      // Return to the previous Digital Twin screen.
      navigate(-1);
    } catch (err) {
      console.error("Save Digital Twin Error:", err);

      setSaveError(
        err?.response?.data?.message ||
          "Failed to save Digital Twin. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[var(--color-bg)]
        px-[28px] pb-[40px] pt-[22px]
        text-[var(--color-text-primary)]
        xl:px-[30px]
      "
    >
      {/* Header */}

      <section
        className="
          mb-[20px] flex flex-col gap-[12px]
          lg:flex-row lg:items-center lg:justify-between
        "
      >
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mb-[12px] inline-flex items-center gap-[5px]
              text-[11px] font-semibold text-slate-500
              transition hover:text-green-600
            "
          >
            <ChevronLeft size={15} />
            Back to Digital Twin
          </button>

          <div className="flex items-center gap-[8px]">
            <span
              className="
                flex h-[32px] w-[32px] items-center justify-center
                rounded-[9px] bg-green-500/10 text-green-600
              "
            >
              <MapPin size={16} />
            </span>

            <h1 className="text-[25px] font-extrabold tracking-[-1px]">
              Field Digital Twin
            </h1>
          </div>

          <p
            className="
              mt-[5px] max-w-[650px] text-[11px] leading-[17px]
              text-[var(--color-text-secondary)]
            "
          >
            Create a geometric representation of your agricultural
            field before adding sensors, crop intelligence and AI layers.
          </p>
        </div>
      </section>

      {/* Main builder */}

      <section
        className="
          grid grid-cols-1 gap-[18px]
          xl:grid-cols-[330px_minmax(0,1fr)]
        "
      >
        {/* Left control panel */}

        <aside
          className="
            rounded-[18px] border border-black/[0.06]
            bg-white p-[18px]
            shadow-[0_12px_40px_rgba(15,23,42,.06)]
          "
        >
          {/* Geometry mode */}

          <div>
            <p
              className="
                text-[10px] font-bold uppercase tracking-[.8px]
                text-slate-400
              "
            >
              Field geometry
            </p>

            <div className="mt-[9px] grid grid-cols-2 gap-[7px]">
              <button
                type="button"
                onClick={() => changeMode("rectangle")}
                className={`
                  rounded-[10px] border px-[10px] py-[10px]
                  text-[10px] font-bold transition
                  ${
                    mode === "rectangle"
                      ? "border-green-500 bg-green-500/10 text-green-600"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }
                `}
              >
                Length / Width
              </button>

              <button
                type="button"
                onClick={() => changeMode("gps")}
                className={`
                  rounded-[10px] border px-[10px] py-[10px]
                  text-[10px] font-bold transition
                  ${
                    mode === "gps"
                      ? "border-green-500 bg-green-500/10 text-green-600"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }
                `}
              >
                GPS Boundary
              </button>
            </div>
          </div>

          {/* Farm and field selection */}

          <div className="mt-[20px]">
            <label
              htmlFor="farm-select"
              className="text-[10px] font-bold text-slate-500"
            >
              Select Farm
            </label>

            <select
              id="farm-select"
              value={selectedFarmId}
              onChange={handleFarmChange}
              disabled={loadingFarms}
              className="
                mt-[6px] h-[40px] w-full rounded-[10px]
                border border-slate-200 bg-white px-[10px]
                text-[11px] font-semibold outline-none
                focus:border-green-500 disabled:opacity-60
              "
            >
              <option value="">
                {loadingFarms ? "Loading farms..." : "Select a farm"}
              </option>

              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </select>

            {!loadingFarms && farms.length === 0 && (
              <p className="mt-[5px] text-[9px] text-amber-600">
                No farms found. Create a farm first.
              </p>
            )}

            <label
              htmlFor="field-select"
              className="mt-[14px] block text-[10px] font-bold text-slate-500"
            >
              Select Field
            </label>

            <select
              id="field-select"
              value={selectedFieldId}
              onChange={handleFieldChange}
              disabled={!selectedFarmId || loadingFields}
              className="
                mt-[6px] h-[40px] w-full rounded-[10px]
                border border-slate-200 bg-white px-[10px]
                text-[11px] font-semibold outline-none
                focus:border-green-500 disabled:cursor-not-allowed
                disabled:bg-slate-50 disabled:opacity-60
              "
            >
              <option value="">
                {!selectedFarmId
                  ? "Select a farm first"
                  : loadingFields
                    ? "Loading fields..."
                    : fields.length === 0
                      ? "No fields in this farm"
                      : "Select a field"}
              </option>

              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                  {field.digitalTwin ? " — Twin exists" : ""}
                </option>
              ))}
            </select>

            {selectedField && (
              <div className="mt-[10px] rounded-[10px] bg-green-50 p-[10px]">
                <p className="text-[10px] font-bold text-green-800">
                  {selectedField.name}
                </p>

                <p className="mt-[4px] text-[9px] text-green-700">
                  Crop: {selectedField.crop || "Not specified"}
                </p>

                {selectedField.digitalTwin && (
                  <p className="mt-[4px] text-[9px] font-semibold text-amber-700">
                    A Digital Twin already exists for this field.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Rectangle controls */}

          {mode === "rectangle" && (
            <>
              <div className="mt-[18px] grid grid-cols-2 gap-[8px]">
                <div>
                  <label
                    htmlFor="field-length"
                    className="text-[10px] font-bold text-slate-500"
                  >
                    Length (m)
                  </label>

                  <input
                    id="field-length"
                    type="number"
                    min="1"
                    value={length}
                    onChange={(event) => setLength(event.target.value)}
                    placeholder="100"
                    className="
                      mt-[6px] h-[40px] w-full rounded-[10px]
                      border border-slate-200 px-[10px] text-[11px]
                      outline-none focus:border-green-500
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="field-width"
                    className="text-[10px] font-bold text-slate-500"
                  >
                    Width (m)
                  </label>

                  <input
                    id="field-width"
                    type="number"
                    min="1"
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                    placeholder="50"
                    className="
                      mt-[6px] h-[40px] w-full rounded-[10px]
                      border border-slate-200 px-[10px] text-[11px]
                      outline-none focus:border-green-500
                    "
                  />
                </div>
              </div>

              <div className="mt-[15px]">
                <label
                  htmlFor="orientation"
                  className="
                    flex items-center justify-between
                    text-[10px] font-bold text-slate-500
                  "
                >
                  Orientation
                  <span className="text-green-600">{orientation}°</span>
                </label>

                <input
                  id="orientation"
                  type="range"
                  min="0"
                  max="360"
                  value={orientation}
                  onChange={(event) =>
                    setOrientation(Number(event.target.value))
                  }
                  className="mt-[9px] w-full accent-green-600"
                />
              </div>

              <button
                type="button"
                onClick={generateRectangle}
                className="
                  mt-[20px] flex h-[42px] w-full items-center
                  justify-center gap-[7px] rounded-[10px]
                  bg-green-600 text-[10px] font-bold text-white
                  shadow-[0_8px_20px_rgba(22,163,74,.18)]
                  transition hover:bg-green-700
                "
              >
                <Check size={14} />
                Generate Digital Twin
              </button>
            </>
          )}

          {/* GPS controls */}

          {mode === "gps" && (
            <>
              {!gpsCompleted ? (
                <>
                  <div className="mt-[18px] rounded-[12px] bg-green-50 p-[12px]">
                    <p className="text-[10px] font-bold text-green-700">
                      How to mark your field
                    </p>

                    <ol className="mt-[7px] space-y-[5px] text-[9px] leading-[14px] text-green-700/80">
                      <li>1. Move the map to your field.</li>
                      <li>2. Click each corner of the field.</li>
                      <li>3. Continue around the boundary.</li>
                      <li>4. Finish after marking all corners.</li>
                    </ol>
                  </div>

                  <div
                    className="
                      mt-[14px] flex items-center justify-between
                      rounded-[10px] border border-slate-200
                      px-[11px] py-[9px]
                    "
                  >
                    <div>
                      <p className="text-[9px] font-bold text-slate-400">
                        Selected points
                      </p>

                      <p className="mt-[1px] text-[15px] font-extrabold text-slate-800">
                        {gpsPoints.length}
                      </p>
                    </div>

                    <div className="flex gap-[5px]">
                      <button
                        type="button"
                        disabled={gpsPoints.length === 0}
                        onClick={undoLastPoint}
                        className="
                          flex h-[32px] items-center gap-[5px]
                          rounded-[8px] border border-slate-200
                          px-[9px] text-[9px] font-bold text-slate-600
                          disabled:cursor-not-allowed disabled:opacity-40
                        "
                      >
                        <RotateCcw size={12} />
                        Undo
                      </button>

                      <button
                        type="button"
                        disabled={gpsPoints.length === 0}
                        onClick={clearGPSPoints}
                        className="
                          flex h-[32px] items-center gap-[5px]
                          rounded-[8px] border border-red-200
                          px-[9px] text-[9px] font-bold text-red-500
                          disabled:cursor-not-allowed disabled:opacity-40
                        "
                      >
                        <Trash2 size={12} />
                        Clear
                      </button>
                    </div>
                  </div>

                  {gpsPoints.length >= 3 && (
                    <button
                      type="button"
                      onClick={finishGPSBoundary}
                      className="
                        mt-[12px] flex h-[42px] w-full
                        items-center justify-center gap-[7px]
                        rounded-[10px] bg-green-600
                        text-[10px] font-bold text-white
                        shadow-[0_8px_20px_rgba(22,163,74,.18)]
                        transition hover:bg-green-700
                      "
                    >
                      <Check size={14} />
                      Finish & Generate Twin
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div className="mt-[18px] rounded-[12px] border border-green-200 bg-green-50 p-[12px]">
                    <div className="flex items-center gap-[7px]">
                      <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-green-600 text-white">
                        <Check size={13} />
                      </span>

                      <div>
                        <p className="text-[10px] font-bold text-green-700">
                          Boundary generated
                        </p>

                        <p className="text-[8px] text-green-700/70">
                          Digital Twin geometry is ready
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[12px] grid grid-cols-2 gap-[7px]">
                    <div className="rounded-[10px] bg-slate-50 p-[10px]">
                      <p className="text-[8px] text-slate-400">Area</p>

                      <p className="mt-[2px] text-[12px] font-extrabold text-slate-800">
                        {areaInAcres.toFixed(2)} acre
                      </p>

                      <p className="mt-[2px] text-[8px] text-slate-500">
                        {areaInHectares.toFixed(3)} hectare
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-slate-50 p-[10px]">
                      <p className="text-[8px] text-slate-400">
                        Perimeter
                      </p>

                      <p className="mt-[2px] text-[12px] font-extrabold text-slate-800">
                        {geometry?.perimeter
                          ? `${Math.round(geometry.perimeter)} m`
                          : "--"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={editGPSBoundary}
                    className="
                      mt-[12px] flex h-[40px] w-full
                      items-center justify-center gap-[6px]
                      rounded-[10px] border border-slate-200
                      text-[10px] font-bold text-slate-600
                      transition hover:bg-slate-50
                    "
                  >
                    <MapPin size={13} />
                    Edit Boundary
                  </button>
                </>
              )}
            </>
          )}

          {/* Geometry summary */}

          {geometry && (
            <div className="mt-[14px] rounded-[10px] border border-slate-200 p-[11px]">
              <p className="text-[10px] font-bold text-slate-700">
                Geometry summary
              </p>

              <div className="mt-[7px] flex justify-between gap-[10px] text-[9px] text-slate-500">
                <span>Area</span>
                <span className="font-bold text-slate-700">
                  {Number(geometry.area).toFixed(2)} sqm
                </span>
              </div>

              <div className="mt-[5px] flex justify-between gap-[10px] text-[9px] text-slate-500">
                <span>Perimeter</span>
                <span className="font-bold text-slate-700">
                  {Number(geometry.perimeter).toFixed(2)} m
                </span>
              </div>

              <button
                type="button"
                onClick={openSaveDialog}
                disabled={
                  !selectedFarmId ||
                  !selectedFieldId ||
                  Boolean(selectedField?.digitalTwin)
                }
                className="
                  mt-[13px] flex h-[44px] w-full
                  items-center justify-center gap-[8px]
                  rounded-[10px] bg-green-700
                  text-[11px] font-bold text-white
                  shadow-[0_8px_20px_rgba(22,163,74,.18)]
                  transition hover:bg-green-800
                  disabled:cursor-not-allowed disabled:bg-slate-300
                  disabled:shadow-none
                "
              >
                <Check size={15} />
                Save Digital Twin
              </button>

              {!selectedFarmId || !selectedFieldId ? (
                <p className="mt-[7px] text-center text-[9px] text-slate-400">
                  Select a farm and field before saving.
                </p>
              ) : selectedField?.digitalTwin ? (
                <p className="mt-[7px] text-center text-[9px] text-amber-600">
                  This field already has a Digital Twin.
                </p>
              ) : null}
            </div>
          )}

          {/* Geometry error */}

          {error && (
            <div className="mt-[14px] rounded-[10px] border border-red-200 bg-red-50 px-[10px] py-[9px] text-[9px] font-semibold leading-[14px] text-red-600">
              {error}
            </div>
          )}
        </aside>

        {/* Right visualization */}

        <section
          className="
            min-h-[560px] overflow-hidden rounded-[18px]
            border border-black/[0.06] bg-white
            shadow-[0_12px_40px_rgba(15,23,42,.06)]
          "
        >
          {/* GPS map */}

          {mode === "gps" && !gpsCompleted && (
            <GPSFieldMap
              points={gpsPoints}
              onChange={handleGPSPointsChange}
            />
          )}

          {/* Digital Twin canvas */}

          {(mode !== "gps" || gpsCompleted) && geometry && (
            <div className="min-h-[560px] h-full">
              <DigitalTwinCanvas
                geometry={geometry}
                crop={selectedField?.crop || "Crop"}
              />
            </div>
          )}

          {/* Empty state */}

          {mode === "rectangle" && !geometry && (
            <div className="flex min-h-[560px] items-center justify-center px-[30px] text-center">
              <div>
                <div className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-[16px] bg-green-500/10 text-green-600">
                  <Crosshair size={24} />
                </div>

                <h3 className="mt-[13px] text-[14px] font-bold text-slate-800">
                  Field representation
                </h3>

                <p className="mx-auto mt-[5px] max-w-[330px] text-[10px] leading-[16px] text-slate-400">
                  Enter the physical dimensions of your field and generate
                  its custom Digital Twin.
                </p>
              </div>
            </div>
          )}
        </section>
      </section>

      {/* Save Digital Twin dialog */}

      {showSaveDialog && (
        <div
          className="
            fixed inset-0 z-[100] flex items-center justify-center
            overflow-y-auto bg-black/50 p-[16px] backdrop-blur-[3px]
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              setShowSaveDialog(false);
              setSaveError("");
            }
          }}
        >
          <form
            onSubmit={handleSaveDigitalTwin}
            className="
              my-auto w-full max-w-[460px] rounded-[18px]
              border border-black/[0.06] bg-white p-[22px]
              shadow-[0_25px_80px_rgba(0,0,0,.2)]
            "
          >
            <div className="flex items-start justify-between gap-[12px]">
              <div>
                <h2 className="text-[17px] font-extrabold text-slate-900">
                  Save Digital Twin
                </h2>

                <p className="mt-[5px] text-[10px] leading-[16px] text-slate-500">
                  Save the generated geometry for the selected field.
                </p>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setShowSaveDialog(false);
                  setSaveError("");
                }}
                className="
                  flex h-[30px] w-[30px] shrink-0 items-center
                  justify-center rounded-[8px] text-slate-500
                  transition hover:bg-slate-100
                  disabled:opacity-50
                "
                aria-label="Close save dialog"
              >
                <X size={17} />
              </button>
            </div>

            {/* Selected farm */}

            <div className="mt-[18px] rounded-[10px] bg-slate-50 p-[12px]">
              <p className="text-[9px] font-bold uppercase tracking-[.6px] text-slate-400">
                Selected farm
              </p>

              <p className="mt-[4px] text-[11px] font-bold text-slate-800">
                {selectedFarm?.name || "Unknown farm"}
              </p>

              <p className="mt-[10px] text-[9px] font-bold uppercase tracking-[.6px] text-slate-400">
                Selected field
              </p>

              <p className="mt-[4px] text-[11px] font-bold text-slate-800">
                {selectedField?.name || "Unknown field"}
              </p>

              <p className="mt-[4px] text-[10px] text-slate-500">
                Crop: {selectedField?.crop || "Not specified"}
              </p>
            </div>

            {/* Digital Twin name */}

            <div className="mt-[16px]">
              <label
                htmlFor="twin-name"
                className="text-[10px] font-bold text-slate-600"
              >
                Digital Twin Name *
              </label>

              <input
                id="twin-name"
                name="name"
                value={saveForm.name}
                onChange={handleSaveFormChange}
                maxLength={100}
                required
                placeholder="e.g. North Rice Field Twin"
                className="
                  mt-[6px] h-[42px] w-full rounded-[10px]
                  border border-slate-200 px-[11px]
                  text-[11px] text-slate-800 outline-none
                  focus:border-green-500
                "
              />
            </div>

            {/* Season */}

            <div className="mt-[13px]">
              <label
                htmlFor="twin-season"
                className="text-[10px] font-bold text-slate-600"
              >
                Season
              </label>

              <select
                id="twin-season"
                name="season"
                value={saveForm.season}
                onChange={handleSaveFormChange}
                className="
                  mt-[6px] h-[42px] w-full rounded-[10px]
                  border border-slate-200 bg-white px-[11px]
                  text-[11px] text-slate-800 outline-none
                  focus:border-green-500
                "
              >
                <option value="">Select season (optional)</option>
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
                <option value="Zaid">Zaid</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Notes */}

            <div className="mt-[13px]">
              <label
                htmlFor="twin-notes"
                className="text-[10px] font-bold text-slate-600"
              >
                Notes
              </label>

              <textarea
                id="twin-notes"
                name="notes"
                value={saveForm.notes}
                onChange={handleSaveFormChange}
                rows={3}
                maxLength={1000}
                placeholder="Add optional details about this Digital Twin..."
                className="
                  mt-[6px] w-full resize-y rounded-[10px]
                  border border-slate-200 px-[11px] py-[10px]
                  text-[11px] text-slate-800 outline-none
                  focus:border-green-500
                "
              />
            </div>

            {/* Geometry summary */}

            <div className="mt-[13px] grid grid-cols-2 gap-[8px]">
              <div className="rounded-[10px] bg-green-50 p-[10px]">
                <p className="text-[9px] text-green-700">Area</p>

                <p className="mt-[3px] text-[12px] font-extrabold text-green-800">
                  {Number(geometry?.area || 0).toFixed(2)} sqm
                </p>
              </div>

              <div className="rounded-[10px] bg-green-50 p-[10px]">
                <p className="text-[9px] text-green-700">Perimeter</p>

                <p className="mt-[3px] text-[12px] font-extrabold text-green-800">
                  {Number(geometry?.perimeter || 0).toFixed(2)} m
                </p>
              </div>
            </div>

            {saveError && (
              <div className="mt-[13px] rounded-[9px] border border-red-200 bg-red-50 px-[10px] py-[9px] text-[10px] font-semibold leading-[15px] text-red-600">
                {saveError}
              </div>
            )}

            {/* Actions */}

            <div className="mt-[18px] flex gap-[9px]">
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setShowSaveDialog(false);
                  setSaveError("");
                }}
                className="
                  h-[42px] flex-1 rounded-[10px]
                  border border-slate-200 text-[11px]
                  font-bold text-slate-600 transition
                  hover:bg-slate-50 disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  flex h-[42px] flex-1 items-center
                  justify-center gap-[7px] rounded-[10px]
                  bg-green-700 text-[11px] font-bold text-white
                  transition hover:bg-green-800
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                <Check size={14} />
                {saving ? "Saving..." : "Save Digital Twin"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
