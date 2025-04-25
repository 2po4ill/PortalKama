import {classNames} from "shared/lib/classNames";
import cls from './ProductItem.module.scss';
import {FC, memo, useCallback} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import {IShopItem} from "entities/Product/model/types/product";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {useLocation} from "react-router-dom";
import coin_icon from 'shared/assets/icons/coin_icon.png'

export interface IProductItemProps {
    className?: string;
    openProduct?: (product: IShopItem) => void;
    product: IShopItem;
}

export const ProductItem: FC<IProductItemProps> = memo((props) => {
    const { product, className, openProduct } = props;

    const productOpenHandler = useCallback(() => {
        openProduct?.(product);
    }, []);

    const location = useLocation()

    const {
        photo_path,
        price,
        name,
        description,
        is_available,
    } = product;


    if (!is_available) {
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
                        <img src={photo_path} alt={name}/>
                    </picture>
                </div>
                <div className={cls.info}>
                    <Text
                        title={name}
                        // titleMaxLength={33}
                        text={description}
                    />
                </div>
            </main>
            <footer className={cls.footer}>
                <div className={cls.pricevalue}>
                    <Text className={cls.price_text}
                        title={`${price}`}
                    />
                    <img src={coin_icon} alt={"Рахматиков"} className={cls.price_img}/>
                </div>
                {location.pathname != '/cart' ?
                <Button>Добавить</Button>
                    : null
                }
            </footer>
        </article>
        </>
    );
});