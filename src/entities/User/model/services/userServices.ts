import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "entities/User";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";


export const initAuthData = createAsyncThunk(
    'user/initData',
    async (a, thunkAPI) => {
        try {
            return await JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)) as User;
        } catch (err) {
            console.log("Something went wrong" + err);
            return thunkAPI.rejectWithValue("Something went wrong");
        }

    },
);

export const userAsyncActions = {
    initAuthData
}