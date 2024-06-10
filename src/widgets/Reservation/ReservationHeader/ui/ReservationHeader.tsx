import {FC, memo, useEffect, useRef, useState} from "react";
import cls from "./ReservationHeader.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";

import { Calendar } from "primereact/calendar";
import {ReservationCalendarInput} from "features/reservation";


interface IReservationHeaderProps {
    className?: string;
    selectedDateStart: Date;
    setSelectedDateStart: (selectedDate: Date) => void;
    selectedDateEnd: Date;
    setSelectedDateEnd: (selectedDate: Date) => void;
}

const ReservationHeader: FC<IReservationHeaderProps> = memo(props => {
    const { className,
    setSelectedDateStart,
    selectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd} = props;


    return (
        <div className={classNames(cls.PostsHeader, {}, [className])}>
            <div className={cls.content}>
                <ReservationCalendarInput setSelectedDate={setSelectedDateStart} selectedDate={selectedDateStart}/>
                <ReservationCalendarInput setSelectedDate={setSelectedDateEnd} selectedDate={selectedDateEnd}/>
            </div>
        </div>
    );
});
ReservationHeader.displayName = "PostsHeader";

export {ReservationHeader}