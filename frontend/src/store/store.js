import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import farmReducer from "./slices/farmSlice"
import fieldReducer from "./slices/fieldSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    farm: farmReducer,
    field: fieldReducer
  },
});