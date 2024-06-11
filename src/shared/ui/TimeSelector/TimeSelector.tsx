import React, {FC, useState} from "react";
import cls from "shared/ui/TimeSelector/TimeSelector.module.scss";
import {Button} from "primereact/button";

export interface ITimeSelector {
    className?: string;
    selectedDate: Date;
    setSelectedDate: (selectedDate: Date) => void;
}

export const TimeSelector: FC<ITimeSelector> = (props) => {
    const {
        className,
        selectedDate,
        setSelectedDate
    } = props;
    const currentHours = selectedDate.getHours();
    const [selectedHours, setCurrentHours] = useState(currentHours);

    const incrementHour = () => {
        setCurrentHours(selectedHours + 1)
        selectedDate.setHours(selectedHours + 1)
        const newDate = selectedDate
        setSelectedDate(newDate)

    }

    const decrementHour = () => {
        setCurrentHours(selectedHours - 1)
        selectedDate.setHours(selectedHours - 1)
        const newDate = selectedDate
        setSelectedDate(newDate)
    }


    return (
        <div>
            <div className={cls.TimeSelector}>
                <div className={cls.btn_container}>
                    <Button className={cls.btn} onClick={decrementHour}>{"<<"}</Button>
                    <Button className={cls.btn} onClick={incrementHour}>{">>"}</Button>
                </div>
                <a> {selectedHours} : 00 </a>
            </div>
        </div>
    );
};