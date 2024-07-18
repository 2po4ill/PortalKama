import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IPostData, Post, PostSchema} from "../types/post";
import {IThunkConfig} from "app/providers/StoreProvider";
import {IReservationData} from "entities/Reservation/model/types/reservation";
import {act} from "react-dom/test-utils";

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
            getPostsList: createAThunk<undefined, IPostData>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const postList = await extra.api.get<IPostData>("/articles");
                        return postList.data;
                    } catch (err) {
                        console.log("Something went wrong" + err);
                        return rejectWithValue(String(err));
                    } },
                {
                    pending: state => {
                        return {
                            ...state,
                            isLoading: true,
                            error: undefined
                        }
                    },
                    fulfilled: (state, action) => {
                        const posts = action.payload.articles
                        return {
                            ...state,
                            isLoading: false,
                            error: undefined,
                            posts: posts
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

export const { actions: postActions, reducer: postReducer } = postSlice