import {StateSchema} from "app/providers/StoreProvider";

// TODO можно сделать unit тест
export const getCounter = (state: StateSchema) => state.counter;