import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFiltersToSearch, ISearchResultUser, ISearchResultBlog, ISearchResultArticle } from "../../types/Search";
import { API_URL } from "../../../config";

export const searchData = createAsyncThunk(
    'search',
    async (filters: IFiltersToSearch, thunkAPI) => {
        try {
            const response = await axios.get<ISearchResultUser[] | ISearchResultBlog[] | ISearchResultArticle[]>(`${API_URL}/search/${filters.filter}?query=${filters.query}`, {
                headers: {
                    jwt_token: localStorage.token
                }
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);