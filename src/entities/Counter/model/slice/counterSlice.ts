import {createSlice} from "@reduxjs/toolkit";
import { counterSchema } from "../types/counterSchema";

const initialState: counterSchema = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        nullify: (state) => {
            state.value = 0
        }
    },
})

export const { actions: counterActions  } = counterSlice;
export const { reducer: counterReducer } = counterSlice