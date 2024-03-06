import { PayloadAction} from "@reduxjs/toolkit";
import {TAuthorizedUserData, UserSchema} from "../types/user";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";
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
            logout: create.reducer( () => {
                localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
                return null;
            } ),
            setAuthData: create.reducer( (state, action: PayloadAction<TAuthorizedUserData>) => {
                return {
                    ...state,
                    ...action.payload,
                    isAuthorized: true
                }
            } ),
            initUser: createAThunk<null, TAuthorizedUserData>(
                async (data, thunkAPI) => {
                    const { rejectWithValue } = thunkAPI;
                    try {
                        const getUserApi = () => new Promise<TAuthorizedUserData>((resolve) => {
                            const data: TAuthorizedUserData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
                            setTimeout(() => {
                                resolve(data);
                            }, 2500);
                        });
                        const authorizedUser = await getUserApi();
                        if (authorizedUser) return authorizedUser;
                        return rejectWithValue("Нет данных пользователя");
                    } catch (err) {
                        console.log("Something went wrong" + err);
                        return rejectWithValue("Something went wrong");
                    }
                },
                {
                    pending: (state) => {
                        state.isLoading = true;
                        state.error = undefined;
                    },
                    fulfilled: (state, action) => {
                        console.log(action.payload)
                        return {
                            ...action.payload,
                            isLoading: false,
                            isAuthorized: true,
                            error: undefined
                        }
                    },
                    rejected: (state, action) => {
                        state.isLoading = false;
                        state.error = String(action.payload);
                    }
                }
            )
        };

    },
});

export const { actions: userActions  } = userSlice;
export const { reducer: userReducer } = userSlice