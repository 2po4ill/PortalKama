import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IPostData, IPostInfo, IPostTags, Post, PostDesc, PostSchema, Tag} from "../types/post";
import {IThunkConfig} from "app/providers/StoreProvider";
import {Comment} from "entities/Post/model/types/post";


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
            getPostsList: createAThunk<{tags: Tag[], start: number, finish: number} | undefined, IPostData>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const postList = await extra.api.get<IPostData>("/articles?tags=" + data?.tags + "&start=" + data?.start + "&finish=" + data?.finish);
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
            getPost: createAThunk<number, PostDesc>(async (data, thunkAPI) => {
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
            getTags: createAThunk<undefined, IPostTags>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const tag_list = await extra.api.get<IPostTags>("/tags");
                        console.log(tag_list.data);
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
                        return {
                            ...state,
                            isLoading: false,
                            error: undefined,
                            tags: action.payload.tags
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
            addComment: createAThunk<{ post_id: number | undefined, body: string }, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/comment", {"post_id": data.post_id, "body": data.body});
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    state.error = undefined;
                },
                fulfilled: (state, action) => {
                    state.error = undefined;
                },
                rejected: (state, action) => {
                    state.error = String(action.payload);
                }
            }),
        }
    }
});


export const { actions: postActions, reducer: postReducer } = postSlice
