import {FC, memo, useState} from "react";
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from './GiveAwayModal.module.scss';
import {Shop_Users} from "entities/Product/model/types/product";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import DropdownInput from "shared/ui/DropDownInput/DropDownInput";

export interface IProductModalProps extends IModalProps {
    presentApi: (user_id: number, amount: number) => void;
    users: Shop_Users[];
    makeApi: (user_id: number, event_id: number) => void;
    role?: number;
}

export const GiveAwayModal: FC<IProductModalProps> = memo((props) => {
    const { presentApi, users, role, makeApi,...other } = props;

    const [selectedUser, setSelectedUser] = useState<string | undefined>( undefined);
    const [selectedAmount, setSelectedAmount] = useState<string>( "0");

    const [selectedUserAdmin, setSelectedUserAdmin] = useState<string | undefined>( undefined);
    const [selectedDescAdmin, setSelectedDescAdmin] = useState<string>( "0");

    const eventList = {
        "events":[
            {"id": 1,   "name":"Трудоустройство в компанию, первый вход в портал"},
            {"id": 2,   "name":"Еженедельное начисление"},
            {"id": 3,   "name":"Еженедельное начисление на подарки коллегам"},
            {"id": 4,   "name":"Проявление активности на портале"},
            {"id": 5,   "name":"Благодарность за долгосрочную работу в компании"},
            {"id": 6,   "name":"Администраторское начисление"},
            {"id": 7,   "name":"Новый год"},
            {"id": 8,   "name":"8 марта"},
            {"id": 9,   "name":"23 февраля"},
            {"id": 10,  "name":"День предприятия"},
            {"id": 11,  "name":"День рождения"},
            {"id": 12,  "name":"Подача статьи или новости для публикации на портале"},
            {"id": 13,  "name":"Значимые достижения"},
            {"id": 14,  "name":"Участие в корпоративных волонтерских мероприятиях"},
            {"id": 15,  "name":"Повышение должности"},
            {"id": 16,  "name":"Предложения по улучшению процессов"},
            {"id": 17,  "name":"Долгосрочная работа в компании"},
            {"id": 18,  "name":"Участие в опросах и фокус-группах"},
            {"id": 19,  "name":"Участие в корпоративных конкурсах"},
            {"id": 20,  "name":"Участие в стажировке или наставничестве"},
            {"id": 21,  "name":"Участие в корпоративных спортивных мероприятиях"},
            {"id": 22,  "name":"Участие в инициативах по экологии"},
            {"id": 23,  "name":"Обмен опытом"},
            {"id": 24,  "name":"Прохождение вакцинации"}
        ]
    }

    const thankList = {
        "thanks":[
            {"amount": 1,   "name":"Рахмат"},
            {"amount": 2,   "name":"Зур рахмат"},
            {"amount": 3,   "name":"Бик зур рахмат"}
        ]
    }

    const currentUser = users.find(user => user.full_name == selectedUser)
    const currentUserAdmin = users.find(user => user.full_name == selectedUserAdmin)
    const currentThanks = thankList.thanks.find(thanks => thanks.name == selectedAmount)
    const currentReason = eventList.events.find(event => event.name == selectedDescAdmin)



    const optionsUsers = () => {
        const usersList = [];
        users ? users.map(user => usersList.push({value: user.full_name, label: user.full_name})) : usersList.push({value: "error", label: "Произошла ошибка обратитесь к специалисту"})
        return usersList
    }

    const optionsEvents = () => {
        const eventsList = [];
        eventList.events ? eventList.events.map(event => eventsList.push({value: event.name, label: event.name})) : eventsList.push({value: "error", label: "Произошла ошибка обратитесь к специалисту"})
        return eventsList
    }

    const optionsThanks = () => {
        const thanksList = [];
        thankList.thanks ? thankList.thanks.map(thanks => thanksList.push({value: thanks.name, label: thanks.name})) : thanksList.push({value: "error", label: "Произошла ошибка обратитесь к специалисту"})
        return thanksList
    }

    return (
        <Modal
            className={classNames(cls.GiveAwayModal, {}, [])}
            {...other}
        >
            <div className={cls.GiveAwayMenu}>
                <div className={cls.DropdownContainer}>
                    <label className={cls.Title}> Выберите пользователя: </label>
                    <DropdownInput options={optionsUsers()} placeholder={"Поиск по ФИО ..."}
                                   onChange={e => setSelectedUser(e)}/>
                </div>
                <div className={cls.DropdownContainer}>
                    <label className={cls.Title}> Выберите количество рахматиков: </label>
                    <DropdownInput options={optionsThanks()} placeholder={"Выберите количество рахматиков"}
                                   onChange={e => setSelectedAmount(e)}/>
                </div>
                <Button
                    onClick={() => currentUser && currentThanks ? presentApi(currentUser.user_id, currentThanks.amount) : console.log(selectedUser)}> Подарить рахматики </Button>

                        <div className={cls.DropdownContainer}>
                            <label className={cls.Title}> Выберите пользователя: </label>
                            <DropdownInput options={optionsUsers()} placeholder={"Поиск по ФИО ..."}
                                           onChange={e => setSelectedUserAdmin(e)}/>
                        </div>
                        <div className={cls.DropdownContainer}>
                            <label className={cls.Title}> Выберите причину начисления: </label>
                            <DropdownInput options={optionsEvents()} placeholder={"Укажите причину начисления"}
                                           onChange={e => setSelectedDescAdmin(e)}/>
                        </div>
                        <Button
                            onClick={() => currentUserAdmin && currentReason ? makeApi(currentUserAdmin.user_id, currentReason.id) : console.log(selectedUser)}> Отправить
                            баллы </Button>
            </div>
        </Modal>
    );
});