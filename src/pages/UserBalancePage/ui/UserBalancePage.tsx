import {classNames} from "shared/lib/classNames";
import cls from './UserBalancePage.module.scss';
import {productActions, productReducer, productSelectors} from "entities/Product";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";
import {EventList} from "features/product/ui/EventList/EventList";
import {fullDate} from "shared/lib/FormatDate/FormatDate";
import {userSelectors} from "entities/User";
import coin_icon from "shared/assets/icons/coin_icon.png";
import {EventWindow} from "features/product/ui/EventWindow/EventWindow";
import {ProductModal} from "features/product/ui/ProductModal/ProductModal";
import {GiveAwayModal} from "features/product/ui/GiveAwayModal/GiveAwayModal";

export interface IBalanceProps {
    className?: string;
}

const UserBalancePage = ({ className }: IBalanceProps ) => {
    const users = useSelector(productSelectors.getUserIds);
    const events = useSelector(productSelectors.getUnclaimedEvents);
    const transactions = useSelector(productSelectors.getTransactionData);
    const isLoading = useSelector(productSelectors.getIsLoading);
    const userData = useSelector(userSelectors.getUser);
    const dispatch = useAppDispatch();

    const [selectedState, setSelectedState] = useState("events");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const ChangeToEvents = () => {
        setSelectedState("events")
    }

    const ChangeToHistory = () => {
        setSelectedState("history")
    }

    useEffect(() => {
        dispatch(productActions.getUnclaimedEvents());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productActions.thx_history());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productActions.getUserIds());
    }, [dispatch]);

    const modalCloseHandler = useCallback(() => {
        setModalIsOpen(false);
    }, [setModalIsOpen]);


    const takeEvent = (description: string, amount: number) => {
        dispatch(productActions.takeEvent({description: description, amount: amount}));
        alert(`Бонус получен: +${amount} баллов`)
        setTimeout(() => window.location.reload(), 50);
    }

    const presentApi = (user_id: number, amount: number) => {
        dispatch(productActions.transfer_thx({user_id: user_id, amount: amount}));
        alert(`Вы подарили ${amount} баллов`)
        setTimeout(() => window.location.reload(), 50);
    }

    const makeApi = (user_id: number, description: string, amount: number) => {
        dispatch(productActions.make_thx({user_id: user_id, description: description, amount: amount}));
        alert(`Вы начислили ${amount} баллов`)
        setTimeout(() => window.location.reload(), 50);
    }

    const modsEvent: Record<string, boolean> = {
        [cls.selected]: selectedState === "events",
        [cls.non_pointer]: selectedState === "events",
        [cls.unselected]: selectedState === "history",
        [cls.pointer]: selectedState === "history"
    };

    const modsHistory: Record<string, boolean> = {
        [cls.selected]: selectedState === "history",
        [cls.non_pointer]: selectedState === "history",
        [cls.unselected]: selectedState === "events",
        [cls.pointer]: selectedState === "events"
    };




    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.UserBalance, {}, [className])}>
                <div className={cls.Header}>
                </div>
                <label className={cls.title}> Баланс </label>
                <div className={cls.MenuSelector}>
                    <div onClick={ChangeToEvents} className={classNames(cls.button, modsEvent, [])}> Начисления </div>
                    <div onClick={ChangeToHistory} className={classNames(cls.button, modsHistory, [])}> Копилка </div>
                </div>
                <div>
                    {!isLoading ?
                        <EventWindow events={events}
                                     takeEvent={takeEvent}
                                     userData={userData}
                                     selectedState={selectedState}
                                     transactions={transactions} setModalIsOpen={setModalIsOpen}/>
                        : <PageLoader/>}
                </div>
            </div>
            <GiveAwayModal users={users} isOpen={modalIsOpen} onClose={modalCloseHandler} presentApi={presentApi} role={userData.role} makeApi={makeApi}/>

        </AsyncReducerProvider>
    );
};

export default UserBalancePage;