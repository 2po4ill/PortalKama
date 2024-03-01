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
    async (loginData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', loginData);
            if (!response.data) {
                throw new Error("Response data is empty");
            }

            const userData: TAuthorizedUserData = {
                username: loginData.username,
                img: response.data.img,
                uid: response.data.uid
            };

            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
            thunkAPI.dispatch(userActions.setAuthData(userData));

            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.status);
            }
            console.log(err);
            return thunkAPI.rejectWithValue("Неверный логин или пароль")
        }

    },
)