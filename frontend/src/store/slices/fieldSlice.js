import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [],
  selectedField: null,
  loading: false,
  error: null,
};

// =====================================================
// GET FIELD ID
// =====================================================

const getFieldId = (field) => {
  return field?.id || field?._id;
};

const fieldSlice = createSlice({
  name: "field",

  initialState,

  reducers: {
    /* =====================================================
       SET ALL FIELDS
    ===================================================== */

    setFields: (state, action) => {
      state.fields = action.payload;
    },

    /* =====================================================
       SELECT FIELD
    ===================================================== */

    setSelectedField: (state, action) => {
      state.selectedField = action.payload;
    },

    /* =====================================================
       LOADING
    ===================================================== */

    setFieldLoading: (state, action) => {
      state.loading = action.payload;
    },

    /* =====================================================
       ERROR
    ===================================================== */

    setFieldError: (state, action) => {
      state.error = action.payload;
    },

    /* =====================================================
       ADD FIELD
    ===================================================== */

    addFieldToStore: (state, action) => {
      state.fields.unshift(action.payload);
    },

    /* =====================================================
       UPDATE FIELD
    ===================================================== */

    updateFieldInStore: (state, action) => {
      const updatedField = action.payload;
      const updatedFieldId = getFieldId(updatedField);

      const index = state.fields.findIndex(
        (field) => getFieldId(field) === updatedFieldId
      );

      if (index !== -1) {
        state.fields[index] = updatedField;
      }

      if (
        state.selectedField &&
        getFieldId(state.selectedField) === updatedFieldId
      ) {
        state.selectedField = updatedField;
      }
    },

    /* =====================================================
       REMOVE FIELD
    ===================================================== */

    removeFieldFromStore: (state, action) => {
      const fieldId = action.payload;

      state.fields = state.fields.filter(
        (field) => getFieldId(field) !== fieldId
      );

      if (
        state.selectedField &&
        getFieldId(state.selectedField) === fieldId
      ) {
        state.selectedField = null;
      }
    },

    /* =====================================================
       CLEAR FIELD STATE
    ===================================================== */

    clearFieldState: (state) => {
      state.fields = [];
      state.selectedField = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setFields,
  setSelectedField,
  setFieldLoading,
  setFieldError,
  addFieldToStore,
  updateFieldInStore,
  removeFieldFromStore,
  clearFieldState,
} = fieldSlice.actions;

export default fieldSlice.reducer;