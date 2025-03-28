import {classNames} from "shared/lib/classNames";
import cls from './OrderItem.module.scss';
import {FC, memo, useCallback, useState} from "react";
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
    let sum = 0

    const dayOfTheWeek = (date: Date) => {
        switch(date.getDay())
        {
            case 0:
                return "Воскресенье"
            case 1:
                return "Понедельник"
            case 2:
                return "Вторник"
            case 3:
                return "Среда"
            case 4:
                return "Четверг"
            case 5:
                return "Пятница"
            case 6:
                return "Суббота"
        }
    }

    const fullDate = (date: Date) => {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    }

    const dateFormat = (date:Date) => {
        return (
            dayOfTheWeek(date) + ", " + fullDate(date)
        )
    }


    const renderProduct = (item: ICartItem, products: IShopItem[]) => {
        const product = products.find(product => product.item_id === item.item_id)
        const photo_path = product?.photo_path
        const description = product?.description
        const name = product?.name
        const price = product?.price
        const quantity = item.quantity
        sum = price ? sum + (price * quantity) : sum
        return  <div className={cls.container}>
                    <main className={cls.main}>
                        <div className={cls.imageWrapper}>
                            <picture>
                                <img src={photo_path} alt={name}/>
                            </picture>
                        </div>
                        <div className={cls.info}>
                            <Text
                                title={name}
                                text={description}
                            />
                        </div>
                    </main>
                    <footer className={cls.footer}>
                        <Text
                            title={`${price ? price * quantity : 0} баллов`}
                        />
                        <Text title={`за ${quantity} шт.`}/>
                    </footer>
                </div>
    }
    return (
        <div
            className={classNames(cls.ProductItem, {}, [className])}
        >
            <label> Заказ оформлен {dateFormat(new Date(order.date))} </label>
            {order.items.map(item => renderProduct(item, products))}
            <label className={cls.Sum}> Cумма: {sum}</label>
        </div>
    );
});