import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Post, PostDesc, PostSchema, Tag, Comment, Worker} from "entities/Post/model/types/post";


const defaultPostData: PostSchema = {
    posts: [],
    post: undefined,
    comments: [],
    tags: [],
    workers_info: [],
    total_views: 0,
    error: undefined,
    isLoading: false,
    isPostLoading: false,
}

const getPostsData = (state: StateSchema) => state.post || defaultPostData;

interface IPostSelectors {
    getPostsData: Selector<StateSchema, PostSchema>;
    getPostsList: Selector<StateSchema, Post[]>;
    getPost: Selector<StateSchema, PostDesc | undefined>;
    getTags: Selector<StateSchema, Tag[] | []>;
    getTotalViews: Selector<StateSchema, number>;
    getTopWorkers: Selector<StateSchema, Worker[]>;
    checkComments: Selector<StateSchema, Comment[] | []>;
    getIsPostLoading: Selector<StateSchema, boolean>;
    getIsLoading: Selector<StateSchema, boolean>;
}

export const postSelectors: IPostSelectors = {
    getPostsData,
    getPostsList: createSelector(
        getPostsData,
        (data) => data.posts
    ),
    getPost: createSelector(
        getPostsData,
        (data) => data.post
    ),
    getTotalViews: createSelector(
        getPostsData,
        (data) => data.total_views
    ),
    getTags: createSelector(
        getPostsData,
        (data) => data.tags
    ),
    getTopWorkers: createSelector(
        getPostsData,
        (data) => data.workers_info
    ),
    checkComments: createSelector(
        getPostsData,
        (data) => data.comments
    ),
    getIsLoading: createSelector(
        getPostsData,
        (data) => data.isLoading
    ),
    getIsPostLoading: createSelector(
        getPostsData,
        (data) => data.isPostLoading
    ),
}