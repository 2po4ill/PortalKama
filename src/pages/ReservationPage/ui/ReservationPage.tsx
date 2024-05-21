import {classNames} from "shared/lib/classNames";
import cls from './ReservationPage.module.scss'
import {InDevelopmentLoader} from "widgets/InDevelopmentLoader";
import {ReservationPageLayout} from "shared/layouts/ReservationPageLayout/ReservationPageLayout";
import {ReservationHeader} from "widgets/Reservation/ReservationHeader";
import {ReservationContent} from "widgets/Reservation/ReservationContent";
import {ReservationAside} from "widgets/Reservation/ReservationAside";

export interface IReservationPageProps {
    className?: string;
}

const ReservationPage = ( { className }: IReservationPageProps ) => {
    return (
        <div className={classNames(cls.ReservationPage, {}, [className])}>
            <ReservationPageLayout
                header={<ReservationHeader/>}
                content={<ReservationContent/>}
                aside={<ReservationAside/>}/>
        </div>
    );
};

export default ReservationPage;