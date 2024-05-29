import React, {FC} from "react";
import cls from "shared/ui/Point/Point.module.scss";
export interface IPoint {
    className?: string;
    status: string;
    x: string;
    y: string;
    params: string;
}

export const Point: FC<IPoint> = (props) => {
    const {
        className,
        status,
        x,
        y,
        params
    } = props;



    return (
        <div className={cls.circle}>

        </div>
    );
};