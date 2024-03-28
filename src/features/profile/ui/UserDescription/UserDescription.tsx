import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import React, {FC} from "react";
import {Button} from "shared/ui/Button/Button";
import {userActions} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {profileSelectors} from "features/profile";



export const UserDescription: FC<ICollapsible> = (props) => {
    const { className, title, windowName, ...other } = props;
    const dispatch = useAppDispatch();
    const profileData = useSelector(profileSelectors.getProfile);


    const logout = () => {
        dispatch(userActions.logout());
    }


    return (
        profileData ?
        <Collapsible isClicked={props.isClicked} title={title} openedWindow={props.openedWindow} windowName={windowName} onClose={props.onClose}>
            <div className={cls.description}>
                <div className={cls.imgWrapper}>
                    <img src={imageSrc(profileData.photo_path)} alt={"img"} className={cls.image}/>
                </div>
                <div className={cls.info}>
                    <label className={cls.credentials}>{profileData.full_name}</label>
                    <label className={cls.position}>{profileData.position}</label>
                    <Button onClick={logout} className={cls.btn}> Выйти из аккаунта </Button>
                </div>
            </div>
        </Collapsible>
            : null
    )
}