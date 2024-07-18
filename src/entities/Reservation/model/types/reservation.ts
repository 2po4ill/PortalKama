
export interface ReservationSchema {
    reservations: IReservationItem[];
    isLoading: boolean;
    error: string | undefined;
}

/** Данные с сервера **/
export interface IReservationItem {
    // id места
    place_id: number;
    // статус места
    is_available: boolean;
    // дополнительные параметры
    name: string;
}

export interface IReservationData {
    status: string;
    reservation_list: IReservationItem[];
}

export interface IReservationMade{
    place_id: number;
    start: Date;
    finish: Date;
}