import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import React, {FC} from "react";
import {Button} from "shared/ui/Button/Button";
import {userSelectors, userActions} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useSelector} from "react-redux";



export const UserDescription: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;
    const dispatch = useAppDispatch();
    const userData = useSelector(userSelectors.getAuthData);


    const logout = () => {
        dispatch(userActions.logout());
    }


    return (
        userData ?
        <Collapsible isClicked={props.isClicked} title={"description"} openedWindow={props.openedWindow} windowName={"Личные данные"} onClose={props.onClose}>
            <div className={cls.description}>
                <div className={cls.imgWrapper}>
                    <img src={userData.img} alt={"img"} className={cls.image}/>
                </div>
                <div className={cls.info}>
                    <label className={cls.credentials}>{userData.full_name}</label>
                    <label className={cls.position}>{userData.position}</label>
                    <Button onClick={logout} className={cls.btn}> Выйти из аккаунта </Button>
                </div>
            </div>
        </Collapsible>
            : null
    )
}