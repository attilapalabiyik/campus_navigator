import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import buildingReducer from "./buildingsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    buildings: buildingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
