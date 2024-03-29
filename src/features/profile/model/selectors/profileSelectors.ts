import {StateSchema} from "app/providers/StoreProvider";
import {Profile, ProfileSchema} from "../types/profile";
import { initialState } from "../slice/profileSlice";
import {createSelector, Selector} from "@reduxjs/toolkit";

const getProfileData = (state: StateSchema) => state.profile || initialState;

interface IProfileSelectors {
    getProfileData: Selector<StateSchema, ProfileSchema>,
    getProfile: Selector<StateSchema, Profile>,
    getIsLoading: Selector<StateSchema, boolean>,
    getError: Selector<StateSchema, string | undefined>
}

export const profileSelectors: IProfileSelectors = {
    getProfileData,
    getProfile: createSelector(
        getProfileData,
        (data) => data.profile
    ),
    getIsLoading: createSelector(
        getProfileData,
        (data) => data.isLoading
    ),
    getError: createSelector(
        getProfileData,
        (data) => data.error
    )
}