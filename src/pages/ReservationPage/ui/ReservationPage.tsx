import {classNames} from "shared/lib/classNames";
import cls from './ReservationPage.module.scss'
import {ReservationPageLayout} from "shared/layouts/ReservationPageLayout/ReservationPageLayout";
import {ReservationHeader} from "widgets/Reservation/ReservationHeader";
import {ReservationContent} from "widgets/Reservation/ReservationContent";
import {ReservationAside} from "widgets/Reservation/ReservationAside";
import {useSelector} from "react-redux";
import {reservationSelectors} from "entities/Reservation/model/selectors/reservationSelectors";
import {PageLoader} from "widgets/PageLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useEffect} from "react";
import {reservationActions, reservationReducer} from "entities/Reservation/model/slice/reservationSlice";
import { AsyncReducerProvider } from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";

export interface IReservationPageProps {
    className?: string;
}

const ReservationPage = ( { className }: IReservationPageProps ) => {
    const places = useSelector(reservationSelectors.getReservationList);
    const isLoading = useSelector(reservationSelectors.getIsLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(reservationActions.getReservationList());
    }, [dispatch]);

    return (
        <AsyncReducerProvider name={'reservation'} reducer={reservationReducer} destroy={false} >
            <div className={classNames(cls.ReservationPage, {}, [className])}>
                <ReservationPageLayout
                    header={<ReservationHeader/>}
                    content={!isLoading ? <ReservationContent places={places}/> : <PageLoader/>}
                    aside={<ReservationAside/>}/>
            </div>
        </AsyncReducerProvider>
    );
};

export default ReservationPage;