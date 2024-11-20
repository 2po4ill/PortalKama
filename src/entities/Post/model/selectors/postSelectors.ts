import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Post, PostDesc, PostSchema, Tag, Comment} from "entities/Post/model/types/post";


const defaultPostData: PostSchema = {
    posts: [],
    post: undefined,
    comments: [],
    tags: [],
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
    checkComments: Selector<StateSchema, Comment[] | []>
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
    getTags: createSelector(
        getPostsData,
        (data) => data.tags
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