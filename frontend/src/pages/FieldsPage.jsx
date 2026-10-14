// import { ChevronDown } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";

// import { fieldsData } from "../assets/data/fieldsData"

// import FieldsHeader from "../components/fields/FieldsHeader";
// import FieldsStats from "../components/fields/FieldsStats";
// import FieldsFilterBar from "../components/fields/FieldsFilterBar";
// import FieldCard from "../components/fields/FieldCard";
// import FieldListItem from "../components/fields/FieldListItem";
// import { getMyFields, createField } from "../services/field.service";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setFields,
//   setFieldLoading,
//   setFieldError,
//   addFieldToStore,
// } from "../store/slices/fieldSlice";

// export default function FieldsPage() {
//   const dispatch = useDispatch();

//   const {
//     fields,
//     loading,
//     error,
//   } = useSelector((state) => state.field);


//   const [search, setSearch] = useState("");
//   const [cropFilter, setCropFilter] = useState("All Crops");
//   const [farmFilter, setFarmFilter] = useState("All Farms");
//   const [healthFilter, setHealthFilter] = useState("All Health");
//   const [viewMode, setViewMode] = useState("grid");

//   const filteredFields = useMemo(() => {
//     return fieldsData.filter((field) => {
//       const searchValue = search.toLowerCase();

//       const matchesSearch =
//         field.name.toLowerCase().includes(searchValue) ||
//         field.farm.toLowerCase().includes(searchValue) ||
//         field.crop.toLowerCase().includes(searchValue);

//       const matchesCrop =
//         cropFilter === "All Crops" ||
//         field.crop === cropFilter;

//       const matchesFarm =
//         farmFilter === "All Farms" ||
//         field.farm === farmFilter;

//       const matchesHealth =
//         healthFilter === "All Health" ||
//         (healthFilter === "Healthy" &&
//           field.health >= 85) ||
//         (healthFilter === "Good" &&
//           field.health >= 70 &&
//           field.health < 85) ||
//         (healthFilter === "Attention" &&
//           field.health < 70);

//       return (
//         matchesSearch &&
//         matchesCrop &&
//         matchesFarm &&
//         matchesHealth
//       );
//     });
//   }, [
//     search,
//     cropFilter,
//     farmFilter,
//     healthFilter,
//   ]);

//   const handleCreateField = async (formData) => {
//     try {
//       const response = await createField(formData);

//       console.log("Field created:", response);

//       if (response?.field) {
//         dispatch(addFieldToStore(response.field));
//       }

//       setIsAddFieldOpen(false);

//       return response;
//     } catch (error) {
//       console.error("Create field failed:", error);

//       throw error;
//     }
//   };

//   useEffect(() => {
//     const loadFields = async () => {
//       try {
//         dispatch(setFieldLoading(true));
//         dispatch(setFieldError(null));

//         const response = await getMyFields();
        
//         dispatch(setFields(response?.fields || []));
//       } catch (error) {
//         console.error("Get Fields Error:", error);

//         dispatch(
//           setFieldError(
//             error?.response?.data?.message ||
//               "Failed to load fields"
//           )
//         );

//         dispatch(setFields([]));
//       } finally {
//         dispatch(setFieldLoading(false));
//       }
//     };

//     loadFields();
//   }, [dispatch]);

//   return (
//     <main
//       className="
//         min-h-screen
//         bg-[var(--color-bg)]
//         px-[28px]
//         pb-[40px]
//         pt-[20px]
//         text-[var(--color-text-primary)]
//         xl:px-[30px]
//       "
//     >
//       {/* HEADER */}

//       <FieldsHeader
//         totalFields={fields.length}
//         onSubmit={handleCreateField}
//       />

//       {/* QUICK STATS */}

//       <FieldsStats />

//       {/* FILTERS */}

//       <FieldsFilterBar
//         search={search}
//         setSearch={setSearch}
//         cropFilter={cropFilter}
//         setCropFilter={setCropFilter}
//         farmFilter={farmFilter}
//         setFarmFilter={setFarmFilter}
//         healthFilter={healthFilter}
//         setHealthFilter={setHealthFilter}
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//       />

//       {/* CONTENT */}

//       <section className="mt-[20px]">
//         <div className="mb-[12px] flex items-center justify-between">
//           <div>
//             <h2 className="text-[15px] font-bold">
//               Your Fields
//             </h2>

//             <p
//               className="
//                 mt-[2px]
//                 text-[10px]
//                 text-[var(--color-text-muted)]
//               "
//             >
//               {filteredFields.length} fields found
//             </p>
//           </div>

//           <button
//             className="
//               flex
//               items-center
//               gap-[5px]
//               text-[10px]
//               font-semibold
//               text-[var(--color-text-secondary)]
//               hover:text-[var(--color-primary)]
//             "
//           >
//             Recently Updated
//             <ChevronDown size={13} />
//           </button>
//         </div>

//         {/* {viewMode === "grid" ? (
//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-[18px]
//               md:grid-cols-2
//               xl:grid-cols-3
//             "
//           >
//             {filteredFields.map((field) => (
//               <FieldCard
//                 key={field.id}
//                 field={field}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-[10px]">
//             {filteredFields.map((field) => (
//               <FieldListItem
//                 key={field.id}
//                 field={field}
//               />
//             ))}
//           </div>
//         )} */}
//         {loading ? (
//           <div className="py-[50px] text-center">
//             <p className="text-[11px] text-[var(--color-text-muted)]">
//               Loading fields...
//             </p>
//           </div>
//         ) : error ? (
//           <div className="py-[50px] text-center">
//             <p className="text-[11px] text-red-500">
//               {error}
//             </p>
//           </div>
//         ) : filteredFields.length === 0 ? (
//           <div className="py-[50px] text-center">
//             <p className="text-[11px] text-[var(--color-text-muted)]">
//               No fields found
//             </p>
//           </div>
//         ) : viewMode === "grid" ? (
//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-[18px]
//               md:grid-cols-2
//               xl:grid-cols-3
//             "
//           >
//             {filteredFields.map((field) => (
//               <FieldCard
//                 key={field.id}
//                 field={field}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-[10px]">
//             {filteredFields.map((field) => (
//               <FieldListItem
//                 key={field.id}
//                 field={field}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FieldsHeader from "../components/fields/FieldsHeader";
import FieldsStats from "../components/fields/FieldsStats";
import FieldsFilterBar from "../components/fields/FieldsFilterBar";
import FieldCard from "../components/fields/FieldCard";
import FieldListItem from "../components/fields/FieldListItem";

import {
  getMyFields,
  createField,
} from "../services/field.service";

import {
  setFields,
  setFieldLoading,
  setFieldError,
  addFieldToStore,
} from "../store/slices/fieldSlice";

export default function FieldsPage() {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX FIELD STATE
  // =====================================================

  const {
    fields,
    loading,
    error,
  } = useSelector((state) => state.field);

  // =====================================================
  // FILTER STATE
  // =====================================================

  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("All Crops");
  const [farmFilter, setFarmFilter] = useState("All Farms");
  const [healthFilter, setHealthFilter] = useState("All Health");
  const [viewMode, setViewMode] = useState("grid");

  // =====================================================
  // GET MY FIELDS
  // =====================================================

  useEffect(() => {
    const loadFields = async () => {
      try {
        dispatch(setFieldLoading(true));
        dispatch(setFieldError(null));

        const response = await getMyFields();

        dispatch(
          setFields(response?.fields || [])
        );
      } catch (error) {
        console.error("Get Fields Error:", error);

        dispatch(
          setFieldError(
            error?.response?.data?.message ||
              "Failed to load fields"
          )
        );

        dispatch(setFields([]));
      } finally {
        dispatch(setFieldLoading(false));
      }
    };

    loadFields();
  }, [dispatch]);

  // =====================================================
  // CREATE FIELD
  // =====================================================

  const handleCreateField = async (formData) => {
    try {
      const response = await createField(formData);

      console.log("Field created:", response);

      if (response?.field) {
        dispatch(
          addFieldToStore(response.field)
        );
      }

      return response;
    } catch (error) {
      console.error(
        "Create field failed:",
        error
      );

      throw error;
    }
  };

  // =====================================================
  // FILTER FIELDS
  // =====================================================

  const filteredFields = useMemo(() => {
    return fields.filter((field) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const fieldName =
        field.name?.toLowerCase() || "";

      const farmName =
        field.farm?.name?.toLowerCase() || "";

      const cropName =
        field.crop?.toLowerCase() || "";

      // SEARCH
      const matchesSearch =
        fieldName.includes(searchValue) ||
        farmName.includes(searchValue) ||
        cropName.includes(searchValue);

      // CROP FILTER
      const matchesCrop =
        cropFilter === "All Crops" ||
        field.crop === cropFilter;

      // FARM FILTER
      const matchesFarm =
        farmFilter === "All Farms" ||
        field.farm?.name === farmFilter;

      // HEALTH
      // Health data abhi backend me nahi hai.
      // Isliye currently only All Health works.
      const matchesHealth =
        healthFilter === "All Health";

      return (
        matchesSearch &&
        matchesCrop &&
        matchesFarm &&
        matchesHealth
      );
    });
  }, [
    fields,
    search,
    cropFilter,
    farmFilter,
    healthFilter,
  ]);

  // =====================================================
  // UI
  // =====================================================

  return (
    <main
      className="
        min-h-screen
        bg-[var(--color-bg)]
        px-[28px]
        pb-[40px]
        pt-[20px]
        text-[var(--color-text-primary)]
        xl:px-[30px]
      "
    >

      {/* HEADER */}

      <FieldsHeader
        totalFields={fields.length}
        onSubmit={handleCreateField}
      />

      {/* QUICK STATS */}

      <FieldsStats />

      {/* FILTERS */}

      <FieldsFilterBar
        search={search}
        setSearch={setSearch}

        cropFilter={cropFilter}
        setCropFilter={setCropFilter}

        farmFilter={farmFilter}
        setFarmFilter={setFarmFilter}

        healthFilter={healthFilter}
        setHealthFilter={setHealthFilter}

        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* CONTENT */}

      <section className="mt-[20px]">

        {/* SECTION HEADER */}

        <div className="mb-[12px] flex items-center justify-between">

          <div>
            <h2 className="text-[15px] font-bold">
              Your Fields
            </h2>

            <p
              className="
                mt-[2px]
                text-[10px]
                text-[var(--color-text-muted)]
              "
            >
              {filteredFields.length} fields found
            </p>
          </div>

          <button
            className="
              flex
              items-center
              gap-[5px]
              text-[10px]
              font-semibold
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-primary)]
            "
          >
            Recently Updated

            <ChevronDown size={13} />
          </button>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="py-[50px] text-center">
            <p
              className="
                text-[11px]
                text-[var(--color-text-muted)]
              "
            >
              Loading fields...
            </p>
          </div>

        ) : error ? (

          /* ERROR */

          <div className="py-[50px] text-center">
            <p className="text-[11px] text-red-500">
              {error}
            </p>
          </div>

        ) : filteredFields.length === 0 ? (

          /* EMPTY */

          <div className="py-[50px] text-center">
            <p
              className="
                text-[11px]
                text-[var(--color-text-muted)]
              "
            >
              No fields found
            </p>
          </div>

        ) : viewMode === "grid" ? (

          /* GRID */

          <div
            className="
              grid
              grid-cols-1
              gap-[18px]
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {filteredFields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
              />
            ))}
          </div>

        ) : (

          /* LIST */

          <div className="space-y-[10px]">

            {filteredFields.map((field) => (
              <FieldListItem
                key={field.id}
                field={field}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}