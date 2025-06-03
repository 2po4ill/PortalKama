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
        dictionary} = props;


    const [newList, setNewList] = useState(dictionary);
    const [predicament, setPredicament] = useState("");


    function renderPhone(person: IDictionaryItem) {
        return <tbody className={cls.column}>
        <tr>
            <td><Text text={(person.full_name != "" ? person.full_name : "-")}
                      onClick={() => filterList(person.full_name)} className={cls.exampleLink}/></td>
            <td><Text text={(person.position != "" ? person.position : "-")} onClick={() => filterList(person.position)}
                      className={cls.exampleLink}/></td>
            <td><Text text={(person.department != "" ? person.department : "-")}
                      onClick={() => filterList(person.department)} className={cls.exampleLink}/></td>
            <td><Text text={(person.department != "" ? person.department : "-")}
                      onClick={() => filterList(person.department)} className={cls.exampleLink}/></td>
            <td><Text text={(person.place ? person.place : "-")} onClick={() => filterList(person.place)}
                      className={cls.exampleLink}/></td>
            <td><Text text={(person.place_number ? person.place_number : "-")}
                      onClick={() => filterList(person.place_number)} className={cls.exampleLink}/></td>
            <td><Text text={(person.mobile != "" ? person.mobile : "-")} onClick={() => filterList(person.mobile)}
                      className={cls.exampleLink}/></td>
            <td><Text text={(person.mail != "" ? person.mail : "-")} onClick={() => filterList(person.mail)}
                      className={cls.exampleLink}/></td>
        </tr>
        </tbody>
    }

    function filterList(predicament: string) {
        const newList: IDictionaryItem[] = []
        dictionary.map(person => {
            (
                    person.full_name.includes(predicament) ||
                    person.department.includes(predicament) ||
                    person.position.includes(predicament) ||
                    person.mail.includes(predicament) ||
                    person.mobile.includes(predicament) ||
                    person.place.includes(predicament) ||
                    person.place_number.includes(predicament)) ||
                predicament == ""
                    ? newList.push(person) : null
            })
            setNewList(newList)
    }

    function filterListByColumn(target: string) {
        const newList = dictionary;
        switch (target) {
            case "full_name": {
                newList.sort((a, b) => a.full_name.localeCompare(b.full_name))
                break;
            }
            case "department": {
                newList.sort((a, b) => a.department.localeCompare(b.department))
                break;
            }
            case "position": {
                newList.sort((a, b) => a.position.localeCompare(b.position))
                break;
            }
            case "mail": {
                newList.sort((a, b) => a.mail.localeCompare(b.mail))
                break;
            }
            case "mobile": {
                newList.sort((a, b) => a.mobile.localeCompare(b.mobile))
                break;
            }
            case "place": {
                newList.sort((a, b) => a.place.localeCompare(b.place))
                break;
            }
            case "place_number": {
                newList.sort((a, b) => a.place_number.localeCompare(b.place_number))
                break;
            }
        }
        setNewList(newList)
    }

    const today = new Date()

    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.PhoneModal}>
                    <div className={cls.header}>
                        <Input adornment={
                            <Button onClick={() => filterList(predicament)} className={cls.btn}> <a>Поиск</a> <img src={Search} alt={"Поиск"} className={cls.btnImage}/> </Button>
                        } onChange={setPredicament} placeholder={"Введите данные о месте или о сотруднике для поиска"}/>
                    </div>
                    <div className={cls.placeList}>
                        <Text title={"Телефонный справочник сотрудников на " + today.getFullYear().toString() + "." + (today.getMonth() + 1).toString() + "." + (today.getDate() + 1).toString()}
                              text={"Актуален только на текущие сутки"} className={cls.title}/>
                        <table className={cls.table}>
                            <thead className={cls.columnHeader}>
                            <tr>
                                <td onClick={() => filterListByColumn("full_name")} className={cls.columnHead}><Text title={"ФИО"}/></td>
                                <td onClick={() => filterListByColumn("position")} className={cls.columnHead}><Text title={"Должность"}/></td>
                                <td onClick={() => filterListByColumn("department")} className={cls.columnHead}><Text title={"Отдел"}/></td>
                                <td onClick={() => filterListByColumn("department")} className={cls.columnHead}><Text title={"Служба"}/></td>
                                <td onClick={() => filterListByColumn("place")} className={cls.columnHead}><Text title={"Рабочее место"}/></td>
                                <td onClick={() => filterListByColumn("place_number")} className={cls.columnHead}><Text title={"Стационарный телефон"}/></td>
                                <td onClick={() => filterListByColumn("mobile")} className={cls.columnHead}><Text title={"Корпоративный сотовый телефон"}/></td>
                                <td onClick={() => filterListByColumn("mail")} className={cls.columnHead}><Text title={"Почта"}/></td>
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