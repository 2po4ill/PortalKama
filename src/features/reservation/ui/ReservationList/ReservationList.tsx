import {FC, memo, useState} from "react";
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

    const [selectedState, setSelectedState] = useState("future");

    const renderReservationItem = (reservation: IReservationMade) => {
        if (selectedState == "future" && new Date(reservation.finish) >= new Date())
                    return (
                        <ReservationListItem reservation={reservation} className={cls.ReservationItem} apiCall={apiCall}/>
                    )
        if (selectedState == "previous" && new Date(reservation.finish) < new Date())
            return (
                <ReservationListItem reservation={reservation} className={cls.ReservationItem} apiCall={apiCall}/>
            )
    }


    const ChangeToFuture = () => {
        setSelectedState("future")
    }

    const ChangeToPrevious = () => {
        setSelectedState("previous")
    }
    return (
        <div>
            <div className={classNames(cls.ReservationList, {}, [])}>
                <Text title={"Мои бронирования"} className={cls.title}/>
                <div>
                    <div onClick={ChangeToFuture}> Будущие </div>
                    <div onClick={ChangeToPrevious}> Предыдущие </div>
                </div>
                {
                    reservations.length > 0
                        ? reservations.map(reservation => renderReservationItem(reservation))
                        : <div>У вас пока нет забронированных мест</div>
                }
            </div>
        </div>
    );
});