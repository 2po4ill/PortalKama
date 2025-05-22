import {FC, memo} from "react";
import cls from './TransactionHistory.module.scss'
import {Event, Transaction} from "entities/Product/model/types/product";
import {Button} from "shared/ui/Button/Button";
import test_icon_balance from "shared/assets/icons/test_icon_balance.png"
import coin_img from "shared/assets/icons/coin_icon.png"
import {fullDate} from "shared/lib/FormatDate/FormatDate";
import AchievmentBonus from "shared/assets/HistoryIcons/AchievmentsBonus.png";
import ActiveBonus from "shared/assets/HistoryIcons/ActiveBonus.png";
import AdministratorBonus from "shared/assets/HistoryIcons/AdministratorBonus.png";
import CareerBonus from "shared/assets/HistoryIcons/CareerBonus.png";
import CartPurchase from "shared/assets/HistoryIcons/CartPurchase.png";
import CelebrationBonus from "shared/assets/HistoryIcons/CelebrationBonus.png";
import CoachingBonus from "shared/assets/HistoryIcons/CoachingBonus.png";
import ContestantBonus from "shared/assets/HistoryIcons/ContestantBonus.png";
import EcologyBonus from "shared/assets/HistoryIcons/EcologyBonus.png";
import ExpirienceChangeBonus from "shared/assets/HistoryIcons/ExpirienceChangeBonus.png";
import Gift from "shared/assets/HistoryIcons/Gift.png";
import KaidzenBonus from "shared/assets/HistoryIcons/KaidzenBonus.png";
import LongLiveBonus from "shared/assets/HistoryIcons/LongLiveBonus.png";
import NewsPushBonus from "shared/assets/HistoryIcons/NewsPushBonus.png";
import QuizBonus from "shared/assets/HistoryIcons/QuizBonus.png";
import SportBonus from "shared/assets/HistoryIcons/SportBonus.png";
import VactinationBonus from "shared/assets/HistoryIcons/VactinationBonus.png";
import VoluntaryBonus from "shared/assets/HistoryIcons/VoluntaryBonus.png";
import WeeklyBonus from "shared/assets/HistoryIcons/WeeklyBonus.png";
import WelcomeBonus from "shared/assets/HistoryIcons/WelcomeBonus.png";

export interface IProductListProps {
    className?: string;
    transactions: Transaction[];
}

export const    TransactionHistory: FC<IProductListProps> = memo((props) => {
    const { transactions } = props;

    const eventList = {
        "events":[
            {"id": 1,   "name":"Трудоустройство в компанию, первый вход в портал", "image": WelcomeBonus},
            {"id": 2,   "name":"Еженедельное начисление", "image": WeeklyBonus},
            {"id": 3,   "name":"Еженедельное начисление на подарки коллегам", "image": WeeklyBonus},
            {"id": 4,   "name":"Проявление активности на портале", "image": ActiveBonus},
            {"id": 5,   "name":"Благодарность за долгосрочную работу в компании", "image": LongLiveBonus},
            {"id": 6,   "name":"Администраторское начисление", "image": AdministratorBonus},
            {"id": 7,   "name":"Новый год", "image": CelebrationBonus},
            {"id": 8,   "name":"8 марта", "image": CelebrationBonus},
            {"id": 9,   "name":"23 февраля", "image": CelebrationBonus},
            {"id": 10,  "name":"День предприятия", "image": CelebrationBonus},
            {"id": 11,  "name":"День рождения", "image": CelebrationBonus},
            {"id": 12,  "name":"Подача статьи или новости для публикации на портале", "image": NewsPushBonus},
            {"id": 13,  "name":"Значимые достижения", "image": AchievmentBonus},
            {"id": 14,  "name":"Участие в корпоративных волонтерских мероприятиях", "image": VoluntaryBonus},
            {"id": 15,  "name":"Повышение должности", "image": CareerBonus},
            {"id": 16,  "name":"Предложения по улучшению процессов", "image": KaidzenBonus},
            {"id": 17,  "name":"Долгосрочная работа в компании", "image": LongLiveBonus},
            {"id": 18,  "name":"Участие в опросах и фокус-группах", "image": QuizBonus},
            {"id": 19,  "name":"Участие в корпоративных конкурсах", "image": ContestantBonus},
            {"id": 20,  "name":"Участие в стажировке или наставничестве", "image": CoachingBonus},
            {"id": 21,  "name":"Участие в корпоративных спортивных мероприятиях", "image": SportBonus},
            {"id": 22,  "name":"Участие в инициативах по экологии", "image": EcologyBonus},
            {"id": 23,  "name":"Обмен опытом", "image": ExpirienceChangeBonus},
            {"id": 24,  "name":"Прохождение вакцинации", "image": VactinationBonus}
        ]
    }

    const findTransaction = (transaction: Transaction) => {
        return eventList.events.find(event => event.name == transaction.description)
    }

    const renderEvent = (transaction: Transaction) => {
        const currentTransaction = findTransaction(transaction)
        return  <div className={cls.Transaction}>
                    <div className={cls.info_container}>
                            <div className={cls.img_container}>
                                <img src={currentTransaction ? currentTransaction.image : Gift} alt={'баланс'} className={cls.img_event}/>
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