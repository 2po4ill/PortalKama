import {ReactNode, useEffect} from "react";
import {useDispatch, useStore} from "react-redux";
import {StateSchemaKey, StoreWithManager} from "app/providers/StoreProvider";
import {Reducer} from "@reduxjs/toolkit";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";

export interface IAsyncReducerProvider {
    children?: ReactNode;
    name: StateSchemaKey;
    reducer: Reducer;
    destroy?: boolean;
}

export const AsyncReducerProvider = (props: IAsyncReducerProvider) => {
    const {
        children,
        name,
        reducer,
        destroy = true
    } = props;
    const store = useStore() as StoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!Object.keys(store.reducerManager.getReducerMap()).includes(name)) {
            store.reducerManager.add(name, reducer);
            dispatch({type: `@INIT ${name} reducer`});
        }

        if (destroy) return () => {
            store.reducerManager.remove(name);
            dispatch({type: `@DESTROY ${name} reducer`});
        }
    }, []);

    return (children);
}