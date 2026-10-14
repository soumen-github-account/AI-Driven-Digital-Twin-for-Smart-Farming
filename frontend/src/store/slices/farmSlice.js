
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  farms: [],
  selectedFarm: null,
  loading: false,
  error: null,
};

const getFarmId = (farm) => {
  return farm?.id || farm?._id;
};

const farmSlice = createSlice({
  name: "farm",

  initialState,

  reducers: {
    /* =====================================================
       SET ALL FARMS
    ===================================================== */

    setFarms: (state, action) => {
      state.farms = action.payload;
    },

    /* =====================================================
       SELECT FARM
    ===================================================== */

    setSelectedFarm: (state, action) => {
      state.selectedFarm = action.payload;
    },

    /* =====================================================
       LOADING
    ===================================================== */

    setFarmLoading: (state, action) => {
      state.loading = action.payload;
    },

    /* =====================================================
       ERROR
    ===================================================== */

    setFarmError: (state, action) => {
      state.error = action.payload;
    },

    /* =====================================================
       ADD FARM
    ===================================================== */

    addFarmToStore: (state, action) => {
      state.farms.unshift(action.payload);
    },

    /* =====================================================
       UPDATE FARM
    ===================================================== */

    updateFarmInStore: (state, action) => {
      const updatedFarm = action.payload;

      const updatedFarmId = getFarmId(updatedFarm);

      const index = state.farms.findIndex(
        (farm) => getFarmId(farm) === updatedFarmId
      );

      if (index !== -1) {
        state.farms[index] = updatedFarm;
      }

      if (
        state.selectedFarm &&
        getFarmId(state.selectedFarm) === updatedFarmId
      ) {
        state.selectedFarm = updatedFarm;
      }
    },

    /* =====================================================
       REMOVE FARM
    ===================================================== */

    removeFarmFromStore: (state, action) => {
      const farmId = action.payload;

      state.farms = state.farms.filter(
        (farm) => getFarmId(farm) !== farmId
      );

      if (
        state.selectedFarm &&
        getFarmId(state.selectedFarm) === farmId
      ) {
        state.selectedFarm = null;
      }
    },

    /* =====================================================
       CLEAR
    ===================================================== */

    clearFarmState: (state) => {
      state.farms = [];
      state.selectedFarm = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setFarms,
  setSelectedFarm,
  setFarmLoading,
  setFarmError,
  addFarmToStore,
  updateFarmInStore,
  removeFarmFromStore,
  clearFarmState,
} = farmSlice.actions;

export default farmSlice.reducer;