import {createSelector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";

export const getAuth = (state: StateSchema) => state.auth;
export const getUsername = createSelector(
    getAuth,
    (auth) => auth.username
);

export const getPassword = createSelector(
    getAuth,
    (auth) => auth.password
);

export const getIsLoading = createSelector(
    getAuth,
    (auth) => auth.isLoading
);

export const getError = createSelector(
    getAuth,
    (auth) => auth.error
);