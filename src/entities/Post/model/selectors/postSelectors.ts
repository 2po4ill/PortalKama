import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Post, PostDesc, PostSchema, Tag} from "entities/Post/model/types/post";


const defaultPostData: PostSchema = {
    posts: [],
    post: undefined,
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
    getIsLoading: createSelector(
        getPostsData,
        (data) => data.isLoading
    ),
    getIsPostLoading: createSelector(
        getPostsData,
        (data) => data.isPostLoading
    ),
}