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
    setCurrentDate: (date: Date) => void;
}

export const CalendarField: FC<ICalendarField> = (props) => {
    const {
        className,
        date,
        month,
        selectedDate,
        setSelectedDate,
        setCurrentDate
    } = props;

    const dateNumber = date.getDate()

    const mods: Record<string, boolean> = {
        [cls.day_cur_month]: date.getMonth() === month,
        [cls.today]: date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth(),
        [cls.day_other_month]: date.getMonth() !== month,
        [cls.selected_date]: date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth(),
        [cls.weekend]: date.getDay() == 6 || date.getDay() == 0,
        [cls.working_day]: date.getDay() !== 6 && date.getDay() !== 0,
    };

    const selectDate = () => {
        const currentDate = new Date();
        const tenDaysForward = new Date();

        currentDate.setHours(0,0,0,0)
        tenDaysForward.setHours(23, 59, 59, 99)
        tenDaysForward.setDate(tenDaysForward.getDate() + 7);

        if (tenDaysForward > date && currentDate <= date) {
            if (date.getDay() !== 6 && date.getDay() !== 0) {
                if (date.getMonth() !== month) {
                    setCurrentDate(date)
                }
                date.setHours(selectedDate.getHours())
                setSelectedDate(date)
            }
        }
        else {
            alert("Дату можно выбрать только в промежутке 7-ми дней от сегодня. Выберите другую, подходящую дату")
        }
    }

    return (
        <div className={classNames(cls.Field, mods)} onClick={selectDate}>
            {dateNumber }
        </div>
    );
};