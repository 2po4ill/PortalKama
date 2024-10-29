import React, {FC} from "react";
import cls from "shared/ui/Point/Point.module.scss";
import {classNames} from "shared/lib/classNames"
import mapPointGreen from "shared/assets/images/icon_Зеленый.png";
import mapPointRed from "shared/assets/images/icon_Красный.png";
import mapPointGray from "shared/assets/images/icon_Серый.png";
import {IReservationItem} from "entities/Reservation/model/types/reservation";
export interface IPoint {
    className: string;
    place: IReservationItem;
    selectedPoint: number;
    phone?: string;
    setSelectedPoint: (number: number) => void;
    setSelectedPlace: (place: IReservationItem) => void;
}

export const Point: FC<IPoint> = (props) => {
    const {
        className,
        place,
        selectedPoint,
        phone,
        setSelectedPoint,
        setSelectedPlace
    } = props;

    const SelectPoint = () => {
        setSelectedPoint(place.place_id)
        setSelectedPlace(place)
    }

    const mods: Record<string, boolean> = {
        [cls.selected_point]: place.place_id === selectedPoint,
    };

    const mapPoint = () => {
        if (place.is_available)
            return mapPointGreen

        if (!place.is_available)
            return mapPointRed

        return mapPointGray
    }



    return (
        <div className={classNames(className, mods, [])}>
            <div className={cls.tooltip}>
                <img src={mapPoint()} alt={"point"} onClick={SelectPoint}/>
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