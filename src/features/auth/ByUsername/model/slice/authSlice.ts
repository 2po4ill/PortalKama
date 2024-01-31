import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authSchema";
import {loginByUsername} from "features/auth/ByUsername/model/services/authServices";

const initialState: AuthSchema = {
    username: "",
    password: "",
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    // Пример взят отсюда: https://redux-toolkit.js.org/api/createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.username = "";
                state.password = "";
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.password = "";
            })
    },
})

export const { actions: authActions  } = authSlice;
export const { reducer: authReducer } = authSlice