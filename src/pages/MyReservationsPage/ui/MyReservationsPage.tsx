import {classNames} from "shared/lib/classNames";
import cls from './MyReservationsPage.module.scss'
import {useSelector} from "react-redux";
import {reservationSelectors} from "entities/Reservation/model/selectors/reservationSelectors";
import {PageLoader} from "widgets/PageLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useEffect} from "react";
import {reservationActions, reservationReducer} from "entities/Reservation/model/slice/reservationSlice";
import { AsyncReducerProvider } from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {ReservationList} from "features/reservation/ui/ReservationList/ReservationList";


export interface IReservationPageProps {
    className?: string;
}

const MyReservationsPage = ({ className }: IReservationPageProps ) => {
    const reservations = useSelector(reservationSelectors.getUserReservations);
    const isLoading = useSelector(reservationSelectors.getIsLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(reservationActions.getUserReservations());
    }, [dispatch]);

    return (
        <AsyncReducerProvider name={'reservation'} reducer={reservationReducer} destroy={false} >
            {!isLoading ?
                <div className={classNames(cls.myReservationPage, {}, [className])}>
                    <ReservationList reservations={reservations}/>
                </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default MyReservationsPage;