import {classNames} from "shared/lib/classNames";
import cls from './ReservationListItem.module.scss';
import {FC, memo} from "react";
import {Button} from "shared/ui/Button/Button";
import {IReservationMade} from "entities/Reservation/model/types/reservation";
import {Text} from "shared/ui/Text/Text";

export interface IReservationItemProps {
    className?: string;
    reservation: IReservationMade;
    apiCall: (id: number) => void;
}

export const ReservationListItem: FC<IReservationItemProps> = memo((props) => {
    const { reservation, className , apiCall} = props;

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

    const dateFormat = (date:Date) => {
        return (
                dayOfTheWeek(date) + ", " + fullDate(date)
        )
    }
    return (
        <div className={classNames(cls.ReservationItemList, {}, [])}>
            <div className={cls.ItemAbout}>
                <div className={classNames(cls.ItemTitle, {}, [])}>
                    <Text title={`С - ${dateFormat(start)}`}/>
                    <Text title={`По - ${dateFormat(finish)}`}/>
                </div>

                <div className={classNames(cls.ItemDescription, {}, [])}>
                    <Text text={`Место #${reservation.place_name}`}/>
                    <Text text={`ПК, Интернет, Телефон, Принтер`}/>
                </div>
            </div>
            <div className={classNames(cls.btnPanel, {}, [])}>
                    <Button className={cls.btn} onClick={() => apiCall(reservation.reservation_id)}> Отменить </Button>
            </div>
        </div>
    );
});