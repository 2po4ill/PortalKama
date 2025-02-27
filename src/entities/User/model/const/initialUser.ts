import {UserSchema} from "../types/user";

export const initialUser: UserSchema = {
    uid: -1,
    username: "",
    image_path: "",
    balance: 0,
    isLoading: true,
    isAuthorized: false
}