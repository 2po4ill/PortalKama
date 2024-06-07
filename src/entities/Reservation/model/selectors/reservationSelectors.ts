import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {IReservationItem, ReservationSchema} from "entities/Reservation/model/types/reservation";

const defaultReservationData: ReservationSchema = {
    reservations: [],
    error: undefined,
    isLoading: false
}

const getReservationData = (state: StateSchema) => state.reservation || defaultReservationData;

interface IProductSelectors {
    getReservationData: Selector<StateSchema, ReservationSchema>;
    getReservationList: Selector<StateSchema, IReservationItem[]>;
    getIsLoading: Selector<StateSchema, boolean>
}

export const reservationSelectors: IProductSelectors = {
    getReservationData,
    getReservationList: createSelector(
        getReservationData,
        (data) => data.reservations
    ),
    getIsLoading: createSelector(
        getReservationData,
        (data) => data.isLoading
    )
}