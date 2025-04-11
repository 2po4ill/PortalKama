import {FC, memo} from "react";
import cls from './TransactionHistory.module.scss'
import {Event, Transaction} from "entities/Product/model/types/product";
import {Button} from "shared/ui/Button/Button";
import test_icon_balance from "shared/assets/icons/test_icon_balance.png"
import coin_img from "shared/assets/icons/coin_icon.png"
import {fullDate} from "shared/lib/FormatDate/FormatDate";

export interface IProductListProps {
    className?: string;
    transactions: Transaction[];
}

export const TransactionHistory: FC<IProductListProps> = memo((props) => {
    const { transactions } = props;

    const renderEvent = (transaction: Transaction) => {
        return  <div className={cls.Transaction}>
                    <div className={cls.info_container}>
                            <div className={cls.img_container}>
                                <img src={test_icon_balance} alt={'баланс'} className={cls.img_event}/>
                            </div>
                        <div className={cls.info}>
                            <label className={cls.label}> {transaction.description} </label>
                            <label className={cls.label_gray}> Дата: {fullDate(new Date(transaction.date))} </label>
                        </div>
                    </div>
            <div className={cls.Buttons}>
                        <label className={cls.Amount}> {transaction.amount} </label>
                        <img src={coin_img} alt={'coin_img'} className={cls.coin_img} />
                    </div>
                </div>
    }




    return (
        <div className={cls.TransactionList}>
            {transactions ? transactions.map(transaction => renderEvent(transaction)) : "У вас еще не было транзакций"}
        </div>
    );
});