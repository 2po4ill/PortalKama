/**
 * Тип объекта пользователь
 * т.е. какие данные о пользователе получаем с бекэнда
 */
export interface User {
    uid: string;
    username: string;
}

export interface UserSchema {
    // не измененные данные от запроса на авторизацию
    authData?: User;
    isAdmin: boolean;
}
