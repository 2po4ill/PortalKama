import React, {FC, useState} from "react";
import cls from "shared/ui/Calendar/Calendar.module.scss";
import {Button} from "primereact/button";
import {CalendarField} from "shared/ui/CalendarField/CalendarField";
import {classNames} from "shared/lib/classNames";
import previous from "shared/assets/icons/Слайдер влево.png"
import next from "shared/assets/icons/Слайдер вправо.png"

export interface ICalendar {
    className?: string;
    setSelectedDate: (selectedDate: Date) => void;
    selectedDate: Date;
}

export const Calendar: FC<ICalendar> = (props) => {
    const {
        className,
        setSelectedDate,
        selectedDate,
    } = props;
    const [currentDate, setCurrentDate] = useState(new Date());


    const currentMonth = (date: Date) => {
        switch (date.getMonth()){
            case 0:
                return "Январь"
            case 1:
                return "Февраль"
            case 2:
                return "Март"
            case 3:
                return "Апрель"
            case 4:
                return "Май"
            case 5:
                return "Июнь"
            case 6:
                return "Июль"
            case 7:
                return "Август"
            case 8:
                return "Сентябрь"
            case 9:
                return "Октябрь"
            case 10:
                return "Ноябрь"
            case 11:
                return "Декабрь"
        }
    }
    const nextMonth = () => {
        const newDate = new Date();
        if (currentDate.getMonth() == 11) {
            newDate.setFullYear(newDate.getFullYear() + 1, 0);
        }
        else {
            newDate.setMonth(currentDate.getMonth() + 1);
        }
        setCurrentDate(newDate)
    }

    const previousMonth = () => {
        const newDate = new Date();
        if (currentDate.getMonth() == 0) {
            newDate.setFullYear(newDate.getFullYear() - 1, 11);
        }
        else {
            newDate.setMonth(currentDate.getMonth() - 1);
        }
        setCurrentDate(newDate)
    }

    function getLastWrittenDate(weekList: Date[][]){
        return weekList[weekList.length-1][weekList[weekList.length-1].length-1]
    }


    function getWeek(fromDate: Date){
        let day_increment = fromDate.getDay()
        if (fromDate.getDay() == 0)
        {
            day_increment = 7
        }
        const monday = new Date(fromDate.setDate(fromDate.getDate() - day_increment + 1))
            ,result = [new Date(monday)];
        while (monday.setDate(monday.getDate() + 1) && monday.getDay() !== 1) {
            result.push(new Date(monday));
        }
        return result;
    }

    function getCalendarMonth(fromDate: Date) {
        const firstDay = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1)
            ,result = [getWeek(firstDay)];

        for (let i = 0; i < 5; i++) {
            result.push(getWeek(new Date(getLastWrittenDate(result).getTime() + (24 * 60 * 60 * 1000))));
        }


        return result
    }

    const renderField = (date: Date) => {
            return (
                <CalendarField date={date} month={currentDate.getMonth()} setSelectedDate={setSelectedDate} selectedDate={selectedDate} setCurrentDate={setCurrentDate}/>
            )
        }




    return (
        <div className={cls.Calendar}>
            <a className={cls.year}> {currentDate.getFullYear()} </a>
            <div className={cls.buttonPlaceHolder}>
                <Button onClick={previousMonth}
                        className={classNames(cls.button, {}, [cls.previous])}>
                    <img src={previous} alt={"previous"}/>
                </Button>
                <a className={cls.month}> {currentMonth(currentDate)} </a>
                <Button onClick={nextMonth}
                        className={classNames(cls.button, {}, [])}>
                    <img src={next} alt={"next"}/>
                </Button>
            </div>
            <div className={cls.CalendarField}>
                <a> ПН </a>
                <a> ВТ </a>
                <a> СР </a>
                <a> ЧТ </a>
                <a> ПТ </a>
                <a> СБ </a>
                <a> ВС </a>
                {getCalendarMonth(currentDate).map(dateList => dateList.map(date => renderField(date)))}
            </div>
        </div>
    );
};