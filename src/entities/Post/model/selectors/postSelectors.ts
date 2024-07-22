import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Post, PostSchema} from "entities/Post";


const defaultPostData: PostSchema = {
    posts: [],
    post: undefined,
    error: undefined,
    isLoading: false,
    isPostLoading: false,
}

const getPostsData = (state: StateSchema) => state.post || defaultPostData;

interface IPostSelectors {
    getPostsData: Selector<StateSchema, PostSchema>;
    getPostsList: Selector<StateSchema, Post[]>;
    getPost: Selector<StateSchema, Post | undefined>;
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
    getIsLoading: createSelector(
        getPostsData,
        (data) => data.isLoading
    ),
    getIsPostLoading: createSelector(
        getPostsData,
        (data) => data.isPostLoading
    ),
}