import {StateSchema} from "app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";
import {getCounter} from "./getCounter";

/**
 * для понимания происходящего см. https://github.com/reduxjs/reselect
 * TODO можно сделать unit тест
 */
export const getCounterValue = createSelector(
    getCounter,
    (counter) => counter.value
)