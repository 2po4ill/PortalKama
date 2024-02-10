import {FC, memo} from "react";
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from './ProductModal.module.scss';
import {Product} from "entities/Product";
import {Text} from "shared/ui/Text/Text";
import img from "shared/assets/placeholder-image.webp";
import {Button} from "shared/ui/Button/Button";

export interface IProductModalProps extends IModalProps {
    product?: Product;
}

export const ProductModal: FC<IProductModalProps> = memo((props) => {
    const { product, ...other } = props;

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
                            text={`ID: ${product.id}`}/>
                        <Text
                            text={product.description}/>
                        <Button>
                            Добавить в карзину
                        </Button>
                    </div>
                </>
            }
        </Modal>
    );
});