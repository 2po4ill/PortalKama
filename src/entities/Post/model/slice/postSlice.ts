import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {Post, PostSchema} from "../types/post";
import {IThunkConfig} from "app/providers/StoreProvider";

const initialState: PostSchema = {
    posts: [],
    isLoading: false,
    error: undefined
}

const postSlice = createAppSlice({
    name: "post",
    initialState,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            getPostsList: createAThunk<undefined, Post[]>(
                async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const getUserApi = () => new Promise<Post[]>(async (resolve) => {
                            const data: Post[] = await extra.api.get('/posts')
                            setTimeout(() => {
                                resolve(data);
                            }, 2500);
                        });
                        const postsList = await getUserApi();
                        if (postsList) return postsList;
                        return rejectWithValue("Постов нет");
                    } catch (err) {
                        console.log("Something went wrong" + err);
                        return rejectWithValue("Something went wrong");
                    }
                },
                {
                    pending: state => {
                        return {
                            ...state,
                            isLoading: true
                        }
                    },
                    fulfilled: (state, action) => {
                        return {
                            ...state,
                            isLoading: false,
                            error: undefined,
                            posts: action.payload
                        }
                    },
                    rejected: (state, action) => {
                        return {
                            ...state,
                            isLoading: false,
                            error: String(action.error)
                        }
                    }
                }
            )

        }
    }
});

export const { actions } = postSlice