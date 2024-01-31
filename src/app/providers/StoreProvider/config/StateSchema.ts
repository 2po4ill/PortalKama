import {counterSchema} from "entities/Counter";
import {UserSchema} from "entities/User";
import {AuthSchema} from "features/auth/ByUsername";

export interface StateSchema {
    counter: counterSchema;
    user: UserSchema;
    auth: AuthSchema
}