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
    deleteHistoryItem: (state, action) => {
      state.countries = state.countries.filter(({ id }) => id !== action.payload);
    }
  },
});

// Action creators are generated for each case reducer function
export const { saveHistory, deleteHistoryItem } = weatherHistory.actions;

export default weatherHistory.reducer;
