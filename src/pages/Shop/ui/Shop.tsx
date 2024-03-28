import {classNames} from "shared/lib/classNames";
import cls from './Shop.module.scss'
import {Counter} from "entities/Counter";
import {ProductList} from "features/product";
import {Product, productActions, productReducer, productSelectors} from "entities/Product";
import {ProductModal} from "features/product/ui/ProductModal/ProductModal";
import {useCallback, useEffect, useState} from "react";
import {Text} from "shared/ui/Text/Text";
import {useSelector} from "react-redux";
import {IShopItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";

export interface IShopProps {
    className?: string;
}

const Shop = ({ className }: IShopProps ) => {
    const [selectedProduct, setSelectedProduct] = useState<IShopItem>();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const products = useSelector(productSelectors.getProductList);
    const isLoading = useSelector(productSelectors.getIsLoading);
    const dispatch = useAppDispatch();

    const productClickHandler = useCallback((product: IShopItem) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    }, [setSelectedProduct, setModalIsOpen]);

    const modalCloseHandler = useCallback(() => {
        setSelectedProduct(undefined);
        setModalIsOpen(false);
    }, [setSelectedProduct, setModalIsOpen]);

    useEffect(() => {
        dispatch(productActions.getProductList());
    }, [dispatch]);

    // const products = new Array(10).fill(0).map((e, i) => {
    //     return {
    //         id: `${i}`,
    //         name: "Lorem ipsum dolor sit amet, consectetur",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //         price: 10000000,
    //         isService: false,
    //         available: true
    //     } as Product
    // })

    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.Shop, {}, [className])}>
                <div>
                    { !isLoading ? <ProductList products={products} productClickHandler={productClickHandler}/> : <PageLoader /> }
                </div>
                <ProductModal product={selectedProduct} isOpen={modalIsOpen} onClose={modalCloseHandler}/>
            </div>
        </AsyncReducerProvider>
    );
};

export default Shop;