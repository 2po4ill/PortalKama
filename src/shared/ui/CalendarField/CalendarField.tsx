import React, {FC, Fragment, ReactNode, useState} from "react";
import cls from "shared/ui/CalendarField/CalendarField.module.scss";
import {Button} from "primereact/button";
import {classNames} from "shared/lib/classNames";

export interface ICalendarField {
    className?: string;
    date: Date;
    month: number;
    setSelectedDate: (date: Date) => void;
    selectedDate: Date;
}

export const CalendarField: FC<ICalendarField> = (props) => {
    const {
        className,
        date,
        month,
        selectedDate,
        setSelectedDate
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

    const mods: Record<string, boolean> = {
        [cls.day_cur_month]: date.getMonth() === month,
        [cls.today]: date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth(),
        [cls.day_other_month]: date.getMonth() !== month,
        [cls.selected_date]: date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth()
    };

    const selectDate = () => {
        setSelectedDate(date)
    }

    return (
        <div className={classNames(cls.Field, mods)} onClick={selectDate}>
            {dateNumber }
        </div>
    );
};