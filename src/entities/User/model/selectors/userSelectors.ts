import {StateSchema} from "app/providers/StoreProvider";
import {createSelector, Selector} from "@reduxjs/toolkit";
import {UserSchema} from "../types/user";
import {initialUser} from "../const/initialUser";

const getUser = (state: StateSchema) => state.user || initialUser;

interface IUserSelectors {
    getUser: Selector<StateSchema, UserSchema>;
    getImage: Selector<StateSchema, string>
    getIsAuthorized: Selector<StateSchema, boolean>;
    getIsLoading: Selector<StateSchema, boolean>;
}

export const userSelectors: IUserSelectors = {
    getUser,
    getImage: createSelector(
        getUser,
        (user) => user.image_path
    ),
    getIsAuthorized: createSelector(
        getUser,
        (user) => user.isAuthorized
    ),
    getIsLoading: createSelector(
        getUser,
        (user) => user.isLoading
    )
}


