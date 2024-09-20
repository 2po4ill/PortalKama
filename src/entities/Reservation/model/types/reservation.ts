
export interface ReservationSchema {
    reservations: IReservationItem[];
    userReservationList: IReservationMade[];
    isLoading: boolean;
    error: string | undefined;
}

/** Данные с сервера **/
export interface IReservationItem {
    // id места
    place_id: number;
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
    user_reservations: IReservationMade[];
}

export interface IReservationMade{
    place_id: number;
    start: string;
    finish: string;
}

