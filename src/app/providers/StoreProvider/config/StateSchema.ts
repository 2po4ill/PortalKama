import {counterSchema} from "entities/Counter";
import {UserSchema} from "entities/User";
import {AuthSchema} from "features/auth/ByUsername";
import {
    Reducer,
    ReducersMapObject,
    UnknownAction,
    EnhancedStore,
    StoreEnhancer,
    ThunkDispatch, Tuple
} from "@reduxjs/toolkit";
import {createReducerManager} from "./ReducerManager";
import {AxiosInstance} from "axios";
import {ProductSchema} from "entities/Product";
import {ProfileSchema} from "features/profile/model/types/profile";
import {ReservationSchema} from "entities/Reservation/model/types/reservation";

export interface StateSchema {
    counter: counterSchema;
    user: UserSchema;

    // Асинхронные редюсеры
    auth?: AuthSchema;
    product?: ProductSchema;
    reservation?: ReservationSchema;
    profile?: ProfileSchema;
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