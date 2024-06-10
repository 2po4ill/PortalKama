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
import {IReservationItem, IReservationMade} from "entities/Reservation/model/types/reservation";
import {productActions} from "entities/Product";
import {ICartItem} from "entities/Product/model/types/product";

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


    const place = places.find(x => Number(x.id) === selectedPoint)
    const [selectedDateStart, setSelectedDateStart] = useState(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
    const [selectedPlace, setSelectedPlace] = useState(place);
    const [selectedPoint, setSelectedPoint] = useState(Number(null));
    const reservationApiCall = () => {
        alert("Вы забронировали место")
        dispatch(reservationActions.reservation({place_id: selectedPoint, start: selectedDateStart, finish: selectedDateEnd} as IReservationMade));
    }
    return (
        <AsyncReducerProvider name={'reservation'} reducer={reservationReducer} destroy={false} >
            {!isLoading ?
                <div className={classNames(cls.ReservationPage, {}, [className])}>
                <ReservationPageLayout
                    header={<ReservationHeader setSelectedDateStart={setSelectedDateStart}
                                               selectedDateEnd={selectedDateEnd}
                                               setSelectedDateEnd={setSelectedDateEnd}
                                               selectedDateStart={selectedDateStart}/>}
                    content={<ReservationContent places={places}
                                                 setSelectedPoint={setSelectedPoint}
                                                 setSelectedPlace={setSelectedPlace}
                                                 selectedPoint={selectedPoint}
                                                 apiCall={reservationApiCall}/>}
                    aside={<ReservationAside place={selectedPlace}/>}/>
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default ReservationPage;