import {FC, memo} from "react";
import cls from './ProductList.module.scss'
import {classNames} from "shared/lib/classNames";
import {ProductItem} from "../ProductItem/ProductItem";
import {Text} from "shared/ui/Text/Text";
import {IShopItem} from "entities/Product/model/types/product";

export interface IProductListProps {
    className?: string;
    products: IShopItem[];
    isLoading?: boolean;
    view?: string;
    productClickHandler?: (product: IShopItem) => void;
}

export const ProductList: FC<IProductListProps> = memo((props) => {
    const { products, productClickHandler } = props;

    const renderProduct = (product: IShopItem) => {
        return (
            <ProductItem product={product} key={product.item_id} openProduct={productClickHandler}/>
        )
    }

    return (
        <div className={classNames(cls.ProductList, {}, [])}>
            <Text title={"Товары"} className={cls.title}/>
            {
                products.length > 0
                ? products.map(product => renderProduct(product))
                : <div>Список пуст</div>
            }
        </div>
    );
});