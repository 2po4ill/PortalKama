import path from "node:path";

/**
 * Тип объекта пользователь
 * т.е. какие данные о пользователе получаем с бекэнда
 */
export interface User {
    uid: string;
    username: string;
    img: string;
    full_name: string;
    position: string;
}

export interface UserSchema {
    // не измененные данные от запроса на авторизацию
    authData?: User;
    isAdmin: boolean;
}
