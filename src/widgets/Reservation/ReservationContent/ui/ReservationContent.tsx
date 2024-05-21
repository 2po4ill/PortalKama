import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./ReservationContent.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";

interface IReservationContentProps {
    className?: string;
}

const ReservationContent: FC<IReservationContentProps> = memo((props) => {
    const { className } = props;


    return (
        <div className={classNames(cls.ReservationContent, {}, [className])}>
            <div className={cls.listContainer}>
            </div>
        </div>
    );
})
ReservationContent.displayName = "PostsList";

export { ReservationContent }