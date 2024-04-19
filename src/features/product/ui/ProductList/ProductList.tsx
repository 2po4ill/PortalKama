import {FC, memo} from "react";
import cls from './ProductList.module.scss'
import {classNames} from "shared/lib/classNames";
import {ProductItem} from "../ProductItem/ProductItem";
import {Text} from "shared/ui/Text/Text";
import {ICartItem, IShopItem} from "entities/Product/model/types/product";
import {useLocation} from "react-router-dom";
import {Button} from "shared/ui/Button/Button";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {productActions} from "entities/Product";

export interface IProductListProps {
    className?: string;
    products: IShopItem[];
    cartData: ICartItem[];
    isLoading?: boolean;
    view?: string;
    productClickHandler?: (product: IShopItem) => void;
    cartClickHandler?: (cartItem: ICartItem) => void;
}

export const ProductList: FC<IProductListProps> = memo((props) => {
    const { products, productClickHandler } = props;
    const { cartData} = props;
    const dispatch = useAppDispatch();
    const location = useLocation()




    const renderProduct = (product: IShopItem, cartData: ICartItem[]) => {
        if (location.pathname == '/cart' && cartData != null) {
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i].item_id == product.item_id) {
                    return (
                        <ProductItem product={product} key={product.item_id} openProduct={productClickHandler}/>
                    )
                }
            }
        }
        else if (location.pathname == '/cart' && cartData == null){
            return null
        }
        else {
            return (
                <ProductItem product={product} key={product.item_id} openProduct={productClickHandler}/>
            )
        }
    }

    return (
        <div>
            <div className={classNames(cls.ProductList, {}, [])}>
                <Text title={location.pathname != '/cart' ? "Товары" : "Корзина"} className={cls.title}/>
                {
                    products.length > 0
                    ? products.map(product => renderProduct(product, cartData))
                    : <div>Список пуст</div>
                }

            </div>
            {
                location.pathname === '/cart' ?
                    <Button onClick={() => dispatch(productActions.dropCart())} className={cls.btn}> Очистить корзину </Button> : null
            }
        </div>
    );
});