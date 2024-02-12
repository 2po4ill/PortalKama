import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import React, {FC} from "react";
import {Button} from "shared/ui/Button/Button";
import {getAuthData, userActions} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {LOCAL_STORAGE_USER_KEY} from "shared/const/localstorage";
import {useSelector} from "react-redux";
import path from "node:path";



export const UserDescription: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;
    const dispatch = useAppDispatch();
    const userData = useSelector(getAuthData);
    const img = userData.img;
    const full_name = userData.full_name;
    const position = userData.position;


    const logout = () => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, null);
        dispatch(userActions.setAuthData(null));
    }


    return (
        <Collapsible isClicked={props.isClicked} title={"description"} openedWindow={props.openedWindow} windowName={"Личные данные"} onClose={props.onClose}>
            <div className={cls.description}>
                <div className={cls.imgWrapper}>
                    <img src={img} alt={"img"} className={cls.image}/>
                </div>
                <div className={cls.info}>
                    <label className={cls.credentials}>{full_name}</label>
                    <label className={cls.position}>{position}</label>
                    <Button onClick={logout} className={cls.btn}> Выйти из аккаунта </Button>
                </div>
            </div>
        </Collapsible>

    )
}