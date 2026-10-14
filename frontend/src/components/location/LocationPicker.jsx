// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";
// import L from "leaflet";
// import { useEffect, useState } from "react";
// import { LocateFixed, MapPin, Loader2 } from "lucide-react";

// import "leaflet/dist/leaflet.css";

// /* =========================================================
//    FIX LEAFLET MARKER ICON
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

// /* =========================================================
//    DEFAULT INDIA LOCATION
// ========================================================= */

// const DEFAULT_LOCATION = {
//   latitude: 20.5937,
//   longitude: 78.9629,
// };

// /* =========================================================
//    MAP CENTER CONTROLLER
// ========================================================= */

// function MapCenterController({ position }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!position) return;

//     map.flyTo(
//       [position.latitude, position.longitude],
//       Math.max(map.getZoom(), 15),
//       {
//         duration: 0.8,
//       }
//     );
//   }, [position, map]);

//   return null;
// }

// /* =========================================================
//    MAP CLICK HANDLER
// ========================================================= */

// function LocationMarker({ position, onSelect }) {
//   useMapEvents({
//     click(event) {
//       onSelect({
//         latitude: event.latlng.lat,
//         longitude: event.latlng.lng,
//       });
//     },
//   });

//   if (!position) return null;

//   return (
//     <Marker
//       position={[
//         position.latitude,
//         position.longitude,
//       ]}
//     />
//   );
// }

// /* =========================================================
//    CURRENT LOCATION BUTTON
// ========================================================= */

// function CurrentLocationButton({ onLocation }) {
//   const map = useMap();

//   const [loading, setLoading] = useState(false);

//   const locateUser = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const location = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         };

//         onLocation(location);

//         map.flyTo(
//           [
//             location.latitude,
//             location.longitude,
//           ],
//           16,
//           {
//             duration: 1,
//           }
//         );

//         setLoading(false);
//       },
//       () => {
//         setLoading(false);

//         alert(
//           "Unable to access your current location. Please allow location permission."
//         );
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   return (
//     <button
//       type="button"
//       onClick={locateUser}
//       className="
//         absolute
//         right-[12px]
//         top-[12px]
//         z-[500]
//         flex
//         h-[38px]
//         w-[38px]
//         items-center
//         justify-center
//         rounded-[10px]
//         border
//         border-[var(--color-border)]
//         bg-[var(--color-surface)]/95
//         text-[var(--color-text-secondary)]
//         shadow-[0_5px_18px_rgba(0,0,0,.12)]
//         backdrop-blur-xl
//         transition
//         hover:text-[var(--color-primary)]
//         hover:border-[var(--color-primary)]/40
//       "
//       title="Use current location"
//     >
//       {loading ? (
//         <Loader2
//           size={17}
//           className="animate-spin"
//         />
//       ) : (
//         <LocateFixed size={17} />
//       )}
//     </button>
//   );
// }

// /* =========================================================
//    LOCATION PICKER
// ========================================================= */

// function LocationPicker({
//   value,
//   onChange,
//   height = "260px",
// }) {
//   const [position, setPosition] = useState(
//     value?.latitude && value?.longitude
//       ? {
//           latitude: value.latitude,
//           longitude: value.longitude,
//         }
//       : null
//   );

//   const [loadingLocation, setLoadingLocation] =
//     useState(!position);

//   /* =======================================================
//      GET USER CURRENT LOCATION INITIALLY
//   ======================================================= */

//   useEffect(() => {
//     if (position) {
//       setLoadingLocation(false);
//       return;
//     }

//     if (!navigator.geolocation) {
//       setPosition(DEFAULT_LOCATION);
//       setLoadingLocation(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (location) => {
//         const currentLocation = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         };

//         setPosition(currentLocation);

//         onChange?.({
//           ...currentLocation,
//         });

//         setLoadingLocation(false);
//       },
//       () => {
//         /*
//          * If user denies permission,
//          * fallback to India center.
//          */

//         setPosition(DEFAULT_LOCATION);

//         onChange?.({
//           ...DEFAULT_LOCATION,
//         });

//         setLoadingLocation(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   }, []);

//   /* =======================================================
//      POSITION SELECT
//   ======================================================= */

//   const handleSelect = (location) => {
//     setPosition(location);

//     onChange?.({
//       ...location,
//     });
//   };

//   /* =======================================================
//      CURRENT LOCATION
//   ======================================================= */

//   const handleCurrentLocation = (location) => {
//     setPosition(location);

//     onChange?.({
//       ...location,
//     });
//   };

//   return (
//     <div className="space-y-[8px]">

//       {/* MAP */}

//       <div
//         className="
//           relative
//           overflow-hidden
//           rounded-[14px]
//           border
//           border-[var(--color-border)]
//           bg-[var(--color-surface-secondary)]
//         "
//         style={{
//           height,
//         }}
//       >

//         <MapContainer
//           center={[
//             position?.latitude ||
//               DEFAULT_LOCATION.latitude,

//             position?.longitude ||
//               DEFAULT_LOCATION.longitude,
//           ]}
//           zoom={position ? 15 : 5}
//           scrollWheelZoom
//           className="h-full w-full"
//         >

//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {position && (
//             <>
//               <LocationMarker
//                 position={position}
//                 onSelect={handleSelect}
//               />

//               <MapCenterController
//                 position={position}
//               />
//             </>
//           )}

//           <CurrentLocationButton
//             onLocation={handleCurrentLocation}
//           />

//         </MapContainer>

//         {/* LOADING */}

//         {loadingLocation && (
//           <div
//             className="
//               absolute
//               inset-0
//               z-[600]
//               flex
//               items-center
//               justify-center
//               bg-[var(--color-surface)]/75
//               backdrop-blur-sm
//             "
//           >
//             <div className="flex items-center gap-[8px]">
//               <Loader2
//                 size={17}
//                 className="
//                   animate-spin
//                   text-[var(--color-primary)]
//                 "
//               />

//               <span
//                 className="
//                   text-[10px]
//                   font-semibold
//                   text-[var(--color-text-secondary)]
//                 "
//               >
//                 Detecting your location...
//               </span>
//             </div>
//           </div>
//         )}

//       </div>

//       {/* LOCATION INFO */}

//       {position && (
//         <div
//           className="
//             flex
//             items-center
//             gap-[8px]
//             rounded-[9px]
//             border
//             border-[var(--color-border)]
//             bg-[var(--color-surface-secondary)]/40
//             px-[10px]
//             py-[8px]
//           "
//         >
//           <div
//             className="
//               flex
//               h-[25px]
//               w-[25px]
//               shrink-0
//               items-center
//               justify-center
//               rounded-[7px]
//               bg-[var(--color-primary)]/10
//               text-[var(--color-primary)]
//             "
//           >
//             <MapPin size={13} />
//           </div>

//           <div className="min-w-0">
//             <p
//               className="
//                 text-[8px]
//                 font-semibold
//                 text-[var(--color-text-muted)]
//               "
//             >
//               Selected Coordinates
//             </p>

//             <p
//               className="
//                 mt-[1px]
//                 truncate
//                 text-[9px]
//                 font-bold
//                 text-[var(--color-text-primary)]
//               "
//             >
//               {position.latitude.toFixed(6)},{" "}
//               {position.longitude.toFixed(6)}
//             </p>
//           </div>
//         </div>
//       )}

//       <p
//         className="
//           text-[8px]
//           text-[var(--color-text-muted)]
//         "
//       >
//         Your current location is selected automatically.
//         Click anywhere on the map to choose another location.
//       </p>
//     </div>
//   );
// }

// export default LocationPicker;

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import { useEffect, useState } from "react";

import {
  LocateFixed,
  MapPin,
  Loader2,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

/* =========================================================
   FIX LEAFLET DEFAULT MARKER ICON
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
   DEFAULT INDIA LOCATION
========================================================= */

const DEFAULT_LOCATION = {
  latitude: 20.5937,
  longitude: 78.9629,
};

/* =========================================================
   VALIDATE LOCATION
========================================================= */

const isValidLocation = (location) => {
  return (
    location &&
    typeof location.latitude === "number" &&
    typeof location.longitude === "number" &&
    Number.isFinite(location.latitude) &&
    Number.isFinite(location.longitude)
  );
};

/* =========================================================
   MAP CENTER CONTROLLER
========================================================= */

function MapCenterController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(
      [
        position.latitude,
        position.longitude,
      ],
      Math.max(map.getZoom(), 15),
      {
        duration: 0.8,
      }
    );
  }, [
    position?.latitude,
    position?.longitude,
    map,
  ]);

  return null;
}

/* =========================================================
   MAP CLICK HANDLER + MARKER
========================================================= */

function LocationMarker({
  position,
  onSelect,
}) {
  useMapEvents({
    click(event) {
      const location = {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      };

      onSelect(location);
    },
  });

  if (!position) {
    return null;
  }

  return (
    <Marker
      position={[
        position.latitude,
        position.longitude,
      ]}
    />
  );
}

/* =========================================================
   CURRENT LOCATION BUTTON
========================================================= */

function CurrentLocationButton({
  onLocation,
}) {
  const map = useMap();

  const [loading, setLoading] =
    useState(false);

  const locateUser = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,
        };

        onLocation(location);

        map.flyTo(
          [
            location.latitude,
            location.longitude,
          ],
          16,
          {
            duration: 1,
          }
        );

        setLoading(false);
      },

      (error) => {
        console.error(
          "CURRENT LOCATION ERROR:",
          error
        );

        setLoading(false);

        alert(
          "Unable to access your current location. Please allow location permission."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <button
      type="button"
      onClick={locateUser}
      className="
        absolute
        right-[12px]
        top-[12px]
        z-[500]

        flex
        h-[38px]
        w-[38px]

        items-center
        justify-center

        rounded-[10px]

        border
        border-[var(--color-border)]

        bg-[var(--color-surface)]/95

        text-[var(--color-text-secondary)]

        shadow-[0_5px_18px_rgba(0,0,0,.12)]

        backdrop-blur-xl

        transition

        hover:border-[var(--color-primary)]/40
        hover:text-[var(--color-primary)]
      "
      title="Use current location"
    >
      {loading ? (
        <Loader2
          size={17}
          className="animate-spin"
        />
      ) : (
        <LocateFixed size={17} />
      )}
    </button>
  );
}

/* =========================================================
   LOCATION PICKER
========================================================= */

function LocationPicker({
  value = null,
  onChange,
  height = "260px",
}) {
  /* =======================================================
     INITIAL POSITION
  ======================================================= */

  const initialPosition =
    isValidLocation(value)
      ? {
          latitude: value.latitude,
          longitude: value.longitude,
        }
      : null;

  const [position, setPosition] =
    useState(initialPosition);

  const [loadingLocation, setLoadingLocation] =
    useState(!initialPosition);

  /* =======================================================
     DETECT USER LOCATION INITIALLY
  ======================================================= */

  useEffect(() => {
    /*
     * If parent already has a valid location,
     * use that location.
     */

    if (isValidLocation(value)) {
      const newPosition = {
        latitude: value.latitude,
        longitude: value.longitude,
      };

      setPosition(newPosition);
      setLoadingLocation(false);

      return;
    }

    /*
     * Otherwise detect current browser location.
     */

    if (!navigator.geolocation) {
      setPosition(DEFAULT_LOCATION);

      onChange?.({
        ...DEFAULT_LOCATION,
      });

      setLoadingLocation(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const currentLocation = {
          latitude:
            location.coords.latitude,

          longitude:
            location.coords.longitude,
        };

        setPosition(currentLocation);

        /*
         * VERY IMPORTANT:
         *
         * Send initial current location
         * to parent component.
         */

        onChange?.(currentLocation);

        setLoadingLocation(false);
      },

      (error) => {
        console.error(
          "INITIAL LOCATION ERROR:",
          error
        );

        /*
         * If user denies location,
         * fallback to India center.
         */

        setPosition(DEFAULT_LOCATION);

        onChange?.({
          ...DEFAULT_LOCATION,
        });

        setLoadingLocation(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  /* =======================================================
     SYNC VALUE FROM PARENT
  ======================================================= */

  useEffect(() => {
    if (!isValidLocation(value)) {
      return;
    }

    /*
     * Don't unnecessarily update state
     * if coordinates are already same.
     */

    if (
      position?.latitude ===
        value.latitude &&
      position?.longitude ===
        value.longitude
    ) {
      return;
    }

    setPosition({
      latitude: value.latitude,
      longitude: value.longitude,
    });

    setLoadingLocation(false);
  }, [
    value?.latitude,
    value?.longitude,
  ]);

  /* =======================================================
     MAP LOCATION SELECT
  ======================================================= */

  const handleSelect = (location) => {
    setPosition(location);

    /*
     * Send selected map coordinates
     * to parent.
     */

    onChange?.({
      ...location,
    });
  };

  /* =======================================================
     CURRENT LOCATION
  ======================================================= */

  const handleCurrentLocation = (
    location
  ) => {
    setPosition(location);

    /*
     * Send current location
     * to parent.
     */

    onChange?.({
      ...location,
    });
  };

  /* =======================================================
     MAP CENTER
  ======================================================= */

  const mapCenter =
    position || DEFAULT_LOCATION;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-[8px]">

      {/* =================================================
          MAP
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[14px]

          border
          border-[var(--color-border)]

          bg-[var(--color-surface-secondary)]
        "
        style={{
          height,
        }}
      >

        <MapContainer
          center={[
            mapCenter.latitude,
            mapCenter.longitude,
          ]}
          zoom={position ? 15 : 5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          {/* =================================================
              OPEN STREET MAP
          ================================================= */}

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* =================================================
              MARKER + CLICK
          ================================================= */}

          {position && (
            <LocationMarker
              position={position}
              onSelect={handleSelect}
            />
          )}

          {/* =================================================
              AUTO CENTER
          ================================================= */}

          {position && (
            <MapCenterController
              position={position}
            />
          )}

          {/* =================================================
              CURRENT LOCATION BUTTON
          ================================================= */}

          <CurrentLocationButton
            onLocation={
              handleCurrentLocation
            }
          />

        </MapContainer>

        {/* =================================================
            LOADING OVERLAY
        ================================================= */}

        {loadingLocation && (
          <div
            className="
              absolute
              inset-0
              z-[600]

              flex
              items-center
              justify-center

              bg-[var(--color-surface)]/75

              backdrop-blur-sm
            "
          >
            <div
              className="
                flex
                items-center
                gap-[8px]
              "
            >

              <Loader2
                size={17}
                className="
                  animate-spin
                  text-[var(--color-primary)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--color-text-secondary)]
                "
              >
                Detecting your location...
              </span>

            </div>
          </div>
        )}

      </div>

      {/* =================================================
          SELECTED LOCATION INFO
      ================================================= */}

      {position && (
        <div
          className="
            flex
            items-center
            gap-[8px]

            rounded-[9px]

            border
            border-[var(--color-border)]

            bg-[var(--color-surface-secondary)]/40

            px-[10px]
            py-[8px]
          "
        >

          {/* ICON */}

          <div
            className="
              flex
              h-[25px]
              w-[25px]

              shrink-0

              items-center
              justify-center

              rounded-[7px]

              bg-[var(--color-primary)]/10

              text-[var(--color-primary)]
            "
          >
            <MapPin size={13} />
          </div>

          {/* COORDINATES */}

          <div className="min-w-0">

            <p
              className="
                text-[8px]
                font-semibold
                text-[var(--color-text-muted)]
              "
            >
              Selected Coordinates
            </p>

            <p
              className="
                mt-[1px]
                truncate

                text-[9px]
                font-bold

                text-[var(--color-text-primary)]
              "
            >
              {position.latitude.toFixed(6)}
              {", "}
              {position.longitude.toFixed(6)}
            </p>

          </div>

        </div>
      )}

      {/* =================================================
          HELP TEXT
      ================================================= */}

      <p
        className="
          text-[8px]
          text-[var(--color-text-muted)]
        "
      >
        Your current location is selected
        automatically. Click anywhere on the
        map to choose another location.
      </p>

    </div>
  );
}

export default LocationPicker;
