import {FC, ReactNode} from "react";
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import {StateSchema} from "../config/StateSchema";

export interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
}

export const StoreProvider: FC<IStoreProviderProps> = (props) => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}