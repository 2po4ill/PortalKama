import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {TAuthorizedUserData, User, userActions, UserSchema} from "entities/User";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";

export interface ILoginData {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, ILoginData, { rejectValue: string }>(
    'login/loginByUsername',
    async (loginData, {rejectWithValue, extra, dispatch}) => {
        try {
            // @ts-ignore
            const response = await extra.api.post<User>('/login', loginData);
            if (!response.data) {
                throw new Error("Response data is empty");
            }

            const userData: TAuthorizedUserData = {
                username: loginData.username,
                img: response.data.img,
                uid: response.data.uid
            };

            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
            dispatch(userActions.setAuthData(userData));

            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.status);
            }
            console.log(err);
            return rejectWithValue("Неверный логин или пароль")
        }

    },
)