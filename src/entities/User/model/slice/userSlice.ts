import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserSchema} from "../types/user";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";

const initialState: UserSchema = {
    isAdmin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const authData = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
            if (authData) {
                state.authData = JSON.parse(authData);
            }
        },
    },
})

export const { actions: userActions  } = userSlice;
export const { reducer: userReducer } = userSlice