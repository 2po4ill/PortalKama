import {StateSchema} from "app/providers/StoreProvider";
import {createSelector, Selector} from "@reduxjs/toolkit";
import {User, UserSchema} from "../types/user";

const getUser = (state: StateSchema) => state.user;

interface IUserSelectors {
    getUser: Selector<StateSchema, UserSchema>;
    getAuthData: Selector<StateSchema, User>;
    getIsLoading: Selector<StateSchema, boolean>;
}

export const userSelectors: IUserSelectors = {
    getUser,
    getAuthData: createSelector(
        getUser,
        (user) => user.authData
    ),
    getIsLoading: createSelector(
        getUser,
        (user) => user.isLoading
    )
}


