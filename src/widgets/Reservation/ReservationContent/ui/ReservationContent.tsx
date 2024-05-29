import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./ReservationContent.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";
import {Map} from "shared/ui/Map/Map";
import {Point} from "shared/ui/Point/Point";

interface IReservationContentProps {
    className?: string;
}

const ReservationContent: FC<IReservationContentProps> = memo((props) => {
    const { className } = props;


    return (
        <div className={classNames(cls.ReservationContent, {}, [className])}>
        <Map image={}/>
            <Point status={} x={} y={} params={}/>
        </div>
    );
})
ReservationContent.displayName = "ReservationContent";

export { ReservationContent }