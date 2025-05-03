import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const selectedDevicesSlicer = createSlice({
  name: "selectedDevices",
  initialState,
  reducers: {
    addSelectedDevices: (state, action) => {
      return action.payload;
    },
    removeSelectedDevices: (state) => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSelectedDevices, removeSelectedDevices } = selectedDevicesSlicer.actions;

export default selectedDevicesSlicer.reducer;
