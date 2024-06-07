import {FC, memo, useState} from "react";

import {classNames} from "shared/lib/classNames";
import cls from "./ReservationContent.module.scss";


import {Map} from "shared/ui/Map/Map";
import {IReservationItem} from "entities/Reservation/model/types/reservation";

interface IReservationContentProps {
    className?: string;
    places: IReservationItem[];
}

const ReservationContent: FC<IReservationContentProps> = memo((props) => {
    const { className,
    places} = props;

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
            <Map title={selectedFloor} places={places}/>
        </div>
    );
})
ReservationContent.displayName = "ReservationContent";

export { ReservationContent }