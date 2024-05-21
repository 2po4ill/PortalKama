import React, {FC, Fragment, ReactNode, useState} from "react";
import cls from "shared/ui/Calendar/Calendar.module.scss";
import {Button} from "primereact/button";
import {ICartItem, IShopItem} from "entities/Product/model/types/product";
import {ProductItem} from "features/product/ui/ProductItem/ProductItem";
import {CalendarField} from "shared/ui/CalendarField/CalendarField";

export interface ICalendar {
    className?: string;
}

export const Calendar: FC<ICalendar> = (props) => {
    const {
        className,
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
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate)
    }

    const previousMonth = () => {
        const newDate = new Date();
        newDate.setMonth(currentDate.getMonth() - 1);
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
            ,result = [getWeek(firstDay)]
            ,lastDay = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
        while (getLastWrittenDate(result).getDate() + 7 < lastDay.getDate()) {
            result.push(getWeek(new Date(getLastWrittenDate(result).getTime() + (24 * 60 * 60 * 1000))));
        }
        if (getLastWrittenDate(result) !== lastDay)
        {
            result.push(getWeek(new Date(getLastWrittenDate(result).getTime() + (24 * 60 * 60 * 1000))));
        }

        return result
    }

    const renderField = (date: Date) => {
            return (
                <CalendarField date={date} />
            )
        }




    return (
        <div>
            <Button onClick={nextMonth} className={cls.button}> Следующий </Button>
            <Button onClick={previousMonth}  className={cls.button} > Предыдущий </Button>
            {currentMonth(currentDate)}
            {getCalendarMonth(currentDate).map(dateList => dateList.map(date => renderField(date)))}
        </div>
    );
};