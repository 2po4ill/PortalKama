import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {
    IDictionaryItem,
    IReservationItem,
    IReservationLockerItem,
    IReservationMade,
    ReservationSchema
} from "entities/Reservation/model/types/reservation";

const defaultReservationData: ReservationSchema = {
    reservations: [],
    lockerReservations: [],
    userReservationList: [],
    employees: [],
    error: undefined,
    isLoading: false
}

const getReservationData = (state: StateSchema) => state.reservation || defaultReservationData;

interface IProductSelectors {
    getReservationData: Selector<StateSchema, ReservationSchema>;
    getReservationList: Selector<StateSchema, IReservationItem[]>;
    getReservationLockerList: Selector<StateSchema, IReservationLockerItem[]>
    getPhoneBook: Selector<StateSchema, IDictionaryItem[]>
    getUserReservations: Selector<StateSchema, IReservationMade[]>;
    getError: Selector<StateSchema, string | undefined>
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
    getPhoneBook: createSelector(
        getReservationData,
        (data) => data.employees
    ),
    getUserReservations: createSelector(
        getReservationData,
        (data) => data.userReservationList
    ),
    getIsLoading: createSelector(
        getReservationData,
        (data) => data.isLoading
    ),
    getError: createSelector(
        getReservationData,
        (data) => data.error
    )
}