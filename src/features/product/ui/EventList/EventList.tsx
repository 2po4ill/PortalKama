import {FC, memo, useState} from "react";
import cls from './EventList.module.scss'
import {Event} from "entities/Product/model/types/product";
import {Button} from "shared/ui/Button/Button";
import test_icon_balance from "shared/assets/icons/test_icon_balance.png"
import coin_img from "shared/assets/icons/coin_icon.png"
import {fullDate} from "shared/lib/FormatDate/FormatDate";

export interface IProductListProps {
    className?: string;
    events: Event[];
    takeEventAPI: (name: string, amount: number) => void;
}

export const EventList: FC<IProductListProps> = memo((props) => {
    const { events , takeEventAPI} = props;

    const renderEvent = (event: Event) => {
        return  <div className={cls.Event}>
                    <div className={cls.info_container}>
                            <div className={cls.img_container}>
                                <img src={test_icon_balance} alt={'баланс'} className={cls.img_event}/>
                            </div>
                        <div className={cls.info}>
                            <label className={cls.label}> {event.name} </label>
                            <label className={cls.label_gray}> Способ начисления: автоматически </label>
                            <label className={cls.label_gray}> Период начисления: {fullDate(new Date(event.date))} - xx.xx.xx </label>
                            <label className={cls.label_gray}> Дата сгорания: xx.xx.xx </label>
                        </div>
                    </div>
            <div className={cls.Buttons}>
            <Button onClick={() => takeEventAPI(event.name, event.amount)} className={cls.Btn}> Забрать </Button>
                        <label className={cls.Amount}> {event.amount} </label>
                        <img src={coin_img} alt={'coin_img'} className={cls.coin_img} />
                    </div>
                </div>
    }




    return (
        <div className={cls.EventList}>
            {events ? events.map(event => renderEvent(event)) : "Вы забрали все события, зайдите позже"}
            {renderEvent({name: "Администраторское начисление", date: new Date().toString(), amount: 1000})}
        </div>
    );
});