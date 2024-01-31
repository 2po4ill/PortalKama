import {FC, ReactNode} from "react";
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from "../config/StateSchema";
import { EnhancedStore } from "@reduxjs/toolkit";

export interface IStoreProviderProps {
    children?: ReactNode;
    store?: EnhancedStore;
    initialState?: StateSchema;
}

export const StoreProvider: FC<IStoreProviderProps> = (props) => {
    const { children, store, initialState } = props;
    let providerStore = store;
    if (initialState) {
        providerStore = createReduxStore(initialState);
    }
    // const store = createReduxStore(initialState);
    return (
        <Provider store={providerStore}>
            {children}
        </Provider>
    )
}