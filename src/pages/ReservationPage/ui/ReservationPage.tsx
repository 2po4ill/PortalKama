import {classNames} from "shared/lib/classNames";
import cls from './ReservationPage.module.scss'
import {InDevelopmentLoader} from "widgets/InDevelopmentLoader";

export interface IReservationPageProps {
    className?: string;
}

const ReservationPage = ( { className }: IReservationPageProps ) => {
    return (
        <div className={classNames(cls.ReservationPage, {}, [className])}>
            <InDevelopmentLoader/>
        </div>
    );
};

export default ReservationPage;