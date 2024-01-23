import {classNames} from "shared/lib/classNames";
import cls from './ProfilePage.module.scss'

export interface IProfilePageProps {
    className?: string;
}

const ProfilePage = ( { className }: IProfilePageProps ) => {
    return (
        <div className={classNames(cls.Store, {}, [className])}>
            <h1>ProfilePage</h1>
        </div>
    );
};

export default ProfilePage;