import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserSchema} from "../types/user";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";
import {loginByUsername} from "features/auth/ByUsername/model/services/authServices";
import {initAuthData} from "../services/userServices";

const initialState: UserSchema = {
    isAdmin: false,
    isLoading: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, null);
            state.authData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initAuthData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(initAuthData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(initAuthData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = String(action.payload);
            })
    },
})

export const { actions: userActions  } = userSlice;
export const { reducer: userReducer } = userSlice