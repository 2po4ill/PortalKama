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
import {Text} from "shared/ui/Text/Text";

export interface IOrderProps {
    className?: string;
}

const UserOrders = ({ className }: IOrderProps ) => {
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
                <Text title={"Ваши заказы"} className={cls.title}/>
                <div>
                    { !isLoading ?
                        <div className={cls.OrderList}>
                            {orders.map(order => renderOrder(order, products))}
                            {renderOrder({cart_id: 1, items: [{in_cart_item_id: 1,item_id:3,quantity:4},{in_cart_item_id: 1,item_id:1,quantity:4}]} as IOrderItem, products)}
                        </div>
                        : <PageLoader/>}
                </div>
            </div>

        </AsyncReducerProvider>
    );
};

export default UserOrders;