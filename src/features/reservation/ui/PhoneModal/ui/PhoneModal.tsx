import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./PhoneModal.module.scss";
import {IReservationItem} from "entities/Reservation/model/types/reservation";
import {Text} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import Search from "shared/assets/icons/search.png"


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    places: IReservationItem[];
    selectedDate: Date;
}

const PhoneModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        onClose,
        selectedDate,
    places} = props;

    const [newList, setNewList] = useState(places);
    const [predicament, setPredicament] = useState("");
    const [allOccupied, setAllOccupied] = useState(true)


    const phoneList = ['3-87-20', '7-17-07', '7-17-83', '-', '3-87-30', '3-98-57', '7-17-51', '7-17-44', '3-98-92', '3-87-39', '7-17-46', ' 3-87-34', '7-17-45', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '6-83-38', '7-17-76', '7-17-70', '7-17-03', '7-17-84', '7-17-49', '3-87-35', '3-87-32', '6-83-37', '7-17-84', '7-17-49', '3-87-35', '3-87-32', '6-83-37', '3-87-33', '7-17-92', '7-17-20', '7-17-89', '7-17-66', '7-17-95', '3-98-58', '7-17-54', '7-17-54', '7-17-54', '6-83-36', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '6-83-32', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '7-17-22', '6-83-35', '-', '6-83-32', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53']
    function renderPhone(phone: string,  place: string , name: string, position: string, department: string) {
        return <tbody className={cls.column}>
        <tr>
            <td><Text text={place}/></td>
            <td><Text text={phone != "-" ? phone : "-"}/></td>
            <td><Text text={(name != "" ? name : "Место не занято")}/></td>
            <td><Text text={(position != "" ? position : "-")}/></td>
            <td><Text text={(department != "" ? department : "-")}/></td>
        </tr>
        </tbody>
    }

    function filterList() {
        const newList :IReservationItem[] = []
        if (allOccupied) {
            places.map(place => {
                if (!place.is_available) {
                    (place.name.includes(predicament) || place.full_name.includes(predicament) || place.department.includes(predicament) || place.position.includes(predicament)) || predicament == "" ? newList.push(place) : null
                }
            })
            setNewList(newList)
        }
        else {
            places.map(place => {
                (place.name.includes(predicament) || place.full_name.includes(predicament) || place.department.includes(predicament) || place.position.includes(predicament)) || predicament == "" ? newList.push(place) : null
            })
            setNewList(newList)
        }

    }

    const changeAllOccupied = () => {
        const newStatus = !allOccupied
        setAllOccupied(newStatus)
    }

    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.PhoneModal}>
                    <div className={cls.header}>
                        <Input adornment={
                            <Button onClick={filterList} className={cls.btn}> <img src={Search} alt={"Поиск"} className={cls.btnImage}/> </Button>
                        } onChange={setPredicament} placeholder={"Введите данные о месте или о сотруднике для поиска"}/>
                        <div className={cls.checkBox}>
                            <input type={"checkbox"} className={cls.checkbox} onChange={changeAllOccupied} checked={allOccupied}/>
                            <a> Только занятые места </a>
                        </div>
                    </div>
                    <div className={cls.placeList}>
                        <Text title={"Телефонный справочник на " + selectedDate.getFullYear().toString() + "." + (selectedDate.getMonth() + 1).toString() + "." + (selectedDate.getDate() + 1).toString()}
                              text={"Актуален только на текущие сутки"} className={cls.title}/>
                        <table className={cls.table}>
                            <thead className={cls.columnHeader}>
                            <tr>
                                <td><Text title={"Место"}/></td>
                                <td><Text title={"Номер телефона"}/></td>
                                <td><Text title={"Сотрудник"}/></td>
                                <td><Text title={"Должность"}/></td>
                                <td><Text title={"Служба"}/></td>
                                <td><Text title={"Почта"}/></td>
                            </tr>
                            </thead>
                            {newList.map(place => renderPhone(phoneList[place.place_id - 1], place.name, place.full_name, place.position, place.department))}
                        </table>
                    </div>
                </div>
            </Modal>
    );
});
PhoneModal.displayName = "PhoneModal";

export {PhoneModal};