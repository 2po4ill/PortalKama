import {classNames} from "shared/lib/classNames";
import cls from './ProfilePage.module.scss'
import React from "react";
import {ProfileTabs} from "widgets/ProfileTabs/ProfileTabs";

export interface IProfilePageProps {
    className?: string;
}


const ProfilePage = ( { className }: IProfilePageProps ) => {

    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <ProfileTabs/>
        </div>
    );
};

export default ProfilePage;