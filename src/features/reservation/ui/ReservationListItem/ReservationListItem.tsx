import {classNames} from "shared/lib/classNames";
import cls from './ReservationListItem.scss';
import {FC, memo, useCallback} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import bin from 'shared/assets/icons/Vector.png'
import {ICartItem, IShopItem} from "entities/Product/model/types/product";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {useLocation} from "react-router-dom";
import {Input} from "shared/ui/Input/Input";
import {Navbar} from "widgets/Navbar";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {productActions} from "entities/Product";
import {IReservationMade} from "entities/Reservation/model/types/reservation";

export interface ICartItemProps {
    className?: string;
    reservation: IReservationMade;
}

export const ReservationListItem: FC<ICartItemProps> = memo((props) => {
    const { reservation, className } = props;

    const start = new Date(reservation.start)
    const finish = new Date(reservation.finish)


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

    const dateTime = (date:Date) => {
        return date.getHours() + ":00"
    }


    const dateFormat = (date:Date) => {
        return (
            <div>
                <a> {dayOfTheWeek(date)}, {fullDate(date)} {dateTime(date)}</a>
            </div>
        )
    }
    return (
        <div>
            <div>
                <label> Место #{reservation.place_id}</label>
                <a> {dateFormat(start)} - {dateFormat(finish)} </a>
            </div>
            <div>
                    <Button> Изменить </Button>
                    <Button> Отменить </Button>
            </div>
        </div>
    );
});