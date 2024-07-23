import {FC, memo} from "react";
import cls from './ReservationList.module.scss'
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";
import {IReservationMade} from "entities/Reservation/model/types/reservation";
import {ReservationListItem} from "features/reservation/ui/ReservationListItem/ReservationListItem";

export interface ICartListProps {
    className?: string;
    reservations: IReservationMade[];
}

export const ReservationList: FC<ICartListProps> = memo((props) => {
    const {reservations} = props;


    const renderReservationItem = (reservation: IReservationMade) => {
                    return (
                        <ReservationListItem reservation={reservation}/>
                    )
    }

    return (
        <div>
            <div className={classNames(cls.ProductList, {}, [])}>
                <Text title={"Мои бронирования"} className={cls.title}/>
                {
                    reservations.length > 0
                    ? reservations.map(reservation => renderReservationItem(reservation))
                    : <div>Список пуст</div>
                }

            </div>
        </div>
    );
});