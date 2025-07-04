import {classNames} from "shared/lib/classNames";
import cls from './ReservationLockerPage.module.scss'
import {ReservationPageLayout} from "shared/layouts/ReservationPageLayout/ReservationPageLayout";
import {ReservationHeader} from "widgets/ReservationLocker/ReservationHeader";
import {ReservationContent} from "widgets/ReservationLocker/ReservationContent";
import {ReservationAside} from "widgets/ReservationLocker/ReservationAside";
import {useSelector} from "react-redux";
import {reservationSelectors} from "entities/Reservation/model/selectors/reservationSelectors";
import {PageLoader} from "widgets/PageLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {reservationActions, reservationReducer} from "entities/Reservation/model/slice/reservationSlice";
import { AsyncReducerProvider } from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {IReservationMade} from "entities/Reservation/model/types/reservation";

export interface IReservationLockerPageProps {
    className?: string;
}

const ReservationLockerPage = ({ className }: IReservationLockerPageProps ) => {
    const lockers = useSelector(reservationSelectors.getReservationLockerList);
    const places = useSelector(reservationSelectors.getReservationList);
    const isLoading = useSelector(reservationSelectors.getIsLoading);
    const [selectedDateStart, setSelectedDateStart] = useState(new Date());

    const dateEnd = new Date()
    dateEnd.setHours(new Date().getHours() + 1)

    const [selectedDateEnd, setSelectedDateEnd] = useState(dateEnd);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(reservationActions.getReservationLockerList({start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
    }, [dispatch]);
    useEffect(() => {
        dispatch(reservationActions.getReservationList({start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
    }, [dispatch]);


    const locker = lockers.find(x => x.locker_id === selectedPoint)
    const place = places.find(x => x.place_id === 1)

    const [selectedPlace, setSelectedPlace] = useState(place);
    const [selectedLocker, setSelectedLocker] = useState(locker);
    const [selectedPoint, setSelectedPoint] = useState(Number(null));

    const filterApiCall = () => {
        dispatch(reservationActions.getReservationLockerList({start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
    }

    const apiDate = (date: Date) => {
        return new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: undefined
        }).format(date);
    }

    const reservationApiCall = () => {
        alert("Вы забронировали место")
        dispatch(reservationActions.locker_reservation({place_id: selectedPoint, start: apiDate(selectedDateStart), finish: apiDate(selectedDateEnd)} as IReservationMade));
        dispatch(reservationActions.getReservationLockerList({start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
    }
    return (
        <AsyncReducerProvider name={'reservation'} reducer={reservationReducer} destroy={false} >
            {!isLoading ?
                <div className={classNames(cls.ReservationPage, {}, [className])}>
                <ReservationPageLayout
                    header={<ReservationHeader setSelectedDateStart={setSelectedDateStart}
                                               selectedDateEnd={selectedDateEnd}
                                               setSelectedDateEnd={setSelectedDateEnd}
                                               selectedDateStart={selectedDateStart}
                                                apiCall={filterApiCall}/>}
                    content={<ReservationContent places={lockers}
                                                 setSelectedPoint={setSelectedPoint}
                                                 setSelectedPlace={setSelectedPlace}
                                                 setSelectedLocker={setSelectedLocker}
                                                 selectedPoint={selectedPoint}
                                                 apiCall={reservationApiCall}/>}
                    aside={<ReservationAside place={selectedPlace}/>}/>
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default ReservationLockerPage;