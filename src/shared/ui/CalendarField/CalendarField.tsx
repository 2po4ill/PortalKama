import React, {FC, Fragment, ReactNode, useState} from "react";
import cls from "shared/ui/Calendar/Calendar.module.scss";
import {Button} from "primereact/button";

export interface ICalendarField {
    className?: string;
    date: Date;
}

export const CalendarField: FC<ICalendarField> = (props) => {
    const {
        className,
        date,
    } = props;


    const dayOfWeek = () => {
        switch (date.getDay()){
            case 0:
                return "ВС"
            case 1:
                return "ПН"
            case 2:
                return "ВТ"
            case 3:
                return "СР"
            case 4:
                return "ЧТ"
            case 5:
                return "ПТ"
            case 6:
                return "СБ"
        }
    }
    const dateNumber = date.getDate()


    return (
        <div>
            {dateNumber }
            {dayOfWeek()}
        </div>
    );
};