import React, {FC, memo} from "react";
import cls from "./ReservationAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {IReservationItem} from "entities/Reservation/model/types/reservation";

import green from "shared/assets/images/icon_Зеленый.png"
import {Button} from "shared/ui/Button/Button";
import ProfileImg from "shared/assets/icons/profile-icon.png";
import {RoutePath} from "shared/const/router";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {AppLink} from "shared/ui/AppLink/AppLink";

interface IReservationAsideProps {
    className?: string;
    place?: IReservationItem;
}

const ReservationAside: FC<IReservationAsideProps> = memo(props => {
    const { className ,
    place} = props;

    const renderItem = (place: IReservationItem) => {
        return (
                <div className={cls.place}>
                    <img className={cls.statusImg} src={green} alt={"green"}/>
                    <div className={cls.properties}>
                        <a className={cls.title}> Место #{place.place_id} </a>
                        <a className={cls.description}> Телефон, компьютер </a>
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