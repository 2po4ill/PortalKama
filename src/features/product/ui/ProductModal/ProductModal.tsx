import {FC, memo} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from './ProductModal.module.scss';
import {Product} from "entities/Product";
import {Text} from "shared/ui/Text/Text";
import img from "shared/assets/placeholder-image.webp";

export interface IProductModalProps {
    product?: Product;
    onClose?: () => void;
    isOpen?: boolean;
}

export const ProductModal: FC<IProductModalProps> = memo((props) => {
    const { product, onClose, isOpen } = props;
    const {
        id,
        price,
        name,
        description,
        available,
        isService
    } = product;

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            className={classNames(cls.ProductModal, {}, [])}
            unmount={true}
        >
            <div className={cls.imageWrapper}>
                <picture>
                    <img src={img} alt={name}/>
                </picture>
            </div>
            <div className={cls.info}>
                <Text
                    title={name}
                    text={`ID: ${id}`}
                />
                <Text
                    text={description}
                />
            </div>
        </Modal>
    );
});