import {classNames} from "shared/lib/classNames";
import cls from './ProfilePage.module.scss'
import React, {useEffect} from "react";
import {ProfileTabs} from "widgets/ProfileTabs/ProfileTabs";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {profileActions, profileReducer, profileSelectors} from "features/profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {PageLoader} from "widgets/PageLoader";
import {PageError} from "widgets/PageError/ui/PageError";

export interface IProfilePageProps {
    className?: string;
}


const ProfilePage = ( { className }: IProfilePageProps ) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(profileSelectors.getIsLoading);
    const error = useSelector(profileSelectors.getError);

    useEffect(() => {
        dispatch(profileActions.getProfileData());
    }, [dispatch]);

    return (
        <AsyncReducerProvider name={"profile"} reducer={profileReducer}>
            {
                isLoading
                    ? <PageLoader />
                    : error
                        ? <PageError />
                        : (
                            <div className={classNames(cls.ProfilePage, {}, [className])}>
                                <ProfileTabs/>
                            </div>
                        )
            }
        </AsyncReducerProvider>
    );
};

export default ProfilePage;