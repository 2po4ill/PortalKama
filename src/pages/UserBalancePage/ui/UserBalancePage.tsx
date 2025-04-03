import {classNames} from "shared/lib/classNames";
import cls from './UserBalancePage.module.scss';
import {productActions, productReducer, productSelectors} from "entities/Product";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";
import {Text} from "shared/ui/Text/Text";
import {EventList} from "features/product/ui/EventList/EventList";
import {fullDate} from "shared/lib/FormatDate/FormatDate";
import {userSelectors} from "entities/User";
import coin_icon from "shared/assets/icons/coin_icon.png";

export interface IBalanceProps {
    className?: string;
}

const UserBalancePage = ({ className }: IBalanceProps ) => {
    const events = useSelector(productSelectors.getUnclaimedEvents);
    const isLoading = useSelector(productSelectors.getIsLoading);
    const userData = useSelector(userSelectors.getUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getUnclaimedEvents());
    }, [dispatch]);


    const takeEvent = (description: string, amount: number) => {
        dispatch(productActions.takeEvent({description: description, amount: amount}));
        alert(`Бонус получен: +${amount} баллов`)
        setTimeout(() => window.location.reload(), 50);
    }


    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.UserBalance, {}, [className])}>
                <div className={cls.Header}>

                </div>
                <label className={cls.title}> Баланс </label>
                <div>
                    { !isLoading ?
                        <div className={cls.EventWindow}>
                            <div className={cls.Data}>
                                <div className={cls.Cluster_string}>
                                    <label className={cls.title_string}> Дата: </label>
                                    <label className={cls.number}> {fullDate(new Date())} </label>
                                </div>
                                <div className={cls.Cluster_string}>
                                    <label className={cls.title_string}> Сумма начислений: </label>
                                    <label className={cls.number}> {userData.balance} </label>
                                    <img src={coin_icon} alt={"Рахматик"} className={cls.coin_img}/>
                                </div>
                                <div className={cls.Cluster_string}>
                                    <label className={cls.title_string}> Доступно для передачи коллегам: </label>
                                    <label className={cls.number}> {0} </label>
                                    <img src={coin_icon} alt={"Рахматик"} className={cls.coin_img}/>
                                </div>
                            </div>
                            <EventList events={events} takeEventAPI={takeEvent}/>
                        </div>
                        : <PageLoader/>}
                </div>
            </div>

        </AsyncReducerProvider>
    );
};

export default UserBalancePage;