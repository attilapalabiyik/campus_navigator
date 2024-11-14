import { createSlice } from "@reduxjs/toolkit";
import { Building } from "../../../models/Building";

export const buildingSlice = createSlice({
  name: "buildings",
  initialState: null as Building[] | null,
  reducers: {
    setBuildings: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setBuildings } = buildingSlice.actions;
export default buildingSlice.reducer;
