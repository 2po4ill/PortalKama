import {classNames} from "shared/lib/classNames";
import cls from './UserBalancePage.module.scss';
import {productActions, productReducer, productSelectors} from "entities/Product";
import React, {ReactNode, useCallback, useEffect, useState} from "react";
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
import {CustomAlert} from "widgets/CustomAlert";

export interface IBalanceProps {
    className?: string;
}

const UserBalancePage = ({ className }: IBalanceProps ) => {
    const users = useSelector(productSelectors.getUserIds);
    const transactions = useSelector(productSelectors.getTransactionData);
    const isLoading = useSelector(productSelectors.getIsLoading);
    const error = useSelector(productSelectors.getError);
    const userData = useSelector(userSelectors.getUser);
    const dispatch = useAppDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [alert, setNewAlert] = useState<ReactNode>(null);

    const [newError, setNewError] = useState<string | undefined>(undefined);



    useEffect(() => {
        dispatch(productActions.thx_history());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productActions.getUserIds());
    }, [dispatch]);

    const modalCloseHandler = useCallback(() => {
        setModalIsOpen(false);
    }, [setModalIsOpen]);

    const alertHandler = (alert: ReactNode) => {
        setNewAlert(alert)
    }

    const alertRenderer = (error: string|undefined) => {
        setNewError(error)
        newError ?
            alertHandler(<CustomAlert title={"Ошибка"} message={newError} setNewAlert={setNewAlert} confirmText={"ОК"}/>) :
            alertHandler(<CustomAlert title={""} message={"Рахматики успешно подарены!"} setNewAlert={setNewAlert} confirmText={"ОК"}/>)
    }

    const presentApi = (user_id: number, amount: number) => {
        dispatch(productActions.transfer_thx({user_id: user_id, amount: amount}));
        setTimeout(() => {
            alertRenderer(error)
        }, 5000);}

    const makeApi = (user_id: number, event_id: number) => {
        dispatch(productActions.make_thx({user_id: user_id, event_id: event_id}));
        setNewError(error)
        newError ?
            alertHandler(<CustomAlert title={"Ошибка"} message={newError} setNewAlert={setNewAlert} confirmText={"ОК"}/>) :
        alertHandler(<CustomAlert title={"Рахматики успешно начислены!"} message={"Успешно"} setNewAlert={setNewAlert} confirmText={"ОК"}/>)
    }




    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.UserBalance, {}, [className])}>
                <div className={cls.Header}>
                </div>
                <label className={cls.title}> Баланс </label>
                <div>
                    {!isLoading ?
                        <EventWindow userData={userData}
                                     transactions={transactions} setModalIsOpen={setModalIsOpen}/>
                        : <PageLoader/>}
                </div>
            </div>
            {modalIsOpen ? <GiveAwayModal users={users} isOpen={modalIsOpen} onClose={modalCloseHandler} presentApi={presentApi} role={userData.role} makeApi={makeApi}/> : null}
            {alert}
        </AsyncReducerProvider>
    );
};

export default UserBalancePage;