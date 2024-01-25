import {classNames} from "shared/lib/classNames";
import cls from './ProfilePage.module.scss'

export interface IProfilePageProps {
    className?: string;
}

const ProfilePage = ( { className }: IProfilePageProps ) => {
    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <form>
                <div className="center-block">

                </div>
            </form>
        </div>
    );
};

export default ProfilePage;