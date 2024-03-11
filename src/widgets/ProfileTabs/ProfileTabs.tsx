import cls from './ProfileTabs.module.scss';
import React, {useState} from "react";
import {ETC} from "features/profile/ui/ETC/ETC";
import {classNames} from "shared/lib/classNames";
import {UserDescription} from "features/profile/ui/UserDescription/UserDescription";

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
        if (windowStatus == "description" && openStatus) {
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
        if (windowStatus == "etc" && openStatus) {
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
            <div>
                <UserDescription isClicked={clickStatus} windowName={"Личные данные"} title={"description"} openedWindow={windowStatus} onClose={descriptionHandler}/>
            </div>
            <div>
                <ETC title={"etc"} windowName={"Прочее"} isClicked={clickStatus} openedWindow={windowStatus} onClose={etcHandler}/>
            </div>
        </div>
    );
}