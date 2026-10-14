import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import FarmsHeader from "../components/farms/FarmsHeader";
import FarmFilters from "../components/farms/FarmFilters";
import FarmCard from "../components/farms/FarmCard";
import FarmLocationMap from "../components/farms/FarmLocationMap";

import { X } from "lucide-react";

import { getMyFarms, updateFarm, deleteFarm } from "../services/farm.service";

import {
  setFarms,
  setFarmLoading,
  setFarmError,
  setSelectedFarm,
  updateFarmInStore,
  removeFarmFromStore,
} from "../store/slices/farmSlice";
import EditFarmModal from "../components/farms/EditFarmModal";

function Farms() {
  const dispatch = useDispatch();

  const { farms, loading, error } = useSelector((state) => state.farm);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [selectedFarmForEdit, setSelectedFarmForEdit] = useState(null);
  const handleEditFarm = (farm) => {
    setSelectedFarmForEdit(farm);
    dispatch(setSelectedFarm(farm));
    setEditModalOpen(true);
  };

  const handleUpdateFarm = async (farmId, farmData) => {
    try {
      dispatch(setFarmLoading(true));
      dispatch(setFarmError(null));

      const response = await updateFarm(farmId, farmData);

      if (response?.success) {
        const updatedFarm = response.farm;

        dispatch(updateFarmInStore(updatedFarm));

        setEditModalOpen(false);
        setSelectedFarmForEdit(null);
      } else {
        dispatch(setFarmError(response?.message || "Failed to update farm"));
      }
    } catch (error) {
      console.error("UPDATE FARM ERROR:", error.response?.data || error);

      dispatch(
        setFarmError(error.response?.data?.message || "Failed to update farm"),
      );
    } finally {
      dispatch(setFarmLoading(false));
    }
  };

  const handleDelete = async (farm) => {
    const farmId = farm.id || farm._id;
    console.log(farm)

    if (!farmId) {
      console.error("Farm ID not found");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${farm.name}"?`,
    );

    if (!confirmed) return;

    try {
      dispatch(setFarmError(null));

      const response = await deleteFarm(farmId);

      if (response?.success) {
        // Remove immediately from Redux store
        dispatch(removeFarmFromStore(farmId));
      } else {
        dispatch(setFarmError(response?.message || "Failed to delete farm"));
      }
    } catch (error) {
      console.error("DELETE FARM ERROR:", error.response?.data || error);

      dispatch(
        setFarmError(error.response?.data?.message || "Failed to delete farm"),
      );
    }
  };
  /* =========================================================
     MAP FULLSCREEN STATE
  ========================================================= */

  const [mapExpanded, setMapExpanded] = useState(false);

  /* =========================================================
     GET FARMS
  ========================================================= */

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        dispatch(setFarmLoading(true));
        dispatch(setFarmError(null));

        const response = await getMyFarms();

        if (response?.success) {
          dispatch(setFarms(response.farms || []));
        } else {
          dispatch(setFarmError(response?.message || "Failed to fetch farms"));
        }
      } catch (error) {
        console.error("GET FARMS ERROR:", error.response?.data || error);

        dispatch(
          setFarmError(
            error.response?.data?.message || "Failed to fetch farms",
          ),
        );
      } finally {
        dispatch(setFarmLoading(false));
      }
    };

    fetchFarms();
  }, [dispatch]);

  /* =========================================================
     LOCK BODY SCROLL WHEN MAP IS EXPANDED
  ========================================================= */

  useEffect(() => {
    if (mapExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mapExpanded]);

  /* =========================================================
     ESC KEY TO CLOSE FULLSCREEN MAP
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && mapExpanded) {
        setMapExpanded(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mapExpanded]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          NORMAL PAGE
      ===================================================== */}

      <div className="space-y-5 pb-6">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <FarmsHeader />

        {/* =================================================
            FILTERS
        ================================================= */}

        <FarmFilters />

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/5
              px-4
              py-3
              text-[11px]
              font-semibold
              text-red-500
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            FARM CONTENT
        ================================================= */}

        <section
          className="
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-[minmax(0,1fr)_355px]
          "
        >
          {/* =================================================
              FARM CARDS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              2xl:grid-cols-4
            "
          >
            {/* LOADING */}

            {loading ? (
              <>
                {[1, 2, 3, 4].map((item) => (
                  <FarmSkeleton key={item} />
                ))}
              </>
            ) : farms.length > 0 ? (
              /* FARMS */

              farms.map((farm) => (
                <FarmCard
                  key={farm.id || farm._id}
                  farm={farm}
                  onEdit={handleEditFarm}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              /* EMPTY */

              <EmptyFarmState />
            )}
          </div>

          {/* =================================================
              LOCATION MAP
          ================================================= */}

          <FarmLocationMap
            farms={farms}
            onExpand={() => setMapExpanded(true)}
          />

          <EditFarmModal
            isOpen={editModalOpen}
            farm={selectedFarmForEdit}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedFarmForEdit(null);
            }}
            onUpdate={handleUpdateFarm}
            onDelete={handleDelete}
          />
        </section>
      </div>

      {/* =====================================================
          FULLSCREEN MAP
      ===================================================== */}

      {mapExpanded && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/50
            p-3
            backdrop-blur-sm
            sm:p-5
          "
        >
          {/* =================================================
              FULLSCREEN MAP CONTAINER
          ================================================= */}

          <div
            className="
              relative
              h-full
              w-full
            "
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => setMapExpanded(false)}
              className="
                absolute
                right-4
                top-4
                z-[2000]
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]/95
                text-[var(--color-text-primary)]
                shadow-xl
                backdrop-blur-xl
                transition
                hover:bg-[var(--color-surface-secondary)]
                hover:text-[var(--color-primary)]
                active:scale-95
              "
              aria-label="Close map"
              title="Close map"
            >
              <X size={18} />
            </button>

            {/* =================================================
                EXPANDED MAP
            ================================================= */}

            <FarmLocationMap
              farms={farms}
              expanded={true}
              onExpand={() => setMapExpanded(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function FarmSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[16px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
      "
    >
      <div
        className="
          h-[145px]
          animate-pulse
          bg-[var(--color-surface-secondary)]
        "
      />

      <div className="space-y-4 p-3">
        <div
          className="
            h-4
            w-2/3
            animate-pulse
            rounded
            bg-[var(--color-surface-secondary)]
          "
        />

        <div
          className="
            h-3
            w-1/2
            animate-pulse
            rounded
            bg-[var(--color-surface-secondary)]
          "
        />

        <div className="grid grid-cols-3 gap-2">
          <div
            className="
              h-10
              animate-pulse
              rounded
              bg-[var(--color-surface-secondary)]
            "
          />

          <div
            className="
              h-10
              animate-pulse
              rounded
              bg-[var(--color-surface-secondary)]
            "
          />

          <div
            className="
              h-10
              animate-pulse
              rounded
              bg-[var(--color-surface-secondary)]
            "
          />
        </div>

        <div
          className="
            h-8
            animate-pulse
            rounded-lg
            bg-[var(--color-surface-secondary)]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyFarmState() {
  return (
    <div
      className="
        col-span-full
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        rounded-[16px]
        border
        border-dashed
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[var(--color-primary)]/10
          text-[var(--color-primary)]
        "
      >
        🌱
      </div>

      <h3
        className="
          mt-4
          text-[14px]
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        No farms yet
      </h3>

      <p
        className="
          mt-1.5
          max-w-[320px]
          text-[10px]
          font-medium
          text-[var(--color-text-secondary)]
        "
      >
        Create your first farm to start managing your agricultural digital twin.
      </p>
    </div>
  );
}

export default Farms;
