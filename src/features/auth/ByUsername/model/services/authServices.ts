import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User, userActions} from "entities/User";
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
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data))
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue("Неверный логин или пароль")
        }

    },
)