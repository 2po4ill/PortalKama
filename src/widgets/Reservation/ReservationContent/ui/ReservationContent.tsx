import {FC, memo, useState} from "react";
import { useNavigate } from "react-router-dom";

import {classNames} from "shared/lib/classNames";
import cls from "./ReservationContent.module.scss";


import {Map} from "shared/ui/Map/Map";
import {IDictionaryItem, IReservationItem, IReservationLockerItem} from "entities/Reservation/model/types/reservation";
import {Button} from "shared/ui/Button/Button";

import green from "shared/assets/images/icon_Зеленый.png"
import red from "shared/assets/images/icon_Красный.png"
import gray from "shared/assets/images/icon_Серый.png"
import chair from "shared/assets/images/icon_chair.png"

import {PhoneModal} from "features/reservation/ui/PhoneModal";
import {useSelector} from "react-redux";
import {userSelectors} from "entities/User";
import {DictionaryModal} from "features/reservation/ui/DictionaryModal";
import { RoutePath } from "shared/const/router";

interface IReservationContentProps {
    className?: string;
    places: IReservationItem[];
    dictionary: IDictionaryItem[];
    selectedPoint: number;
    selectedDate: Date;
    setSelectedPoint: (number: number) => void;
    setSelectedPlace: (place: IReservationItem) => void;
    setSelectedLocker: (locker: IReservationLockerItem) => void;
    apiCall: () => void;
}

const ReservationContent: FC<IReservationContentProps> = memo((props) => {
    const { className,
    places,
    setSelectedPoint,
    selectedPoint,
    setSelectedPlace,
        setSelectedLocker,
        selectedDate,
        dictionary,
    apiCall} = props;

    const userData = useSelector(userSelectors.getUser);
    const userPlace = places.find(place => place.user_id === userData.uid)

    const [selectedFloor, setSelectedFloor] = useState(localStorage.getItem('floor'));
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);

    const navigate = useNavigate();

    const checkPlaces = (dictionaryItems: IDictionaryItem[], placeItems: IReservationItem[]): IDictionaryItem[] => {
        const newList : IDictionaryItem[] = [];
        dictionaryItems.forEach(item => resultList(newList, item.full_name, item.position, item.department, item.mail, item.mobile, findPlace(item, placeItems)?.name, findPlace(item, placeItems)?.phone))
        return newList.sort((a, b) => a.full_name.localeCompare(b.full_name))
    }
    const findPlace = (dictionaryItem: IDictionaryItem, placeItems: IReservationItem[]) : IReservationItem | undefined => {
        return placeItems.find(place => place.full_name == dictionaryItem.full_name)
    }
    const resultList = (newList: IDictionaryItem[], full_name: string, position: string, department: string, mail: string, mobile: string, place?: string, phone?: string) => {
        const person = {full_name, position, department, mail, mobile, place: place ? place : "-", place_number: phone ? phone : "-"} as IDictionaryItem;
        newList.push(person)
    }

    const userFloor = () => {
    if (userPlace) {
       if (userPlace.place_id < 53) {
           setSelectedFloor("2_1")
       }
       if (userPlace.place_id > 52 && userPlace.place_id < 107) {

           setSelectedFloor("2_2")
       }
       if (userPlace.place_id > 106) {
           return setSelectedFloor("1_1")
       }
    }
    }

    const ChangeTo11 = () => {
        localStorage.setItem('floor', "1_1");
        setSelectedFloor("1_1")
    }
    const ChangeTo21 = () => {
        if (selectedFloor === "1_1") {
            localStorage.setItem('floor', "2_1");
            setSelectedFloor("2_1")
        }
    }
    const ChangeToLeftWing = () => {
        if (selectedFloor === "2_2") {
            localStorage.setItem('floor', "2_1");
            setSelectedFloor("2_1")
        }
    }
    const ChangeTo22 = () => {
        if (selectedFloor === "2_1") {
            localStorage.setItem('floor', "2_2");
            setSelectedFloor("2_2")
        }
    }

    const mods1_1: Record<string, boolean> = {
        [cls.selected]: selectedFloor === "1_1",
        [cls.non_pointer]: selectedFloor === "1_1",
        [cls.unselected]: selectedFloor === "2_1" || selectedFloor === "2_2",
        [cls.pointer]: selectedFloor === "2_1" || selectedFloor === "2_2"
    };

    const mods2_1: Record<string, boolean> = {
        [cls.unselected]: selectedFloor === "1_1",
        [cls.pointer]: selectedFloor === "1_1",
        [cls.selected]: selectedFloor === "2_1" || selectedFloor === "2_2",
        [cls.non_pointer]: selectedFloor === "2_1" || selectedFloor === "2_2",
    };

    const modsLeftWing: Record<string, boolean> = {
        [cls.selected]: selectedFloor === "1_1" || selectedFloor === "2_1",
        [cls.non_pointer]: selectedFloor === "1_1" || selectedFloor === "2_1",
        [cls.unselected]: selectedFloor === "2_2",
        [cls.pointer]: selectedFloor === "2_2",
    };

    const mods2_2: Record<string, boolean> = {
        [cls.unselected]: selectedFloor === "1_1" || selectedFloor === "2_1",
        [cls.non_pointer]: selectedFloor === "1_1" || selectedFloor === "2_2",
        [cls.pointer]: selectedFloor === "2_1",
        [cls.selected]: selectedFloor === "2_2",
    };

    const phoneClickHandler = () => {
        setModalIsOpen(true);
    }

    const dictionaryClickHandler = () => {
        setModalIsOpen1(true);
    }


    const placesCounter = () => {
        let counter  = {"available": 0, "not_available": 0, "not_present": 0}
        if (selectedFloor === "1_1") {
            for (let i = 0; i < places.length; i++) {
                if (places[i].place_id > 106) {
                    if (places[i].is_available && places[i].place_id != 118 && places[i].place_id != 130) {
                        counter.available += 1
                    }
                    else if (!places[i].is_available && places[i].place_id != 118 && places[i].place_id != 130) {
                        counter.not_available += 1
                    }
                    else {
                        counter.not_present += 1
                    }
                }
            }
        }
        else if (selectedFloor === "2_1") {
            for (let i = 0; i < places.length; i++) {
                if (places[i].place_id < 51) {
                    if (places[i].is_available) {
                        counter.available += 1
                    }
                    else if (!places[i].is_available) {
                        counter.not_available += 1
                    }
                    else {
                        counter.not_present += 1
                    }
                }
            }
        }
        else {
            for (let i = 0; i < places.length; i++) {
                if (places[i].place_id > 54 && places[i].place_id < 105) {
                    if (places[i].is_available) {
                        counter.available += 1
                    }
                    else if (!places[i].is_available) {
                        counter.not_available += 1
                    }
                    else {
                        counter.not_present += 1
                    }
                }
            }
        }
        return counter
    }


    return (
        <div className={classNames(cls.ReservationContent, {}, [className])}>
            <div className={cls.buttons}>
                <div className={cls.floors}>
                    <div onClick={ChangeTo11} className={classNames(cls.button, mods1_1, [])}> 1 этаж</div>
                    <div onClick={ChangeTo21} className={classNames(cls.button, mods2_1, [])}> 2 этаж</div>
                </div>

                <div className={cls.wings}>
                    <div onClick={ChangeToLeftWing} className={classNames(cls.button, modsLeftWing, [])}> Левое крыло</div>
                    <div onClick={ChangeTo22} className={classNames(cls.button, mods2_2, [])}> Правое крыло</div>
                </div>
            </div>
            <Map title={selectedFloor ? selectedFloor : "1_1"}
                 places={places} setSelectedPoint={setSelectedPoint}
                 selectedPoint={selectedPoint}
                 setSelectedPlace={setSelectedPlace}
                 setSelectedLocker={setSelectedLocker}
                 dictionary={dictionary}/>
            <div className={cls.history}>
                <img src={green} alt={"green"}/>
                <a> Свободно ({placesCounter().available}) </a>
                <img src={red} alt={"red"}/>
                <a> Занято ({placesCounter().not_available})</a>
                <img src={gray} alt={"gray"}/>
                <a> Недоступно ({placesCounter().not_present}) </a>
                <img src={chair} alt={"chair"} className={cls.chair}/>
                <a> Всего мест - ({placesCounter().not_present + placesCounter().not_available + placesCounter().available}) </a>
            </div>
            <div className={cls.buttonSection}>
                <Button onClick={selectedPoint ? () => {
                    apiCall()
                    userFloor()
                } : () => {}} className={ classNames(cls.reservation, {}, [selectedPoint ? cls.selectedPoint : cls.non_selectedPoint])}>
                    Забронировать
                </Button>
                <Button onClick={() => navigate(RoutePath.phone_directory)} className={cls.reservation}>
                    Телефонный справочник
                </Button>
            </div>
            <DictionaryModal className={cls.Modal} isOpen={modalIsOpen1} onClose={() => {setModalIsOpen1(false);}} dictionary={checkPlaces(dictionary, places)}/>
        </div>
    );
})
ReservationContent.displayName = "ReservationContent";

export { ReservationContent }