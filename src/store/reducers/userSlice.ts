import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authUser, loginUser, registerUser } from "./userActions";
import { IUser } from "../types/User";

interface AuthState {
    user: IUser | {};
    auth: boolean;
    isLoading: boolean;
    errorRegister: string;
    errorLogin: string;
}

const initialState: AuthState = {
    user: {},
    auth: false,
    isLoading: false,
    errorRegister: "",
    errorLogin: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrorRegister: (state) => {
            state.errorRegister = "";
        },
        clearErrorLogin: (state) => {
            state.errorLogin = "";
        }
    },
    extraReducers: {
        [authUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.auth = true;
            state.isLoading = false;
            state.errorRegister = '';
            state.errorLogin = '';
        },
        [authUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorLogin = action.payload
        },
        [loginUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.auth = true;
            state.isLoading = false;
            state.errorLogin = '';
            state.errorRegister = '';
        },
        [loginUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorLogin = action.payload;
        },
        [registerUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.auth = true;
            state.isLoading = false;
            state.errorRegister = '';
            state.errorLogin = '';
        },
        [registerUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorRegister = action.payload;
        },
    }
})

export const { clearErrorRegister, clearErrorLogin } = userSlice.actions;

export default userSlice.reducer;