import {classNames} from "shared/lib/classNames";
import cls from './Shop.module.scss'
import {Counter} from "entities/Counter";
import {ProductList} from "features/product";
import {Product} from "entities/Product";
import {ProductModal} from "features/product/ui/ProductModal/ProductModal";
import {useCallback, useState} from "react";
import {Text} from "shared/ui/Text/Text";

export interface IShopProps {
    className?: string;
}

const Shop = ({ className }: IShopProps ) => {
    const [selectedProduct, setSelectedProduct] = useState<Product>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const productClickHandler = useCallback((product: Product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    }, [setSelectedProduct, setModalIsOpen]);

    const modalCloseHandler = useCallback(() => {
        setSelectedProduct(null);
        setModalIsOpen(false);
    }, [setSelectedProduct, setModalIsOpen]);

    const products = new Array(10).fill(0).map((e, i) => {
        return {
            id: `${i}`,
            name: "Lorem ipsum dolor sit amet, consectetur",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 10000000,
            isService: false,
            available: true
        } as Product
    })

    return (
        <div className={classNames(cls.Shop, {}, [className])}>
            <div>
                <ProductList products={products} productClickHandler={productClickHandler}/>
            </div>
            <ProductModal product={selectedProduct} isOpen={modalIsOpen} onClose={modalCloseHandler}/>
        </div>
    );
};

export default Shop;