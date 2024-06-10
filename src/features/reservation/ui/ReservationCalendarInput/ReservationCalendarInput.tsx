import React, {ChangeEvent, FC, useState} from "react";
import { Calendar } from 'shared/ui/Calendar/Calendar';
import {Input} from "shared/ui/Input/Input";
import {Modal} from "shared/ui/Modal/Modal";
import {TimeSelector} from "shared/ui/TimeSelector/TimeSelector";

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

    return (
        <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Input onClick={openModal} value={selectedDate.toString()}/>
                <Modal isOpen={open} onClose={() => {setOpen(false)}}>
                    <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
                    <TimeSelector setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
                </Modal>
            </div>
        </div>
    )
}