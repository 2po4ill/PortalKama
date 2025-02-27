import {classNames} from "shared/lib/classNames";
import cls from './OrderItem.module.scss';
import {FC, memo, useCallback} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import {ICartItem, IOrderItem, IShopItem} from "entities/Product/model/types/product";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {useLocation} from "react-router-dom";

export interface IProductItemProps {
    className?: string;
    products: IShopItem[];
    order: IOrderItem;
}

export const OrderItem: FC<IProductItemProps> = memo((props) => {
    const { products, order,className } = props;

    const renderProduct = (item: ICartItem, products: IShopItem[]) => {
        const product = products.find(product => product.item_id === item.item_id)
        const photo_path = product?.photo_path
        const description = product?.description
        const name = product?.name
        const price = product?.price
        return  <div>
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
                        <Text
                            title={`${price} баллов`}
                        />
                    </footer>
                </div>
    }
    return (
        <article
            className={classNames(cls.ProductItem, {}, [className])}
        >
            {order.items.map(item => renderProduct(item, products))}
        </article>
    );
});