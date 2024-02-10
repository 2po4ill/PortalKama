import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import React, {FC} from "react";
import {Button} from "shared/ui/Button/Button";
import {userActions} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";

export const UserDescription: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;
    const dispatch = useAppDispatch();


    const logout = () => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, null);
        dispatch(userActions.setAuthData(null));
    }

    return (
        <div className={cls.UserDescription}>
            <Collapsible isClicked={props.isClicked} title={"description"} openedWindow={props.openedWindow} windowName={"Личные данные"} onClose={props.onClose}>
                <label> Здесь что-то будет </label>
                <Button onClick={logout}> Выйти из аккаунта </Button>
            </Collapsible>
        </div>

    )
}