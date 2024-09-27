import React, {FC} from "react";
import cls from "shared/ui/LockerPoint/LockerPoint.module.scss";
import {classNames} from "shared/lib/classNames"
import {IReservationLockerItem} from "entities/Reservation/model/types/reservation";
export interface IPoint {
    className: string;
    place: IReservationLockerItem;
    selectedPoint: number;
    phone?: string;
    setSelectedPoint: (number: number) => void;
    setSelectedPlace: (place: IReservationLockerItem) => void;
}

export const LockerPoint: FC<IPoint> = (props) => {
    const {
        className,
        place,
        selectedPoint,
        phone,
        setSelectedPoint,
        setSelectedPlace
    } = props;

    const SelectPoint = () => {
        if (place.is_available) {
            setSelectedPoint(place.locker_id)
            setSelectedPlace(place)
        }
        else{
            alert("Данное место по тем или иным причинам недоступно к бронированию, попробуйте изменить дату")
        }
    }

    const mods: Record<string, boolean> = {
        [cls.selected_point]: place.locker_id === selectedPoint,
        [cls.opened]: place.is_available,
        [cls.closed]: !place.is_available
    };


    return (
        <div className={classNames(className, mods, [])}>
            <div className={cls.tooltip}>
                <div className={cls.box} onClick={SelectPoint}>
                </div>
                { place.is_available ? null :
                <div className={cls.tooltiptext}>
                    <a> {place.full_name} </a>
                    <a> {place.position} </a>
                    <a> {phone ? "+" + phone : null} </a>
                </div>
                }
            </div>
        </div>
    );
};