import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { search: "" },
  reducers: {
    searchQueryChange(state, action) {
      state.search = action.payload;
    },
  },
});

export const { searchQueryChange } = searchSlice.actions;

export const selectSearchQuery = (state) => state.search.search;

export default searchSlice.reducer;
