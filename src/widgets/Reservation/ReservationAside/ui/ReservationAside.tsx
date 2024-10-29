import React, {FC, memo} from "react";
import cls from "./ReservationAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {IReservationItem} from "entities/Reservation/model/types/reservation";

import green from "shared/assets/images/icon_Зеленый.png"
import red from "shared/assets/images/icon_Красный.png"
import {Button} from "shared/ui/Button/Button";
import {AppLink} from "shared/ui/AppLink/AppLink";

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


    const renderItem = (place: IReservationItem) => {
        return (
                <div className={cls.place}>
                    <img className={cls.statusImg} src={place.is_available ? green : red} alt={"flag"}/>
                    <div className={cls.properties}>
                        <a className={cls.title}> Место #{place.name} </a>
                        <a className={cls.description}> Телефон, компьютер </a>
                        {!place.is_available ?
                            <div className={cls.properties}>
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
                    <a className={cls.description}> Здесь пока пусто </a>
                    <a className={cls.description}> Добавьте нужное место через карту офиса! </a>
                </div>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ReservationAside, {}, [className])}>
            <div className={cls.content}>

                <div className={cls.placeHolder}>
                    <a className={cls.label}> Выбранное место: </a>
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