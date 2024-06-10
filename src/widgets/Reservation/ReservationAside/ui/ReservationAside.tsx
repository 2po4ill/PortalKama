import React, {FC, memo} from "react";
import cls from "./ReservationAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {IReservationItem} from "entities/Reservation/model/types/reservation";

interface IReservationAsideProps {
    className?: string;
    place?: IReservationItem;
}

const ReservationAside: FC<IReservationAsideProps> = memo(props => {
    const { className ,
    place} = props;

    const renderItem = (place: IReservationItem) => {
        return (
            <div>
                {place.id}
                {place.status}
                {place.properties}
                </div>
            )
    }

    const renderBlank = () => {
        return (
            <div>
                Здесь пока пусто
            </div>
        )
    }

    return (
        <div className={classNames(cls.ReservationAside, {}, [className])}>
            <div className={cls.content}>
                Выбранное место:
                <div className={cls.placeHolder}>
                    Выберите свободное место на карте
                    {place !== undefined ?
                        renderItem(place)
                        : renderBlank()}
                </div>
                Мои бронирования
            </div>
        </div>
    );
});
ReservationAside.displayName = "ReservationAside";

export {ReservationAside}