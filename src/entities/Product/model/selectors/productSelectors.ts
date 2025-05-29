import {createSelector, Selector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Event, ICartItem, IOrderItem, IShopItem, ProductSchema, Shop_Users, Transaction} from "../types/product";


const defaultProductData: ProductSchema = {
    products: [],
    cartitems: [],
    transactions: [],
    orders: [],
    users: [],
    events: [],
    error: undefined,
    isLoading: false
}

const getProductData = (state: StateSchema) => state.product || defaultProductData;

interface IProductSelectors {
    getProductData: Selector<StateSchema, ProductSchema>;
    getProductList: Selector<StateSchema, IShopItem[]>;
    getIsLoading: Selector<StateSchema, boolean>
    getUnclaimedEvents: Selector<StateSchema, Event[]>
    getCartData: Selector<StateSchema, ICartItem[]>;
    getTransactionData: Selector<StateSchema, Transaction[]>;
    getUserOrders: Selector<StateSchema, IOrderItem[]>
    getUserIds: Selector<StateSchema, Shop_Users[]>
    getCartQuantity: Selector<StateSchema, number>
    getCartPrice: Selector<StateSchema, number>
    getError: Selector<StateSchema, string | undefined>
}

function sumQuantity(cartItems: ICartItem[]){
    let sum = 0
    cartItems.map(value => sum += value.quantity)
    return sum
}

function sumPrice(cartItems: ICartItem[], products: IShopItem[]) {
    let sum = 0
    for (let i = 0; i < cartItems.length; i++) {
        for (let j = 0; j < products.length; j++) {
            products[j].item_id === cartItems[i].item_id ? sum += products[j].price * cartItems[i].quantity : null
        }
    }
    return sum
}

export const productSelectors: IProductSelectors = {
    getProductData,
    getUserOrders: createSelector(
        getProductData,
        (data) => data.orders
    ),
    getProductList: createSelector(
        getProductData,
        (data) => data.products
    ),
    getIsLoading: createSelector(
        getProductData,
        (data) => data.isLoading
    ),
    getUnclaimedEvents: createSelector(
        getProductData,
        (data) => data.events
    ),
    getCartData: createSelector(
        getProductData,
        (data) => data.cartitems
    ),
    getCartQuantity: createSelector(
        getProductData,
        (data) => sumQuantity(data.cartitems)
    ),
    getCartPrice: createSelector(
        getProductData,
        (data) => sumPrice(data.cartitems, data.products)
    ),
    getTransactionData: createSelector(
        getProductData,
        (data) => data.transactions
    ),
    getUserIds: createSelector(
        getProductData,
        (data) => data.users
    ),
    getError: createSelector(
        getProductData,
        (data) => data.error
    )
}