import {configureStore, ReducersMapObject, Store} from '@reduxjs/toolkit'
import {StateSchema, StoreWithManager} from "./StateSchema";
import {counterReducer} from "entities/Counter";
import {userReducer} from "entities/User";
import {createReducerManager} from "app/providers/StoreProvider/config/ReducerManager";
import {$api} from "shared/api/api";

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer
    };

    const reducerManager = createReducerManager(rootReducer);
    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api
                }
            }
        })
    }) as StoreWithManager;
    store.reducerManager = reducerManager;

    return store;
}

export const AppStore = createReduxStore();

export type AppDispatch = typeof AppStore.dispatch;