import cls from './ProfileTabs.module.scss';
import React, {useState} from "react";
import {ETC} from "features/profile/ui/ETC/ETC";
import {classNames} from "shared/lib/classNames";
import {UserDescription} from "features/profile/ui/UserDescription/UserDescription";
import {Header} from "shared/ui/Header/Header";

export interface IProfileTabs {
    className?: string;
}

export const ProfileTabs = ( { className }: IProfileTabs ) => {
    const [windowStatus, setWindowStatus] = useState("Личные данные")

    const descriptionHandler = () => {
        setWindowStatus("Личные данные");
    }

    const etcHandler = () => {
        setWindowStatus("Прочее");
    }


    return (
        <div className={classNames(cls.ProfileTabs, {}, [className])}>
            <div onClick={descriptionHandler}>
                <UserDescription title={"Личные данные"} openedWindow={windowStatus}/>
            </div>
            <div onClick={etcHandler}>
                <ETC title={"Прочее"} openedWindow={windowStatus}/>
            </div>
        </div>
    );
}