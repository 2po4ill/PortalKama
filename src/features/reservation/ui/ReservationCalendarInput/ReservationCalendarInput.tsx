import React, {FC, useState} from "react";
import { Calendar } from 'shared/ui/Calendar/Calendar';

export interface IReservationCalendarInputProps {
    className?: string;
}

export const ReservationCalendarInput: FC<IReservationCalendarInputProps> = (props) => {

    return (
        <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <label htmlFor="calendar-24h" className="font-bold block mb-2">
                    24h Format
                </label>
                <Calendar/>
            </div>
        </div>
    )
}