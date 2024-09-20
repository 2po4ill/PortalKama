import {FC, memo, useState} from "react";

import {classNames} from "shared/lib/classNames";
import cls from "./ReservationContent.module.scss";


import {Map} from "shared/ui/Map/Map";
import {IReservationItem} from "entities/Reservation/model/types/reservation";
import {Button} from "shared/ui/Button/Button";

import green from "shared/assets/images/icon_Зеленый.png"
import red from "shared/assets/images/icon_Красный.png"
import gray from "shared/assets/images/icon_Серый.png"
import {PostModal} from "features/post/PostModal";
import {PhoneModal} from "features/reservation/ui/PhoneModal";

interface IReservationContentProps {
    className?: string;
    places: IReservationItem[];
    selectedPoint: number;
    setSelectedPoint: (number: number) => void;
    setSelectedPlace: (place: IReservationItem) => void;
    apiCall: () => void;
}

const ReservationContent: FC<IReservationContentProps> = memo((props) => {
    const { className,
    places,
    setSelectedPoint,
    selectedPoint,
    setSelectedPlace,
    apiCall} = props;

    const [selectedFloor, setSelectedFloor] = useState("306-2");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const ChangeTo306 = () => {
        setSelectedFloor("306-2")
    }
    const ChangeTo307 = () => {
            setSelectedFloor("307")
    }

    const mods306: Record<string, boolean> = {
        [cls.selected]: selectedFloor === "306-2",
        [cls.non_pointer]: selectedFloor === "306-2",
        [cls.unselected]: selectedFloor === "307",
        [cls.pointer]: selectedFloor === "307"
    };

    const mods307: Record<string, boolean> = {
        [cls.unselected]: selectedFloor === "306-2",
        [cls.pointer]: selectedFloor === "306-2",
        [cls.selected]: selectedFloor === "307",
        [cls.non_pointer]: selectedFloor === "307"
    };

    return (
        <div className={classNames(cls.ReservationContent, {}, [className])}>
            <div className={cls.buttons}>
                <div className={cls.floors}>
                    <div onClick={ChangeTo306} className={classNames(cls.button, mods306, [])}> АБК 306-2</div>
                    <div onClick={ChangeTo307} className={classNames(cls.button, mods307, [])}> АБК 307</div>
                </div>
            </div>
            <Map title={selectedFloor} places={places} setSelectedPoint={setSelectedPoint} selectedPoint={selectedPoint} setSelectedPlace={setSelectedPlace}/>
            <div className={cls.history}>
                <img src={green} alt={"green"}/>
                <a> Свободно </a>
                <img src={red} alt={"red"}/>
                <a> Занято </a>
                <img src={gray} alt={"gray"}/>
                <a> Недоступно </a>
            </div>
            <div className={cls.buttonSection}>
                <Button onClick={apiCall} className={cls.reservation}>
                    Забронировать
                </Button>
            </div>
        </div>
    );
})
ReservationContent.displayName = "ReservationContent";

export { ReservationContent }