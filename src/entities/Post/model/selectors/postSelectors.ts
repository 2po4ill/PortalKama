import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Post, PostSchema} from "entities/Post";

const defaultPostData: PostSchema = {
    posts: [],
    error: undefined,
    isLoading: false
}

const getPostsData = (state: StateSchema) => state.post || defaultPostData;

interface IProductSelectors {
    getPostsData: Selector<StateSchema, PostSchema>;
    getPostsList: Selector<StateSchema, Post[]>;
    getIsLoading: Selector<StateSchema, boolean>
}

export const postSelectors: IProductSelectors = {
    getPostsData,
    getPostsList: createSelector(
        getPostsData,
        (data) => data.posts
    ),
    getIsLoading: createSelector(
        getPostsData,
        (data) => data.isLoading
    )
}