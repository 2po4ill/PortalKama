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
    const [clickStatus, setClickStatus] = useState(false)

    const clickHandler = () => {
        setClickStatus(true)
    }

    const descriptionHandler = () => {
        clickHandler()
        if (windowStatus == "description" && openStatus == true) {
            setOpenStatus(false)
            setWindowStatus("CLOSED");
        }
        else {
            setOpenStatus(true)
            setWindowStatus("description");
        }
    }

    const etcHandler = () => {
        clickHandler()
        if (windowStatus == "etc" && openStatus == true) {
            setOpenStatus(false)
            setWindowStatus("CLOSED");
        }
        else {
            setOpenStatus(true)
            setWindowStatus("etc");
        }
    }

    return (
        <div className={classNames(cls.ProfileTabs, {}, [className])}>
            <div onClick={descriptionHandler}>
                <Header title={"description"} openedWindow={windowStatus}> Личные данные </Header>
            </div>
            <div>
                <UserDescription isOpened={windowStatus == "description"} isClicked={clickStatus}/>
            </div>
            <div onClick={etcHandler}>
                <Header title={"etc"} openedWindow={windowStatus}> Прочее </Header>
            </div>
            <div>
                <ETC isOpened={windowStatus == "etc"} isClicked={clickStatus}/>
            </div>
        </div>
    );
}