
export interface ReservationSchema {
    reservations: IReservationItem[];
    lockerReservations: IReservationLockerItem[];
    userReservationList: IReservationMade[];
    employees: IDictionaryItem[];
    isLoading: boolean;
    error: string | undefined;
}

/** Данные с сервера **/
export interface IReservationItem {
    // id места
    place_id: number;
    full_name: string;
    user_id: number;
    phone: string;
    is_available: boolean;
    position: string;
    department: string;
    finish: number;
    // дополнительные параметры
    name: string;
    mail: string;
    mobile: string;

}

export interface IDictionaryItem {
    full_name: string;
    position: string;
    department: string;
    mail: string;
    mobile: string;
    place?: string;
    place_number?: string;
}

export interface IReservationLockerItem {
    // id места
    locker_id: number;
    full_name: string;
    is_available: boolean;
    position: string;
    department: string;
    // дополнительные параметры
    name: string;
}

export interface IReservationData {
    status: string;
    reservation_list: IReservationItem[];
    locker_reservation_list: IReservationLockerItem[];
    user_reservations: IReservationMade[];
    employees: IDictionaryItem[];
}

export interface IReservationMade{
    reservation_id: number;
    place_id: number;
    place_name: string;
    start: string;
    finish: string;
}

