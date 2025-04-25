import {Button} from "shared/ui/Button/Button";
import cls from './EventWindow.module.scss';
import React, {FC, memo} from "react";
import {fullDate} from "shared/lib/FormatDate/FormatDate";
import coin_icon from "shared/assets/icons/coin_icon.png";
import {EventList} from "features/product/ui/EventList/EventList";
import {UserSchema} from "entities/User";
import {Event, Transaction} from "entities/Product/model/types/product";
import {TransactionHistory} from "features/product/ui/TransactionHistory/TransactionHistory";

export interface IEventWindowProps {
    className?: string;
    events: Event[];
    transactions: Transaction[];
    takeEvent: (name: string, amount: number) => void;
    userData: UserSchema;
    selectedState: string;
    setModalIsOpen: (state: boolean) => void;
}

export const EventWindow: FC<IEventWindowProps> = memo((props) => {
    const { events, takeEvent, userData, selectedState , transactions , setModalIsOpen ,className } = props;

    return (
        <div className={cls.EventWindow}>
            <div className={cls.Data}>
                <div className={cls.Cluster_string}>
                    <label className={cls.title_string}> Дата: </label>
                    <label className={cls.number}> {fullDate(new Date())} </label>
                </div>
                <div className={cls.Cluster_string}>
                    <label className={cls.title_string}> Баланс: </label>
                    <label className={cls.number}> {userData.balance} </label>
                    <img src={coin_icon} alt={"Рахматик"} className={cls.coin_img}/>
                </div>
                <div className={cls.Cluster_action}>
                    <div className={cls.Cluster_string}>
                        <label className={cls.title_string}> Доступно для передачи коллегам: </label>
                        <label className={cls.number}> {0} </label>
                        <img src={coin_icon} alt={"Рахматик"} className={cls.coin_img}/>
                    </div>
                    <div className={cls.Cluster_buttons}>
                        <Button className={cls.action_button} onClick={() => setModalIsOpen(true)}> Подарить </Button>
                        <Button className={cls.action_button}> Перейти в магазин </Button>
                    </div>
                </div>
            </div>
            {selectedState == "events" ? <EventList events={events} takeEventAPI={takeEvent}/> : <TransactionHistory transactions={transactions}/>}
        </div>
    );
});