import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./DictionaryModal.module.scss";
import {IDictionaryItem, IReservationItem} from "entities/Reservation/model/types/reservation";
import {Text} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import Search from "shared/assets/icons/search.png"


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    dictionary: IDictionaryItem[];
}

const DictionaryModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        onClose,
        dictionary,} = props;


    const [newList, setNewList] = useState(dictionary);
    const [predicament, setPredicament] = useState("");


    function renderPhone(person: IDictionaryItem) {
        console.log(newList)
        console.log(person)
        return <tbody className={cls.column}>
        <tr>
            <td><Text text={(person.full_name != "" ? person.full_name : "-")}/></td>
            <td><Text text={(person.position != "" ? person.position : "-")}/></td>
            <td><Text text={(person.department != "" ? person.department : "-")}/></td>
            <td><Text text={(person.department != "" ? person.department : "-")}/></td>
            <td><Text text={(person.place_number ? person.place_number : "-")}/></td>
            <td><Text text={(person.mobile != "" ? person.mobile : "-")}/></td>
            <td><Text text={(person.place ? person.place : "-")}/></td>
            <td><Text text={(person.mail != "" ? person.mail : "-")}/></td>
        </tr>
        </tbody>
    }

    function filterList() {
        const newList:IDictionaryItem[] = []
            dictionary.map(person => {
                (
                    person.full_name.includes(predicament) ||
                    person.department.includes(predicament) ||
                    person.position.includes(predicament) ||
                    person.mail.includes(predicament) ||
                    person.mobile.includes(predicament)) ||
                predicament == ""
                    ? newList.push(person) : null
            })
            setNewList(newList)
    }

    const today = new Date()

    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.PhoneModal}>
                    <div className={cls.header}>
                        <Input adornment={
                            <Button onClick={filterList} className={cls.btn}> <a>Поиск</a> <img src={Search} alt={"Поиск"} className={cls.btnImage}/> </Button>
                        } onChange={setPredicament} placeholder={"Введите данные о месте или о сотруднике для поиска"}/>
                    </div>
                    <div className={cls.placeList}>
                        <Text title={"Телефонный справочник сотрудников на " + today.getFullYear().toString() + "." + (today.getMonth() + 1).toString() + "." + (today.getDate() + 1).toString()}
                              text={"Актуален только на текущие сутки"} className={cls.title}/>
                        <table className={cls.table}>
                            <thead className={cls.columnHeader}>
                            <tr>
                                <td><Text title={"ФИО"}/></td>
                                <td><Text title={"Должность"}/></td>
                                <td><Text title={"Отдел"}/></td>
                                <td><Text title={"Служба"}/></td>
                                <td><Text title={"Рабочее место"}/></td>
                                <td><Text title={"Стационарный телефон"}/></td>
                                <td><Text title={"Корпоративный сотовый телефон"}/></td>
                                <td><Text title={"Почта"}/></td>
                            </tr>
                            </thead>
                            {newList.map(person => renderPhone(person))}
                        </table>
                    </div>
                </div>
            </Modal>
    );
});
DictionaryModal.displayName = "DictionaryModal";

export {DictionaryModal};