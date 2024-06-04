import React, {FC} from "react";
import cls from "shared/ui/Point/Point.module.scss";
import {classNames} from "shared/lib/classNames"
import mapPointGreen from "shared/assets/images/icon_Зеленый.png";
import mapPointRed from "shared/assets/images/icon_Красный.png";
import mapPointGray from "shared/assets/images/icon_Серый.png";
export interface IPoint {
    className: string;
    status?: string;
    id: number;
    selectedPoint: number;
    setSelectedPoint: (number: number) => void;
    params?: string;
}

export const Point: FC<IPoint> = (props) => {
    const {
        className,
        status,
        params,
        id,
        selectedPoint,
        setSelectedPoint
    } = props;

    const SelectPoint = () => {
        if (status === "available") {
            setSelectedPoint(id)
        }
        else{
            alert("Данное место по тем или иным причинам недоступно к бронированию, попробуйте изменить дату")
        }
    }

    const mods: Record<string, boolean> = {
        [cls.selected_point]: id === selectedPoint,
    };

    const mapPoint = () => {
        if (status === "available")
            return mapPointGreen

        if (status === "unavailable")
            return mapPointRed

        return mapPointGray
    }



    return (
        <div className={classNames(className, mods, [])}>
            <img src={mapPoint()} alt={"point"} onClick={SelectPoint}/>
        </div>
    );
};