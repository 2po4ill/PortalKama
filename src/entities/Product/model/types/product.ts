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

export interface ProductSchema {
    products: IShopItem[];
    isLoading: boolean;
    error: string | undefined;
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