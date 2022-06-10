import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchData } from "./searchActions";
import { ISearchResultUser } from "../../types/Search";

export interface ISearchState {
  results: ISearchResultUser[] | [];
  isLoading: boolean;
  error: string;
}

const initialState: ISearchState = {
  results: [],
  isLoading: false,
  error: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: {
    [searchData.fulfilled.type]: (
      state,
      action: PayloadAction<ISearchResultUser[] | []>
    ) => {
      state.results = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [searchData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [searchData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearResults } = searchSlice.actions;

export default searchSlice.reducer;
