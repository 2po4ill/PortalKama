import {combineReducers, configureStore, ReducersMapObject, Store} from '@reduxjs/toolkit';
import { Reducer } from "redux";
import {StateSchema, StoreWithManager} from "./StateSchema";
import {counterReducer} from "entities/Counter";
import {userReducer} from "entities/User";
import {createReducerManager} from "./ReducerManager";
import {$api} from "shared/api/api";

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer
    };

    const reducerManager = createReducerManager(rootReducer);
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api
                }
            }
        })
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export const AppStore = createReduxStore();

export type AppDispatch = typeof AppStore.dispatch;