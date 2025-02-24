import {PayloadAction} from "@reduxjs/toolkit";
import {IUserDataResponse, User} from "../types/user";
import {LOCAL_STORAGE_LAST_AUTHORIZATION, LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";
import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IThunkConfig} from "app/providers/StoreProvider";
import {initialUser} from "../const/initialUser";
import axios from "axios";

export const userSlice = createAppSlice({
    name: 'user',
    initialState: initialUser,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            logout: create.reducer( (state) => {
                localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
                localStorage.removeItem(LOCAL_STORAGE_LAST_AUTHORIZATION);
                return {
                    ...state,
                    uid: -1,
                    img: "",
                    username: "",
                    isAuthorized: false,
                };
            } ),
            setAuthData: create.reducer( (state, action: PayloadAction<User>) => {
                return {
                    ...state,
                    ...action.payload,
                    isAuthorized: true
                }
            } ),
            /**
             * Асинхронное действие по инициализации пользователя
             */
            initUser: createAThunk<undefined, User>(
                async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {

                        const lastAuth: number = await JSON.parse(String(localStorage.getItem(LOCAL_STORAGE_LAST_AUTHORIZATION)));
                        // 3 month  - 15552000000
                        // 60 sec   - 60000
                        const maxAge = __IS_DEV__ ? 600000 : 15552000000;
                        if (!lastAuth || lastAuth && Date.now() - lastAuth >= maxAge) {
                            __IS_DEV__ && console.log("нет нужной строки в localstorage");
                            return rejectWithValue("Требуется авторизация");
                        }

                        const getUserApi = () => new Promise<User>(async (resolve, reject) => {
                            try {
                                const {data} = await extra.api.get<IUserDataResponse>('/me');
                                __IS_DEV__ && console.log(data);
                                const user: User = {
                                    uid: data.user.user_id,
                                    username: data.user.username,
                                    role: data.user.role,
                                    image_path: data.user.image_path
                                }
                                if (__IS_DEV__) setTimeout(() => {
                                    resolve(user);
                                }, 2500);
                                else resolve(user);
                            } catch (e) {
                                reject(e);
                            }
                        });

                        const authorizedUser = await getUserApi();
                        if (authorizedUser) {
                            /**
                             * данные в localstorage,
                             * {
                             *     uid: number
                             *     username: string
                             * }
                             */
                            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authorizedUser));
                            return authorizedUser;
                        }
                        return rejectWithValue("Нет данных пользователя");
                    } catch (err) {
                        if (axios.isAxiosError(err)) {
                            console.log(err.status);
                        }
                        __IS_DEV__ && console.log("Something went wrong:" + err);
                        return rejectWithValue("Something went wrong");
                    }
                },
                {
                    pending: (state, action) => {
                        // getting data from localstorage
                        const localStorageData: User = JSON.parse(String(localStorage.getItem(LOCAL_STORAGE_USER_KEY)));
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
                        console.log(action.payload)
                        return {
                            ...action.payload,
                            image_path: action.payload.image_path,
                            isLoading: false,
                            isAuthorized: true,
                            error: undefined
                        }
                    },
                    rejected: (state, action) => {
                        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
                        localStorage.removeItem(LOCAL_STORAGE_LAST_AUTHORIZATION);
                        return {
                            ...initialUser,
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