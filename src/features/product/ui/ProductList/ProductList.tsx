import {FC, memo} from "react";
import cls from './ProductList.module.scss'
import {classNames} from "shared/lib/classNames";
import {ProductItem} from "../ProductItem/ProductItem";
import {Product} from "entities/Product";

export interface IProductListProps {
    className?: string;
    products: Product[];
    isLoading?: boolean;
    view?: string;
}

export const ProductList: FC<IProductListProps> = memo((props) => {
    const { products } = props;

    const renderProduct = (product: Product) => {
        return (
            <ProductItem product={product} key={product.id} />
        )
    }

    return (
        <div className={classNames(cls.ProductList, {}, [])}>
            <h3 className={cls.title}>Товары</h3>
            {
                products.length > 0
                ? products.map(product => renderProduct(product))
                : <div>Список пуст</div>
            }
        </div>
    );
});