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
import {useEffect, useState} from "react";
import {reservationActions, reservationReducer} from "entities/Reservation/model/slice/reservationSlice";
import { AsyncReducerProvider } from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";

export interface IReservationPageProps {
    className?: string;
}

const ReservationPage = ( { className }: IReservationPageProps ) => {
    const places = useSelector(reservationSelectors.getReservationList);
    const lockers = useSelector(reservationSelectors.getReservationLockerList);
    const isLoading = useSelector(reservationSelectors.getIsLoading);
    const error = useSelector(reservationSelectors.getError)
    const [selectedDateStart, setSelectedDateStart] = useState(new Date());

    const dateEnd = new Date()
    dateEnd.setHours(new Date().getHours() + 1)

    const [selectedDateEnd, setSelectedDateEnd] = useState(dateEnd);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(reservationActions.getReservationList({start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
    }, [dispatch]);
    useEffect(() => {
        dispatch(reservationActions.getReservationLockerList({start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
    }, [dispatch]);


    const place = places.find(x => x.place_id === selectedPoint)
    const locker = lockers.find(x => x.locker_id === selectedPoint)

    const [selectedPlace, setSelectedPlace] = useState(place);
    const [selectedLocker, setSelectedLocker] = useState(locker);
    const [selectedPoint, setSelectedPoint] = useState(Number(null));

    const filterApiCall = () => {
        dispatch(reservationActions.getReservationList({start: Number(selectedDateStart), finish: selectedDateStart > selectedDateEnd ? Number(selectedDateStart) : Number(selectedDateEnd)}));
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
        dispatch(reservationActions.reservation({place_id: selectedPoint, start: Number(selectedDateStart), finish: selectedDateStart > selectedDateEnd ? Number(selectedDateStart) : Number(selectedDateEnd)}));
        error ? alert("Место не удалось забронировать, попробуйте позже") : alert("Вы забронировали место")
        setTimeout(() => dispatch(reservationActions.getReservationList({start: Number(selectedDateStart), finish: selectedDateStart > selectedDateEnd ? Number(selectedDateStart) : Number(selectedDateEnd)})), 50);
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
                    content={<ReservationContent places={places}
                                                 setSelectedPoint={setSelectedPoint}
                                                 setSelectedPlace={setSelectedPlace}
                                                 setSelectedLocker={setSelectedLocker}
                                                 selectedDate={selectedDateStart}
                                                 selectedPoint={selectedPoint}
                                                 apiCall={reservationApiCall}/>}
                    aside={<ReservationAside place={selectedPlace}/>}/>
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default ReservationPage;