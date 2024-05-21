import {FC, memo} from "react";
import cls from "./ReservationAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";
import {Input, InputTheme} from "shared/ui/Input/Input";
import Calendar from "shared/assets/icons/calendar.svg";
import ArrowDown from "shared/assets/icons/arrow-down-bold.svg"
import {Button, ButtonTheme} from "shared/ui/Button/Button";

interface IReservationAsideProps {
    className?: string;
}

const ReservationAside: FC<IReservationAsideProps> = memo(props => {
    const { className } = props;

    return (
        <div className={classNames(cls.ReservationAside, {}, [className])}>
            <div className={cls.content}>


                </div>

            </div>
    );
});
ReservationAside.displayName = "PostsAside";

export {ReservationAside}