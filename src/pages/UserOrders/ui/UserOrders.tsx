import {classNames} from "shared/lib/classNames";
import cls from './UserOrders.module.scss';
import {productActions, productReducer, productSelectors} from "entities/Product";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IOrderItem, IShopItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";
import {OrderItem} from "features/product/ui/OrderItem/OrderItem";
import {Text} from "shared/ui/Text/Text";

export interface IOrderProps {
    className?: string;
}

const UserOrders = ({ className }: IOrderProps ) => {
    const products = useSelector(productSelectors.getProductList);
    const orders = useSelector(productSelectors.getUserOrders)
    const isLoading = useSelector(productSelectors.getIsLoading);
    const dispatch = useAppDispatch();
    const [selectedState, setSelectedState] = useState("actual");
    const ChangeToActual = () => {
        setSelectedState("actual")
    }

    const ChangeToEnded = () => {
        setSelectedState("ended")
    }

    const modsActual: Record<string, boolean> = {
        [cls.selected]: selectedState === "actual",
        [cls.non_pointer]: selectedState === "actual",
        [cls.unselected]: selectedState === "ended",
        [cls.pointer]: selectedState === "ended"
    };

    const modsEnded: Record<string, boolean> = {
        [cls.selected]: selectedState === "ended",
        [cls.non_pointer]: selectedState === "ended",
        [cls.unselected]: selectedState === "actual",
        [cls.pointer]: selectedState === "actual"
    };


    useEffect(() => {
        dispatch(productActions.getProductList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productActions.getUserOrders());
    }, [dispatch]);

    const renderOrder = (order: IOrderItem, products: IShopItem[]) => {
        return <OrderItem products={products} order={order}/>
    }

    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.UserOrders, {}, [className])}>
                <Text title={"Ваши заказы"} className={cls.title}/>
                <div className={cls.BtnHandler}>
                    <div onClick={ChangeToActual} className={classNames(cls.button, modsActual, [])}> Актуальные </div>
                    <div onClick={ChangeToEnded} className={classNames(cls.button, modsEnded, [])}> Завершенные </div>
                </div>
                <div>
                    {!isLoading ?
                        <div className={cls.OrderList}>
                            {orders.map(order => renderOrder(order, products))}
                        </div>
                        : <PageLoader/>}
                </div>
            </div>

        </AsyncReducerProvider>
    );
};

export default UserOrders;