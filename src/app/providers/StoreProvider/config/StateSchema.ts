import {counterSchema} from "entities/Counter";
import {UserSchema} from "entities/User";
import {AuthSchema} from "features/auth/ByUsername";
import {
    Reducer,
    ReducersMapObject,
    UnknownAction,
    EnhancedStore,
    StoreEnhancer,
    ThunkDispatch, Tuple, combineReducers
} from "@reduxjs/toolkit";
import {createReducerManager} from "./ReducerManager";
import {AxiosInstance} from "axios";
import {ReducerAction} from "react";

export interface StateSchema {
    counter: counterSchema;
    user: UserSchema;

    // Асинхронные редюсеры
    auth?: AuthSchema
}

export interface IReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface StoreWithManager extends
    EnhancedStore<
        StateSchema,
        UnknownAction,
        Tuple<[
            StoreEnhancer<{dispatch: ThunkDispatch<StateSchema, undefined, UnknownAction>}>,
            StoreEnhancer
        ]>
    >{
    reducerManager: ReturnType<typeof createReducerManager>
}

export interface IThunkExtraArg {
    api: AxiosInstance;
}

export interface IThunkConfig<T> {
    rejectValue: T;
    extra: IThunkExtraArg;
}

export type StateSchemaKey = keyof StateSchema;