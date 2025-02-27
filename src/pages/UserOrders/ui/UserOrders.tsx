import {classNames} from "shared/lib/classNames";
import cls from './UserOrders.module.scss';
import {productActions, productReducer, productSelectors} from "entities/Product";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {IOrderItem, IShopItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";
import {OrderItem} from "features/product/ui/OrderItem/OrderItem";

export interface ICartProps {
    className?: string;
}

const UserOrders = ({ className }: ICartProps ) => {
    const products = useSelector(productSelectors.getProductList);
    const orders = useSelector(productSelectors.getUserOrders)
    const isLoading = useSelector(productSelectors.getIsLoading);
    const dispatch = useAppDispatch();


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
                <div>
                    { !isLoading ?
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