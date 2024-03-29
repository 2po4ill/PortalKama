import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {ICartItem, IShopItem, ProductSchema} from "../types/product";

const defaultProductData: ProductSchema = {
    products: [],
    cartitems: [],
    error: undefined,
    isLoading: false
}

const getProductData = (state: StateSchema) => state.product || defaultProductData;

interface IProductSelectors {
    getProductData: Selector<StateSchema, ProductSchema>;
    getProductList: Selector<StateSchema, IShopItem[]>;
    getIsLoading: Selector<StateSchema, boolean>
    getCartData: Selector<StateSchema, ICartItem[]>;
}

export const productSelectors: IProductSelectors = {
    getProductData,
    getProductList: createSelector(
        getProductData,
        (data) => data.products
    ),
    getIsLoading: createSelector(
        getProductData,
        (data) => data.isLoading
    ),
    getCartData: createSelector(
        getProductData,
        (data) => data.cartitems
    )
}