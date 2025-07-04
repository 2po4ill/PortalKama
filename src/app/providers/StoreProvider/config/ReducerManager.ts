import {combineReducers, Reducer, ReducersMapObject, UnknownAction} from "@reduxjs/toolkit";
import {IReducerManager, StateSchema, StateSchemaKey} from "./StateSchema";

/**
 *  https://redux.js.org/usage/code-splitting
 */
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): IReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemaKey[] = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state: StateSchema, action: UnknownAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            // https://github.com/2po4ill/PortalKama/issues/17
            // @ts-ignore
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        }
    };
}

