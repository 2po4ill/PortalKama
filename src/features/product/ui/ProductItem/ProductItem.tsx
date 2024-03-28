import {classNames} from "shared/lib/classNames";
import cls from './ProductItem.module.scss';
import {FC, memo, useCallback} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import {IShopItem} from "entities/Product/model/types/product";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";

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
                        {
                            photo_path == "" ?
                                <img src={img} alt={name}/> :
                                <img src={imageSrc(photo_path)} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = img;
                                }} alt={name}/>
                        }
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
                <Text
                    title={`${price}`}
                />
                <Button>Добавить</Button>
            </footer>
        </article>
        </>
    );
});