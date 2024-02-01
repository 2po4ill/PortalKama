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
    const [openStatus, setOpenStatus] = useState(true)

    const descriptionHandler = () => {
        if (windowStatus == "Личные данные" && openStatus == true) {
            setOpenStatus(false)
            setWindowStatus("Закрыто");
        }
        else {
            if (windowStatus == "Закрыто" && openStatus == false)
            {
                setOpenStatus(true)
                setWindowStatus("Личные данные");
            }
            else
            {
                setOpenStatus(true)
                setWindowStatus("Личные данные");
            }
        }
    }

    const etcHandler = () => {
        if (windowStatus == "Прочее" && openStatus == true) {
            setOpenStatus(false)
            setWindowStatus("Закрыто");
        }
        else {
            if (windowStatus == "Закрыто" && openStatus == false)
            {
                setOpenStatus(true)
                setWindowStatus("Прочее");
            }
            else
            {
                setOpenStatus(true)
                setWindowStatus("Прочее");
            }
        }
    }

    return (
        <div className={classNames(cls.ProfileTabs, {}, [className])}>
            <div onClick={descriptionHandler}>
                <Header title={"Личные данные"} openedWindow={windowStatus}/>
            </div>
            <div>
                <UserDescription isOpened={windowStatus == "Личные данные"}/>
            </div>
            <div onClick={etcHandler}>
                <Header title={"Прочее"} openedWindow={windowStatus}/>
            </div>
            <div>
                <ETC isOpened={windowStatus == "Прочее"}/>
            </div>
        </div>
    );
}