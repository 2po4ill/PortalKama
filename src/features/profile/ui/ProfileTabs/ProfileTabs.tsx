import cls from './ProfileTabs.module.scss';
import React, {useState} from "react";
import {ETC} from "features/profile/ui/ETC/ETC";
import {classNames} from "shared/lib/classNames";
import {UserDescription} from "features/profile/ui/UserDescription/UserDescription";

export interface IProfileTabs {
    className?: string;
}

export const ProfileTabs = ( { className }: IProfileTabs ) => {
    const [descriptionStatus, setDescriptionStatus] = useState(true);
    const [etcStatus, setETCStatus] = useState(false);

    const DescriptionHandler = () => {
        if (descriptionStatus) {
            setDescriptionStatus(false)
        }
        else{
            setETCStatus(false)
            setDescriptionStatus(true)
        }
    };

    const ETCHandler = () => {
        if (etcStatus) {
            setETCStatus(false)
        }
        else{
            setDescriptionStatus(false)
            setETCStatus(true)
        }
    };

    return (
        <div className={classNames(cls.ProfileTabs, {}, [className])}>
            <div onClick={DescriptionHandler}>
                <UserDescription header={"Личные данные"} state={descriptionStatus}/>
            </div>
            <div onClick={ETCHandler}>
                <ETC header={"Прочее"} state={etcStatus}/>
            </div>
        </div>
    );
}