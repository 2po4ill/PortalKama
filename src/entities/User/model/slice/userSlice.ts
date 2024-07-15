import {PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import {TAuthorizedUserData, UserSchema} from "../types/user";
import {LOCAL_STORAGE_LAST_AUTHORIZATION, LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";
import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IThunkConfig} from "app/providers/StoreProvider";

const initialState: UserSchema = {
    uid: "",
    username: "",
    img: "",
    isLoading: true,
    isAuthorized: false
}

export const userSlice = createAppSlice({
    name: 'user',
    initialState,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            logout: create.reducer( (state) => {
                localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
                return {
                    ...state,
                    uid: "",
                    img: "",
                    username: "",
                    isAuthorized: false,
                };
            } ),
            setAuthData: create.reducer( (state, action: PayloadAction<TAuthorizedUserData>) => {
                return {
                    ...state,
                    ...action.payload,
                    isAuthorized: true
                }
            } ),
            /**
             * Асинхронное действие по инициализации пользователя
             */
            initUser: createAThunk<undefined, TAuthorizedUserData>(
                async (data, thunkAPI) => {
                    const { rejectWithValue, extra, dispatch } = thunkAPI;
                    try {

                        const lastAuth: number = await JSON.parse(String(localStorage.getItem(LOCAL_STORAGE_LAST_AUTHORIZATION)));
                        // 6 month  - 15552000000
                        // 60 sec   - 60000
                        const maxAge = __IS_DEV__ ? 600000 : 15552000000;
                        if (!lastAuth || lastAuth && Date.now() - lastAuth >= maxAge) {
                            __IS_DEV__ && console.log("нет нужной строки в localstorage");
                            localStorage.clear();
                            return rejectWithValue("Требуется авторизация");
                        }

                        const getUserApi = () => new Promise<TAuthorizedUserData>(async (resolve, reject) => {
                            // const data: TAuthorizedUserData = JSON.parse(String(localStorage.getItem(LOCAL_STORAGE_USER_KEY)));
                            try {
                                const {data} = await extra.api.get<TAuthorizedUserData>('/profile');
                                __IS_DEV__ && console.log(data);
                                if (__IS_DEV__) setTimeout(() => {
                                    resolve(data);
                                }, 2500);
                                else resolve(data);
                            } catch (e) {
                                reject(e);
                            }
                        });

                        const authorizedUser = await getUserApi();
                        if (authorizedUser) {
                            return authorizedUser;
                        }
                        return rejectWithValue("Нет данных пользователя");
                    } catch (err) {
                        console.log("Something went wrong" + err);
                        return rejectWithValue("Something went wrong");
                    }
                },
                {
                    pending: (state, action) => {
                        // getting data from localstorage
                        const localStorageData: TAuthorizedUserData = JSON.parse(String(localStorage.getItem(LOCAL_STORAGE_USER_KEY)));
                        if (localStorageData) return {
                            ...state,
                            ...localStorageData,
                            isLoading: true,
                            error: undefined,
                        }
                        else return {
                            ...state,
                            isLoading: true,
                            error: undefined
                        }
                    },
                    fulfilled: (state, action) => {
                        // console.log(action.payload)
                        return {
                            ...action.payload,
                            isLoading: false,
                            isAuthorized: true,
                            error: undefined
                        }
                    },
                    rejected: (state, action) => {
                        return {
                            ...initialState,
                            error: String(action.payload),
                            isLoading: false
                        }
                    }
                }
            )
        };

    },
});

export const { actions: userActions  } = userSlice;
export const { reducer: userReducer } = userSlice