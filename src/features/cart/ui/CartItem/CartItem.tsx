import {classNames} from "shared/lib/classNames";
import cls from './CartItem.module.scss';
import {FC, memo, useCallback} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import bin from 'shared/assets/icons/Vector.png'
import {ICartItem, IShopItem} from "entities/Product/model/types/product";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {useLocation} from "react-router-dom";
import {Input} from "shared/ui/Input/Input";
import {Navbar} from "widgets/Navbar";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {productActions} from "entities/Product";

export interface ICartItemProps {
    className?: string;
    product: IShopItem;
    cartItem: ICartItem;
}

export const CartItem: FC<ICartItemProps> = memo((props) => {
    const { product, cartItem, className } = props;
    const dispatch = useAppDispatch();

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
        <div
            className={classNames(cls.ProductItem, {}, [className])}
        >
            <main className={cls.main}>
                <div className={cls.imageWrapper}>
                    <picture>
                        <img src={photo_path} alt={name}/>
                    </picture>
                </div>
            </main>
            <div className={cls.info}>
                <div className={cls.description}>
                    <Text
                        title={name}
                        // titleMaxLength={33}
                        text={description}
                    />
                </div>
                <footer className={cls.footer}>
                    <Text text={"шт."}/>
                    <Text
                        title={`${price}`}
                    />
                </footer>
            </div>
            <div className={cls.right_bar}>
                <Text text={"в наличии"}/>

                <div className={cls.buttons}>
                    <Button className={cls.btn} children={<img alt={"bin_image"} src={bin}/>} onClick={() => dispatch(productActions.dropCartItem(cartItem.in_cart_item_id))}></Button>
                    <Button className={classNames(cls.btn, {}, [cls.btn_increment])}> - </Button>
                    <Input value={cartItem.quantity.toString()} className={cls.Input}></Input>
                    <Button className={classNames(cls.btn, {}, [cls.btn_increment])}> + </Button>
                </div>
            </div>
        </div>
    );
});