import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISearchResultUser } from "../../types/Search";
import { API_URL } from "../../../config";

export const searchData = createAsyncThunk(
  "search",
  async (query: string, thunkAPI) => {
    try {
      const response = await axios.get<ISearchResultUser[]>(
        `${API_URL}/search/users?query=${query}`,
        {
          headers: {
            jwt_token: localStorage.token,
          },
        }
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
