// Данные с сервера
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
    // img?: string;
    // доступ к товару
    available: boolean;
    // является ли товар сервисом
    isService: boolean;
}