
export interface ReservationSchema {
    reservations: IReservationItem[];
    isLoading: boolean;
    error: string | undefined;
}

/** Данные с сервера **/
export interface IReservationItem {
    // id места
    id: string;
    // статус места
    status: string;
    // дополнительные параметры
    properties: string;
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