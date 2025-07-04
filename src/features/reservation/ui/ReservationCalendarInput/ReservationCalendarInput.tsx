import React, {ChangeEvent, FC, useState} from "react";
import { Calendar } from 'shared/ui/Calendar/Calendar';
import {Input} from "shared/ui/Input/Input";
import {Modal} from "shared/ui/Modal/Modal";
import {TimeSelector} from "shared/ui/TimeSelector/TimeSelector";
import CalendarImage from "shared/assets/icons/Календарь.png"
import cls from './ReservationCalendarInput.module.scss';
import {Button} from "shared/ui/Button/Button";

export interface IReservationCalendarInputProps {
    className?: string;
    selectedDate: Date;
    setSelectedDate: (selectedDate: Date) => void;
}

export const ReservationCalendarInput: FC<IReservationCalendarInputProps> = (props) => {
    const { className,
        setSelectedDate,
        selectedDate} = props;

    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true)
    }
    selectedDate.setHours(selectedDate.getHours())
    selectedDate.setMinutes(0, 0, 0)
    const date = new Intl.DateTimeFormat("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(selectedDate);

    return (
        <div className={className}>
            <div>
                <Input className={cls.input} onClick={openModal} value={date} adornment={<img className={cls.img} src={CalendarImage} alt={"Календарь"} role={"button"} onClick={openModal}/>}/>
                <Modal isOpen={open} onClose={() => {setOpen(false)}} className={cls.Modal} closeButtonContent={"Выбрать"}>
                    <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
                </Modal>
            </div>
        </div>
    )
}