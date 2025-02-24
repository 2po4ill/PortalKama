import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User, userActions} from "entities/User";
import {LOCAL_STORAGE_LAST_AUTHORIZATION, LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";
import {IThunkConfig} from "app/providers/StoreProvider";

export interface ILoginData {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, ILoginData, IThunkConfig<string>>(
    'login/loginByUsername',
    async (loginData, thunkAPI) => {
        const {rejectWithValue, extra, dispatch} = thunkAPI;
        try {
            const response = await extra.api.post<User>('/login', loginData);
            if (!response.data) {
                throw new Error("Response data is empty");
            }
            const userData: User = {
                username: loginData.username,
                image_path: response.data.image_path,
                uid: response.data.uid
            };

            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
            dispatch(userActions.setAuthData(userData));

            localStorage.setItem(LOCAL_STORAGE_LAST_AUTHORIZATION, JSON.stringify(Date.now()));
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                __IS_DEV__ && console.log(err.status);
            }
            __IS_DEV__ && console.log(err);
            return rejectWithValue("Неверный логин или пароль")
        }

    },
)