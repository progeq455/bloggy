import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchData } from "./searchActions";
import {
  ISearchResultUser,
  ISearchResultBlog,
  ISearchResultArticle,
} from "../../types/Search";

interface SearchState {
  results:
    | ISearchResultUser[]
    | ISearchResultBlog[]
    | ISearchResultArticle[]
    | [];
  isLoading: boolean;
  error: string;
}

const initialState: SearchState = {
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
      action: PayloadAction<
        ISearchResultUser[] | ISearchResultBlog[] | ISearchResultArticle[] | []
      >
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
