/**
 * Тип объекта пользователь
 * т.е. какие данные о пользователе получаем с бекэнда
 */
export interface IUserDataResponse {
    status: string;
    user: IUserData;
}

export interface IUserData {
    user_id: number;
    username: string;
    img_url?: string;
}

export interface User {
    uid: number;
    username: string;
    img?: string;
}

export enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}

export interface UserSchema extends User {
    isLoading: boolean;
    isAuthorized: boolean;
    error?: string;
    role?: UserRoles;
}