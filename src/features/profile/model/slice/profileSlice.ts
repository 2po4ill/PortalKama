import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IProfileData, Profile, ProfileSchema} from "../types/profile";
import {IThunkConfig} from "app/providers/StoreProvider";

const initialProfile: Profile = {
    full_name: "",
    photo_path: "",
    position: ""
}
export const initialState: ProfileSchema = {
    profile: initialProfile,
    error: undefined,
    isLoading: true
}

const profileSlice = createAppSlice({
    name: "profile",
    initialState,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            getProfileData: createAThunk<undefined, Profile>( async (arg, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI

                try {
                    const profileData = await extra.api.get<IProfileData>('/profile');
                    return profileData.data.profile;
                } catch (err) {
                    return rejectWithValue(String(err));
                }
            }, {
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    };
                },
                fulfilled: (state, action) => {
                    return {
                        ...state,
                        profile: action.payload,
                        isLoading: false,
                        error: undefined
                    };
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        isLoading: false,
                        error: String(action.error)
                    };
                }
            })
        }
    }
});

export const { reducer: profileReducer, actions: profileActions } = profileSlice;