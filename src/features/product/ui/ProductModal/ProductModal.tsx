import {FC, memo, useEffect} from "react";
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from './ProductModal.module.scss';
import {Text} from "shared/ui/Text/Text";
import img from "shared/assets/placeholder-image.webp";
import {Button} from "shared/ui/Button/Button";
import {IShopItem, ICartItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {productActions} from "entities/Product";

export interface IProductModalProps extends IModalProps {
    product?: IShopItem;
}

export const ProductModal: FC<IProductModalProps> = memo((props) => {
    const { product, ...other } = props;
    const dispatch = useAppDispatch();
    return (
        <Modal
            className={classNames(cls.ProductModal, {}, [])}
            {...other}
        >
            {product &&
                <>
                    <div className={cls.imageWrapper}>
                        <picture>
                            <img src={img} alt={product.name}/>
                        </picture>
                    </div>
                    <div className={cls.info}>
                        <Text
                            title={product.name}
                            text={`ID: ${product.item_id}`}/>
                        <Text
                            text={product.description}/>
                        <Button onClick={() => dispatch(productActions.addCartItem({cart_item_id: 3, item_id: Number(product.item_id), quantity: 4} as ICartItem))}>
                            Добавить в корзину
                        </Button>
                    </div>
                </>
            }
        </Modal>
    );
});