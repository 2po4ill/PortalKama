import React, {ChangeEvent, FC, useState} from "react";
import { Calendar } from 'shared/ui/Calendar/Calendar';
import {Input} from "shared/ui/Input/Input";
import {Modal} from "shared/ui/Modal/Modal";

export interface IReservationCalendarInputProps {
    className?: string;
}

export const ReservationCalendarInput: FC<IReservationCalendarInputProps> = (props) => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Input onClick={openModal} value={selectedDate.toDateString()}/>
                <Modal isOpen={open} onClose={() => {setOpen(false)}}>
                    <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
                </Modal>
            </div>
        </div>
    )
}