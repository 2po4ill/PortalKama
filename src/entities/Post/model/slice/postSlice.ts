import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {
    IPostComments,
    IPostData,
    IPostInfo,
    IPostTags,
    IWorkerData,
    Post,
    PostDesc,
    PostSchema,
    Tag
} from "../types/post";
import {IThunkConfig} from "app/providers/StoreProvider";
import {Comment} from "entities/Post/model/types/post";

const initialState: PostSchema = {
    posts: [],
    post: undefined,
    tags: [],
    comments: [],
    workers_info: [],
    total_views: 0,
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
            getPostsList: createAThunk<{tags: number[], start: number, finish: number, user_id: number} | undefined, IPostData>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const postList = await extra.api.get<IPostData>("/articles?" + (data?.tags  ? data?.tags.map(tag => "tag=" + tag.toString() + "&") : "") +
                            (data?.start || data?.finish ? "start=" + data?.start + "&finish=" + data?.finish + "&" : "") + (data?.user_id ? "user_id=" + data?.user_id : "user_id=0"));
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
                        const views = action.payload.total_views
                        return {
                            ...state,
                            isLoading: false,
                            error: undefined,
                            posts: posts,
                            total_views: views
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
            getPost: createAThunk<number | undefined, PostDesc>(async (data, thunkAPI) => {
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
            getTopWorkers: createAThunk<undefined, IWorkerData>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const worker_list = await extra.api.get<IWorkerData>("/top_workers");
                        console.log(worker_list.data);
                        return worker_list.data;
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
                            workers_info: action.payload.workers_info,
                            isLoading: false,
                            error: undefined,
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
            addLike: createAThunk<{ post_id: number }, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/like", {"post_id": data.post_id});
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
            addComment: createAThunk<{ post_id: number | undefined, text: string }, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/comment", {"post_id": data.post_id, "text": data.text});
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
            checkComments: createAThunk<undefined, IPostComments>(async (data, thunkAPI) => {
                    const { rejectWithValue, extra } = thunkAPI;
                    try {
                        const comment_list = await extra.api.get<IPostComments>("/check_comments");
                        console.log(comment_list.data);
                        return comment_list.data;
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
                        return {
                            ...state,
                            isPostLoading: false,
                            error: undefined,
                            comments: action.payload.comments
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
            createArticle: createAThunk<{ title: string, text: string, images: File | undefined, tags: number[]}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const formData = new FormData();
                    formData.append('post_data', '{"title":"' + data.title + '", "text":"' + data.text + '", "tags":[' + data.tags.toString() + ']}');

                    console.log(data.tags.toString());
                    console.log(formData.get('post_data'))
                    return await extra.api.post("/create_article", {
                        'post_data': '{"title":"' + data.title + '", "text":"' + data.text + '", "tags":[' + data.tags.toString() + ']}',
                        'image': data.images
                    }, {headers:
                            {'Content-Type': 'multipart/form-data'}
                    });
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
            approveComment: createAThunk<{comment_id: number}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/approve_comment", {"comment_id" : data.comment_id});
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
            deleteComment: createAThunk<{comment_id: number}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/delete_comment", {"comment_id" : data.comment_id});
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
            deleteArticle: createAThunk<{ post_id: number}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/delete_article", {"post_id": data.post_id});
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
            createTag: createAThunk<{ name: string, background_color: string, text_color: string}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/tag", {"name": data.name, "background_color": data.background_color, "text_color": data.text_color});
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
            editTag: createAThunk<{tag_id: number, name: string, background_color: string, text_color: string}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/edit_tag", {"tag_id": data.tag_id,"name": data.name, "background_color": data.background_color, "text_color": data.text_color});
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
            deleteTag: createAThunk<{ tag_id: number}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/delete_tag", {"tag_id": data.tag_id});
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
            editArticle: createAThunk<{ post_id: number, title: string, text: string, images: File | undefined, tags: number[]}, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const formData = new FormData();
                    formData.append('post_data', '{"post_id":' + data.post_id + ', "title":"' + data.title + '", "text":"' + data.text + '", "tags":[' + data.tags.toString() + ']}');

                    console.log(data.tags.toString());
                    console.log(formData.get('post_data'))
                    return await extra.api.post("/edit_article", {
                        'post_data': '{"post_id":' + data.post_id + ', "title":"' + data.title + '", "text":"' + data.text + '", "tags":[' + data.tags.toString() + ']}',
                        'image': data.images
                    }, {headers:
                            {'Content-Type': 'multipart/form-data'}
                    });
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
