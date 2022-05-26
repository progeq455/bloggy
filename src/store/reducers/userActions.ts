import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserToLogin, IUserToRegister, IUserVerify } from './../types/User';
import { API_URL } from "../../config";

export const authUser = createAsyncThunk(
    'user/auth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post<IUserVerify>(`${API_URL}/verify`, {}, {
                headers: {
                    jwt_token: localStorage.token
                }
            });
            localStorage.setItem("token", response.data.jwtToken);
            return response.data.userParsed;
        } catch (e: any) {
            localStorage.removeItem("token");
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (payload: IUserToLogin, thunkAPI) => {
        try {
            const response = await axios.post<IUserVerify>(`${API_URL}/login`, {
                email: payload.email,
                password: payload.password
            });
            localStorage.setItem("token", response.data.jwtToken);
            return response.data.userParsed;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async (payload: IUserToRegister, thunkAPI) => {
        try {
            const response = await axios.post<IUserVerify>(`${API_URL}/register`, {
                login: payload.login,
                email: payload.email,
                password: payload.password
            });
            localStorage.setItem("token", response.data.jwtToken);
            return response.data.userParsed;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
)