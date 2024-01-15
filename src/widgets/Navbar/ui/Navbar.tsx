import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "features/ThemeSwitcher";
import ProfileImg from "shared/assets/user-32-32.png";

export interface INavbarProps {
    className?: string;
}

export const Navbar = ( { className }: INavbarProps ) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher />
            <nav className={cls.links}>
                <AppLink to={"/"} className={cls.Link}>Главная</AppLink>
                <AppLink to={"/reservation"} className={cls.Link}>Бронь</AppLink>
                <AppLink to={"/store"} className={cls.Link}>Магазин</AppLink>
                <img src={ProfileImg} alt={"profile"} className={cls.ProfileImg}/>
                <AppLink to={"profile"} className={cls.Profile}>Профиль</AppLink>
            </nav>
        </div>
    );
};