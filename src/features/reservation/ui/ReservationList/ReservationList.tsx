import {FC, memo} from "react";
import cls from './ReservationList.module.scss'
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";
import {IReservationMade} from "entities/Reservation/model/types/reservation";
import {ReservationListItem} from "features/reservation/ui/ReservationListItem/ReservationListItem";

export interface ICartListProps {
    className?: string;
    reservations: IReservationMade[];
    apiCall: (id: number) => void;
}

export const ReservationList: FC<ICartListProps> = memo((props) => {
    const {reservations, apiCall} = props;


    const renderReservationItem = (reservation: IReservationMade) => {
                    return (
                        <ReservationListItem reservation={reservation} className={cls.ReservationItem} apiCall={apiCall}/>
                    )
    }



    return (
        <div>
            <div className={classNames(cls.ReservationList, {}, [])}>
                <Text title={"Мои бронирования"} className={cls.title}/>
                {
                    reservations.length > 0
                    ? reservations.map(reservation => renderReservationItem(reservation))
                    : <div>У вас пока нет забронированных мест</div>
                }
            </div>
        </div>
    );
});