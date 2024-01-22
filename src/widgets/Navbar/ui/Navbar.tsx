import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "features/ThemeSwitcher";
import ProfileImg from "shared/assets/user-32-32.png";
import Logo from 'shared/assets/logo.png'

export interface INavbarProps {
    className?: string;
}


export const Navbar = ( { className }: INavbarProps ) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div>
                <div className={cls.logo}><img src={Logo} alt="logo"/></div>
                <nav className={cls.links}>
                    <AppLink to={"/"} className={cls.Link}>Главная</AppLink>
                    <AppLink to={"/reservation"} className={cls.Link}>Бронь</AppLink>
                    <AppLink to={"/store"} className={cls.Link}>Магазин</AppLink>
                </nav>

            </div>
            <div>
                <AppLink to={"profile"} className={cls.Profile}>
                    <img src={ProfileImg} alt={"profile"} className={cls.ProfileImg}/>
                </AppLink>
            </div>
        </div>
    );
};