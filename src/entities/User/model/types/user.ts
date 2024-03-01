import path from "node:path";

/**
 * Тип объекта пользователь
 * т.е. какие данные о пользователе получаем с бекэнда
 */
export interface User {
    uid: string;
    img: string;
}

export enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}

export interface UserSchema {
    uid: string;
    img: string;
    username: string;
    isLoading: boolean;
    isAuthorized: boolean;
    error?: string;
    role?: UserRoles;
}

export type TAuthorizedUserData = User & Required<Pick<UserSchema, "username">>
