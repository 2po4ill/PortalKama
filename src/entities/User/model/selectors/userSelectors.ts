import {StateSchema} from "app/providers/StoreProvider";
import {createSelector, Selector} from "@reduxjs/toolkit";
import {User, UserSchema} from "../types/user";


const defaultUser: UserSchema = {
    username: "",
    img: "",
    uid: "",
    isLoading: false,
    isAuthorized: false
};
const getUser = (state: StateSchema) => state.user || defaultUser;

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


