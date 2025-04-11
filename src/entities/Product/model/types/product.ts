
export interface Product {
    // id товара
    id: string;
    // название товара
    name: string;
    // описание товара
    description: string;
    // цена товара
    price: number;
    // ссылка на картинку товара
    img: string;
    // доступ к товару
    available: boolean;
    // является ли товар сервисом
    // isService: boolean;
}

export interface ICartItem {
    in_cart_item_id: number;
    item_id: number;
    quantity: number;
}

export interface IOrderItem {
    cart_id: number;
    items: ICartItem[];
    date: string;
}

export interface UserOrders {
    status: string;
    carts: IOrderItem[];
}

export interface CartData {
    status: string;
    cart_data: ICartItem[];
}

export interface EventData {
    status: string;
    events: Event[];
}

export interface Event {
    name: string;
    amount: number;
    date: string;
}

export interface TransactionData {
    status: string;
    transactions: Transaction[];
}

export interface Transaction {
    transaction_id: number;
    user_id: number;
    description: string;
    date: string;
    amount: string;
}

export interface ProductSchema {
    products: IShopItem[];
    cartitems: ICartItem[];
    orders: IOrderItem[];
    events: Event[];
    transactions: Transaction[];
    users: Shop_Users[];
    isLoading: boolean;
    error: string | undefined;
}

export interface Shop_Users {
    full_name: string;
    user_id: number;
}

export interface IShopUserData {
    status: string;
    users: Shop_Users[];
}

/** Данные с сервера **/
export interface IShopItem {
    item_id: number;
    name: string;
    price: number;
    photo_path: string;
    description: string;
    is_available: boolean;
}

export interface IShopData {
    status: string;
    shop_list: IShopItem[];
}