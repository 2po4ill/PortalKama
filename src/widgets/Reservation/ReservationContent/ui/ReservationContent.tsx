import {FC, memo, useState} from "react";

import {classNames} from "shared/lib/classNames";
import cls from "./ReservationContent.module.scss";


import {Map} from "shared/ui/Map/Map";
import {IReservationItem} from "entities/Reservation/model/types/reservation";
import {Button} from "shared/ui/Button/Button";
import {productActions} from "entities/Product";
import {ICartItem} from "entities/Product/model/types/product";

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

    const [selectedFloor, setSelectedFloor] = useState("1_1");


    const ChangeTo11 = () => {
        setSelectedFloor("1_1")
    }
    const ChangeTo21 = () => {
        setSelectedFloor("2_1")
    }
    const ChangeTo22 = () => {
        setSelectedFloor("2_2")
    }


    return (
        <div className={classNames(cls.ReservationContent, {}, [className])}>
            <div className={cls.buttons}>
                <div onClick={ChangeTo11} className={cls.button}> 1-1 </div>
                <div onClick={ChangeTo21} className={cls.button}> 2-1 </div>
                <div onClick={ChangeTo22} className={cls.button}> 2-2 </div>
            </div>
            <Map title={selectedFloor} places={places} setSelectedPoint={setSelectedPoint} selectedPoint={selectedPoint} setSelectedPlace={setSelectedPlace}/>
            <Button onClick={apiCall}>
                Забронировать
            </Button>
        </div>
    );
})
ReservationContent.displayName = "ReservationContent";

export { ReservationContent }