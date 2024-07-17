import {UserSchema} from "../types/user";

export const initialUser: UserSchema = {
    uid: -1,
    username: "",
    img: "",
    isLoading: true,
    isAuthorized: false
}