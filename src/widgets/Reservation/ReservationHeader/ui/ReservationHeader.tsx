import {FC, memo, useEffect, useRef, useState} from "react";
import cls from "./ReservationHeader.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";

import { Calendar } from "primereact/calendar";
import {ReservationCalendarInput} from "features/reservation";
import {Button} from "shared/ui/Button/Button";


interface IReservationHeaderProps {
    className?: string;
    selectedDateStart: Date;
    setSelectedDateStart: (selectedDate: Date) => void;
    selectedDateEnd: Date;
    setSelectedDateEnd: (selectedDate: Date) => void;
    apiCall: () => void;
}

const ReservationHeader: FC<IReservationHeaderProps> = memo(props => {
    const { className,
    setSelectedDateStart,
    selectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    apiCall} = props;


    return (
        <div className={classNames(cls.ReservationHeader, {}, [className])}>
            <div className={cls.title}>
               <p> Бронирование места </p>
            </div>
            <div className={cls.content}>
                <a> С </a>
                <ReservationCalendarInput className={cls.input} setSelectedDate={setSelectedDateStart} selectedDate={selectedDateStart}/>
                <a> ПО </a>
                <ReservationCalendarInput className={cls.input} setSelectedDate={setSelectedDateEnd} selectedDate={selectedDateEnd < selectedDateStart ? selectedDateStart : selectedDateEnd}/>
                <Button className={cls.btn} onClick={apiCall}> Найти </Button>
            </div>
        </div>
    );
});
ReservationHeader.displayName = "PostsHeader";

export {ReservationHeader}