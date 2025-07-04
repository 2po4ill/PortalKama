import React, {FC, memo} from "react";
import cls from "./ReservationAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {IReservationItem} from "entities/Reservation/model/types/reservation";

import green from "shared/assets/images/icon_Зеленый.png"
import red from "shared/assets/images/icon_Красный.png"
import {Button} from "shared/ui/Button/Button";
import {AppLink} from "shared/ui/AppLink/AppLink";
import mapPointGray from "shared/assets/images/icon_Серый.png";
import mapPointGreen from "shared/assets/images/icon_Зеленый.png";
import mapPointRed from "shared/assets/images/icon_Красный.png";

interface IReservationAsideProps {
    className?: string;
    place?: IReservationItem;
}

const ReservationAside: FC<IReservationAsideProps> = memo(props => {
    const { className ,
    place} = props;

    const dayOfTheWeek = (date: Date) => {
        switch(date.getDay())
        {
            case 0:
                return "Воскресенье"
            case 1:
                return "Понедельник"
            case 2:
                return "Вторник"
            case 3:
                return "Среда"
            case 4:
                return "Четверг"
            case 5:
                return "Пятница"
            case 6:
                return "Суббота"
        }
    }

    const fullDate = (date: Date) => {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    }

    const dateFormat = (date:Date) => {
        return (
            dayOfTheWeek(date) + ", " + fullDate(date)
        )
    }

    const mapPoint = (place: IReservationItem) => {

        if (place.place_id === 118 || place.place_id === 130)
            return mapPointGray

        if (place.is_available)
            return mapPointGreen

        if (!place.is_available)
            return mapPointRed


        return mapPointGray
    }


    const renderItem = (place: IReservationItem) => {
        return (
                <div className={cls.place}>
                    <img className={cls.statusImg} src={mapPoint(place)} alt={"flag"}/>
                    <div className={cls.properties}>
                        <a className={cls.title}> Место #{place.name} </a>
                        <a className={cls.description}> Телефон, компьютер </a>
                        {!place.is_available || (place.place_id != 118 && place.place_id != 130) ?
                            <div className={cls.text_block}>
                                <a className={cls.description}> {place.full_name} </a>
                                <a className={cls.description}> {place.position} </a>
                                <a className={cls.description}> {place.department} </a>
                                <a className={cls.description}> До {dateFormat(new Date(place.finish))} </a>
                            </div> : null
                        }
                    </div>
                </div>
            )
    }

    const renderBlank = () => {
        return (
            <div className={cls.place}>
                <div className={cls.properties}>
                    <a className={cls.description}> 1. Выберите нужный промежуток времени сверху </a>
                    <a className={cls.description}> 2. Выберите <span className={cls.green}> место </span> на карте бронирования </a>
                    <a className={cls.description}> 3. Нажмите кнопку забронировать внизу страницы </a>
                </div>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ReservationAside, {}, [className])}>
            <div className={cls.content}>

                <div className={cls.placeHolder}>
                    <a className={cls.label}> {place !== undefined ? "Выбранное место:" : "Выберите место:" }</a>
                    {place !== undefined ?
                        renderItem(place)
                        : renderBlank()}
                </div>
                <AppLink to={"my"} className={cls.Profile} disabled={false}>
                    <Button className={cls.btn}> Мои бронирования </Button>
                </AppLink>
            </div>
        </div>
    );
});
ReservationAside.displayName = "ReservationAside";

export {ReservationAside}