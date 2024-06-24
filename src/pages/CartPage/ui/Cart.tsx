import {classNames} from "shared/lib/classNames";
import cls from './Cart.module.scss';
import {ProductList} from "features/product";
import {productActions, productReducer, productSelectors} from "entities/Product";
import {ProductModal} from "features/product/ui/ProductModal/ProductModal";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IShopItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {PageLoader} from "widgets/PageLoader";
import {CartList} from "features/cart";
import {Button} from "shared/ui/Button/Button";
import {Text} from "shared/ui/Text/Text";

export interface ICartProps {
    className?: string;
}

const Cart = ({ className }: ICartProps ) => {
    const products = useSelector(productSelectors.getProductList);
    const cartData = useSelector(productSelectors.getCartData)
    const isLoading = useSelector(productSelectors.getIsLoading);
    const price = useSelector(productSelectors.getCartPrice)
    const quantity = useSelector(productSelectors.getCartQuantity)
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(productActions.getProductList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productActions.getCartData());
    }, [dispatch]);

    return (
        <AsyncReducerProvider name={'product'} reducer={productReducer} destroy={false} >
            <div className={classNames(cls.CartPage, {}, [className])}>
                <div>
                    { !isLoading ?
                        <div className={cls.Cart}>
                            <CartList products={products} cartData={cartData}/>
                            <div className={cls.CartFunctions}>
                                <div className={cls.Buttons}>
                                    <article> Выбрать все </article>
                                    <article className={cls.btn_underline}> Убрать выбранное </article>
                                    <article onClick={() => dispatch(productActions.dropCart())}
                                          className={cls.btn_underline}> Убрать все </article>
                                </div>
                                <div className={cls.Order}>
                                    <article> Выбрано товаров:
                                        <span className={cls.blue}> {quantity.toString()} </span>
                                    </article>
                                    <article> На сумму:</article>
                                    <article className={cls.blue}> {price.toString()} </article>
                                    <Button onClick={() => {
                                        dispatch(productActions.dropCart())
                                        alert("Заказ оформлен. Ожидайте")
                                    }} className={cls.btn}> Оформить </Button>
                                </div>
                            </div>
                        </div>
                        : <PageLoader/>}
                </div>
            </div>
        </AsyncReducerProvider>
    );
};

export default Cart;