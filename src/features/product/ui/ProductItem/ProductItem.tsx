import {classNames} from "shared/lib/classNames";
import cls from './ProductItem.module.scss';
import {Product} from "entities/Product";
import {FC, memo, useCallback, useEffect, useState} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import {ProductModal} from "features/product/ui/ProductModal/ProductModal";

export interface IProductItemProps {
    className?: string;
    openProduct?: (product: Product) => void;
    product: Product;
}

export const ProductItem: FC<IProductItemProps> = memo((props) => {
    const { product, className, openProduct } = props;

    const productOpenHandler = useCallback(() => {
        openProduct(product)
    }, []);

    const {
        id,
        price,
        name,
        description,
        available,
        isService
    } = product;


    if (!available) {
        return null;
    }

    return (
        <>
        <article
            className={classNames(cls.ProductItem, {}, [className])}
            onClick={productOpenHandler}
        >
            <main className={cls.main}>
                <div className={cls.imageWrapper}>
                    <picture>
                        <img src={img} alt={name}/>
                    </picture>
                </div>
                <div className={cls.info}>
                    <Text
                        title={name}
                        titleMaxLength={33}
                        text={description}
                    />
                </div>
            </main>
            <footer className={cls.footer}>
                <Text
                    title={`${price} ₽`}
                />
                <Button>Добавить</Button>
            </footer>
        </article>
        </>
    );
});