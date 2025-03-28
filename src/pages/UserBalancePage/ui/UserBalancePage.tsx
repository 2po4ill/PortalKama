import {classNames} from "shared/lib/classNames";
import cls from './UserBalancePage.module.scss';
import {productActions, productReducer, productSelectors} from "entities/Product";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Event, IOrderItem, IShopItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";
import {OrderItem} from "features/product/ui/OrderItem/OrderItem";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import {postActions} from "entities/Post/model/slice/postSlice";
import {Input} from "shared/ui/Input/Input";

export interface IBalanceProps {
    className?: string;
}

const UserBalancePage = ({ className }: IBalanceProps ) => {
    const events = useSelector(productSelectors.getUnclaimedEvents);
    const isLoading = useSelector(productSelectors.getIsLoading);
    const dispatch = useAppDispatch();

    const [amount, setAmount] = useState("0");


    useEffect(() => {
        dispatch(productActions.getUnclaimedEvents());
    }, [dispatch]);

    const takeEvent = (description: string, amount: number) => {
        dispatch(productActions.takeEvent({description: description, amount: amount}));
        alert(`Бонус получен: +${amount} баллов`)
        setTimeout(() => window.location.reload(), 50);
    }

    const renderEvent = (event: Event) => {
        return  <div className={cls.Event}>
                    <label className={cls.label}> {event.name} </label>
                    <label className={cls.Amouunt}> {event.amount} </label>
                    <Button onClick={() => takeEvent(event.name, event.amount)} className={cls.Btn}> Начислить</Button>
                </div>
    }

    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.UserBalance, {}, [className])}>
                <Text title={"Ваши события за баллы"} className={cls.title}/>
                <div>
                    { !isLoading ?
                        <div className={cls.EventList}>
                            {events ? events.map(event => renderEvent(event)) : "Вы забрали все события, зайдите позже"}
                            <div className={cls.Event}>
                                <label className={cls.label}> Начисление администратора </label>
                                <Input placeholder={"Введите количество баллов"} onChange={setAmount} className={cls.Amount}/>
                                <Button onClick={() => takeEvent("Начисление администратора", Number(amount))} className={cls.Btn}> Начислить </Button>
                            </div>
                        </div>
                        : <PageLoader/>}
                </div>
            </div>

        </AsyncReducerProvider>
    );
};

export default UserBalancePage;