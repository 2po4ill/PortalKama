import React, {FC, useState} from "react";
import { Calendar } from 'shared/ui/Calendar/Calendar';
import {Input} from "shared/ui/Input/Input";
import {Modal} from "shared/ui/Modal/Modal";
import CalendarImage from "shared/assets/icons/Календарь.png"
import cls from './PostCalendarInput.module.scss';

export interface IReservationCalendarInputProps {
    className?: string;
    setSelectedDate: (selectedDate: Date | undefined) => void;
    selectedDate?: Date
}

export const PostCalendarInput: FC<IReservationCalendarInputProps> = (props) => {
    const { className,
        setSelectedDate,
        selectedDate} = props;

    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const dateFormat = (date:Date | undefined) => {
        return new Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(date);
    }

    return (
        <div className={className}>
            <div>
                <Input className={cls.input} onClick={openModal} placeholder={"ДД.ММ.ГГГГ"} value={dateFormat(selectedDate)} adornment={<img className={cls.img} src={CalendarImage} alt={"Календарь"} role={"button"}/>}/>
                <Modal isOpen={open} onClose={() => {setOpen(false)}} className={cls.Modal}>

                    <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate ? selectedDate : new Date()}/>
                </Modal>
            </div>
        </div>
    )
}