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
import {errorFormat} from "shared/lib/FormatResponse/FormatResponce";

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

    const [showAlert, setShowAlert] = useState(false);



    useEffect(() => {
        dispatch(productActions.thx_history());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productActions.getUserIds());
    }, [dispatch]);

    const modalCloseHandler = useCallback(() => {
        setModalIsOpen(false);
    }, [setModalIsOpen]);


    const alertRenderer = (error: string|undefined) => {
        if (error) {
            console.log(error)
            return <CustomAlert title={"Ошибка"} message={errorFormat(error)} confirmText={"ОК"} setShowAlert={setShowAlert}/>
        }
        else {
            return <CustomAlert title={""} message={"Рахматики успешно подарены!"} confirmText={"ОК"} setShowAlert={setShowAlert}/>
        }
    }

    const presentApi = (user_id: number, amount: number) => {
        dispatch(productActions.transfer_thx({user_id: user_id, amount: amount}));
        setShowAlert(true)
    }

    const makeApi = (user_id: number, event_id: number) => {
        dispatch(productActions.make_thx({user_id: user_id, event_id: event_id}));
        setShowAlert(true)
    }

    const loadAlert = () => {
        return <CustomAlert title={"Подождите"} message={"идет загрузка"} isLoading={isLoading} setShowAlert={setShowAlert}/>
    }

    const alertModal = () => {
        if (showAlert) {
            if (!isLoading) {
                return alertRenderer(error)
            }
            else {
                return loadAlert()
            }
        }
        else {
            return null
        }
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
            {alertModal()}
        </AsyncReducerProvider>
    );
};

export default UserBalancePage;