import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
};

export const weatherHistory = createSlice({
  name: "history",
  initialState,
  reducers: {
    saveHistory: (state, action) => {
      state.countries = [...state.countries, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveHistory } = weatherHistory.actions;

export default weatherHistory.reducer;
