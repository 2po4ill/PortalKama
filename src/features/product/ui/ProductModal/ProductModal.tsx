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
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {useLocation} from "react-router-dom";
import {Counter} from "entities/Counter";
import {useSelector} from "react-redux";
import {getCounterValue} from "entities/Counter/model/selectors/getCounterValue";

export interface IProductModalProps extends IModalProps {
    product?: IShopItem;
}

export const ProductModal: FC<IProductModalProps> = memo((props) => {
    const { product, ...other } = props;
    const dispatch = useAppDispatch();
    const location = useLocation()
    const counterValue = useSelector(getCounterValue)

    return (
        <Modal
            className={classNames(cls.ProductModal, {}, [])}
            {...other}
        >
            {product &&
                <>
                    <div className={cls.imageWrapper}>
                        <picture>
                            <img src={product.photo_path} alt={product.name}/>
                        </picture>
                    </div>
                    <div className={cls.info}>
                        <Text
                            title={imageSrc(product.name)}
                            text={`Артикул: ${product.item_id}`}/>
                        <Text
                            text={product.description}/>

                        {location.pathname != '/cart' ?
                            <div>
                                <Counter></Counter>
                                <Button onClick={
                                    () => {
                                        dispatch(productActions.addCartItem({item_id: Number(product.item_id), quantity: counterValue} as ICartItem))
                                    }}>
                                    Добавить в корзину
                                </Button>
                            </div>: null
                        }
                    </div>
                </>
            }
        </Modal>
    );
});