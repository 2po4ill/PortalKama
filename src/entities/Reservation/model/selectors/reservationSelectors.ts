import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {
    IReservationItem,
    IReservationLockerItem,
    IReservationMade,
    ReservationSchema
} from "entities/Reservation/model/types/reservation";

const defaultReservationData: ReservationSchema = {
    reservations: [],
    lockerReservations: [],
    userReservationList: [],
    error: undefined,
    isLoading: false
}

const getReservationData = (state: StateSchema) => state.reservation || defaultReservationData;

interface IProductSelectors {
    getReservationData: Selector<StateSchema, ReservationSchema>;
    getReservationList: Selector<StateSchema, IReservationItem[]>;
    getReservationLockerList: Selector<StateSchema, IReservationLockerItem[]>
    getUserReservations: Selector<StateSchema, IReservationMade[]>;
    getIsLoading: Selector<StateSchema, boolean>
}

export const reservationSelectors: IProductSelectors = {
    getReservationData,
    getReservationList: createSelector(
        getReservationData,
        (data) => data.reservations
    ),
    getReservationLockerList: createSelector(
        getReservationData,
        (data) => data.lockerReservations
    ),
    getUserReservations: createSelector(
        getReservationData,
        (data) => data.userReservationList
    ),
    getIsLoading: createSelector(
        getReservationData,
        (data) => data.isLoading
    )
}