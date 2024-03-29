import {CartData, ICartItem, IShopData, ProductSchema} from "../types/product";
import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IThunkConfig} from "app/providers/StoreProvider";

const initialState: ProductSchema = {
    products: [],
    cartitems: [],
    isLoading: false,
    error: undefined
}


const productSlice = createAppSlice({
    name: "product",
    initialState,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            getProductList: createAThunk<undefined, IShopData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const shopData = await extra.api.get<IShopData>("/shop_list");
                    return shopData.data;
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    const productList = action.payload.shop_list;
                    return {
                        products: productList,
                        cartitems: state.cartitems,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            }),
            addCartItem: createAThunk<ICartItem, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                const {item_id , quantity} = data;
                try {
                    await extra.api.post("/add_cart_item", {"item_id": item_id, "quantity": quantity});
                    return
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    return {
                        products: state.products,
                        cartitems: state.cartitems,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            }),
            getCartData: createAThunk<undefined, CartData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const cartData = await extra.api.get<CartData>("/cart_data");
                    return cartData.data;
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    const cartItems = action.payload.cart_data;
                    return {
                        products: state.products,
                        cartitems: cartItems,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            })
        }
    }
})

export const { actions: productActions, reducer: productReducer } = productSlice;