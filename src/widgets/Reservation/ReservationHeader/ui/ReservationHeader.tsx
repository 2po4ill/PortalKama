import {FC, memo, useEffect, useRef, useState} from "react";
import cls from "./ReservationHeader.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";

import { Calendar } from "primereact/calendar";
import {ReservationCalendarInput} from "features/reservation";


interface IReservationHeaderProps {
    className?: string;
}

const ReservationHeader: FC<IReservationHeaderProps> = memo(props => {
    const { className } = props;


    return (
        <div className={classNames(cls.PostsHeader, {}, [className])}>
            <div className={cls.content}>
                <ReservationCalendarInput/>
                <ReservationCalendarInput/>
            </div>
        </div>
    );
});
ReservationHeader.displayName = "PostsHeader";

export {ReservationHeader}