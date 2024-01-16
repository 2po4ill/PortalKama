import {classNames} from "shared/lib/classNames";
import cls from './ReservationPage.module.scss'

export interface IReservationPageProps {
    className?: string;
}

const ReservationPage = ( { className }: IReservationPageProps ) => {
    return (
        <div className={classNames(cls.ReservationPage, {}, [className])}>
            {"ReservationPage"}
        </div>
    );
};

export default ReservationPage;