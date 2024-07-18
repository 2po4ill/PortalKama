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
    setSelectedPoint: (number: number) => void;
    setSelectedPlace: (place: IReservationItem) => void;
}

export const Point: FC<IPoint> = (props) => {
    const {
        className,
        place,
        selectedPoint,
        setSelectedPoint,
        setSelectedPlace
    } = props;

    const SelectPoint = () => {
        if (place.is_available) {
            setSelectedPoint(place.place_id)
            setSelectedPlace(place)
        }
        else{
            alert("Данное место по тем или иным причинам недоступно к бронированию, попробуйте изменить дату")
        }
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
            <img src={mapPoint()} alt={"point"} onClick={SelectPoint}/>
        </div>
    );
};