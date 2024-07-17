import {StateSchema} from "app/providers/StoreProvider";
import {createSelector, Selector} from "@reduxjs/toolkit";
import {UserSchema} from "../types/user";
import {initialUser} from "../const/initialUser";

const getUser = (state: StateSchema) => state.user || initialUser;

interface IUserSelectors {
    getUser: Selector<StateSchema, UserSchema>;
    getIsAuthorized: Selector<StateSchema, boolean>;
    getIsLoading: Selector<StateSchema, boolean>;
}

export const userSelectors: IUserSelectors = {
    getUser,
    getIsAuthorized: createSelector(
        getUser,
        (user) => user.isAuthorized
    ),
    getIsLoading: createSelector(
        getUser,
        (user) => user.isLoading
    )
}


