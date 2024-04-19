import {FC, memo} from "react";
import cls from './CartList.module.scss'
import {classNames} from "shared/lib/classNames";
import {CartItem} from "features/cart/ui/CartItem/CartItem";
import {Text} from "shared/ui/Text/Text";
import {ICartItem, IShopItem} from "entities/Product/model/types/product";
import {useLocation} from "react-router-dom";
import {Button} from "shared/ui/Button/Button";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {productActions} from "entities/Product";

export interface ICartListProps {
    className?: string;
    products: IShopItem[];
    cartData: ICartItem[];
    isLoading?: boolean;
    view?: string;
    productClickHandler?: (product: IShopItem) => void;
    cartClickHandler?: (cartItem: ICartItem) => void;
}

export const CartList: FC<ICartListProps> = memo((props) => {
    const { products, cartData } = props;
    const dispatch = useAppDispatch();
    const location = useLocation()





    const renderCartItem = (product: IShopItem, cartData: ICartItem[]) => {
        if (cartData != null) {
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i].item_id == product.item_id) {
                    return (
                        <CartItem product={product} key={product.item_id} cartItem={cartData[i]}/>
                    )
                }
            }
        }
        return null
    }

    return (
        <div>
            <div className={classNames(cls.ProductList, {}, [])}>
                <Text title={"Корзина"} className={cls.title}/>
                {
                    products.length > 0 && cartData.length > 0
                    ? products.map(product => renderCartItem(product, cartData))
                    : <div>Список пуст</div>
                }

            </div>
        </div>
    );
});