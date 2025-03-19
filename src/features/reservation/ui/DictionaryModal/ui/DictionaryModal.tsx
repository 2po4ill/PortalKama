import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./DictionaryModal.module.scss";
import {IDictionaryItem} from "entities/Reservation/model/types/reservation";
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
        dictionary} = props;

    const [newList, setNewList] = useState(dictionary);
    const [predicament, setPredicament] = useState("");


    function renderPhone(full_name: string, position: string, department: string, mail: string, mobile: string) {

        return <tbody className={cls.column}>
        <tr>
            <td><Text text={(full_name != "" ? full_name : "-")}/></td>
            <td><Text text={(position != "" ? position : "-")}/></td>
            <td><Text text={(department != "" ? department : "-")}/></td>
            <td><Text text={(mail != "" ? mail : "-")}/></td>
            <td><Text text={(mobile != "" ? mobile : "-")}/></td>

        </tr>
        </tbody>
    }

    function filterList() {
        const newList :IDictionaryItem[] = []
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
                                <td><Text title={"Сотрудник"}/></td>
                                <td><Text title={"Должность"}/></td>
                                <td><Text title={"Служба"}/></td>
                                <td><Text title={"Почта"}/></td>
                                <td><Text title={"Корпоративный сотовый телефон"}/></td>
                            </tr>
                            </thead>
                            {newList.map(person => renderPhone(person.full_name, person.position, person.department, person.mail, person.mobile))}
                        </table>
                    </div>
                </div>
            </Modal>
    );
});
DictionaryModal.displayName = "DictionaryModal";

export {DictionaryModal};