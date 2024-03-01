import {FC, memo} from "react";
import cls from './ProductList.module.scss'
import {classNames} from "shared/lib/classNames";
import {ProductItem} from "../ProductItem/ProductItem";
import {Product} from "entities/Product";
import {Text} from "shared/ui/Text/Text";

export interface IProductListProps {
    className?: string;
    products: Product[];
    isLoading?: boolean;
    view?: string;
    productClickHandler?: (product: Product) => void;
}

export const ProductList: FC<IProductListProps> = memo((props) => {
    const { products, productClickHandler } = props;

    const renderProduct = (product: Product) => {
        return (
            <ProductItem product={product} key={product.id} openProduct={productClickHandler}/>
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