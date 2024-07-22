import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IPostData, IPostInfo, Post, PostSchema, Tag} from "../types/post";
import {IThunkConfig} from "app/providers/StoreProvider";
import {User} from "entities/User";

const initialState: PostSchema = {
    posts: [],
    post: undefined,
    tags: [],
    isLoading: false,
    isPostLoading: false,
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
            ),
            getPost: createAThunk<number, Post>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const postInfo = await extra.api.get<IPostInfo>("/article?post_id=" + data);
                        return postInfo.data.article;
                    } catch (err) {
                        console.log("Something went wrong" + err);
                        return rejectWithValue(String(err));
                    } },
                {
                    pending: state => {
                        return {
                            ...state,
                            isPostLoading: true,
                            error: undefined
                        }
                    },
                    fulfilled: (state, action) => {
                        const post = action.payload
                        return {
                            ...state,
                            isPostLoading: false,
                            error: undefined,
                            post: post
                        }
                    },
                    rejected: (state, action) => {
                        return {
                            ...state,
                            isPostLoading: false,
                            error: String(action.error)
                        }
                    }
                }
            ),
            getTags: createAThunk<undefined, Tag[] | []>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const tag_list = await extra.api.get<Tag[] | []>("/tags");
                        return tag_list.data;
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
                        const tags = action.payload
                        return {
                            ...state,
                            isLoading: false,
                            error: undefined,
                            tags: tags
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
