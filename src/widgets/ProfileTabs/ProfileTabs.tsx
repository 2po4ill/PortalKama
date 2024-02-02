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
    const [windowStatus, setWindowStatus] = useState("description")
    const [openStatus, setOpenStatus] = useState(true)

    const descriptionHandler = () => {
        if (windowStatus == "description" && openStatus == true) {
            setOpenStatus(false)
            setWindowStatus("CLOSED");
        }
        else {
            if (windowStatus == "CLOSED" && openStatus == false)
            {
                setOpenStatus(true)
                setWindowStatus("description");
            }
            else
            {
                setOpenStatus(true)
                setWindowStatus("description");
            }
        }
    }

    const etcHandler = () => {
        if (windowStatus == "etc" && openStatus == true) {
            setOpenStatus(false)
            setWindowStatus("CLOSED");
        }
        else {
            if (windowStatus == "CLOSED" && openStatus == false)
            {
                setOpenStatus(true)
                setWindowStatus("etc");
            }
            else
            {
                setOpenStatus(true)
                setWindowStatus("etc");
            }
        }
    }

    return (
        <div className={classNames(cls.ProfileTabs, {}, [className])}>
            <div onClick={descriptionHandler}>
                <Header title={"description"} openedWindow={windowStatus}> Личные данные </Header>
            </div>
            <div>
                <UserDescription isOpened={windowStatus == "description"}/>
            </div>
            <div onClick={etcHandler}>
                <Header title={"etc"} openedWindow={windowStatus}> Прочее </Header>
            </div>
            <div>
                <ETC isOpened={windowStatus == "etc"}/>
            </div>
        </div>
    );
}