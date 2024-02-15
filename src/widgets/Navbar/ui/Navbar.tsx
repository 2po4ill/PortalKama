import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import ProfileImg from "shared/assets/user-32-32.png";
import Logo from 'shared/assets/logo.png'
import {RoutePath} from "shared/const/router";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getAuthData} from "entities/User";

export interface INavbarProps {
    className?: string;
    setModalOpen: () => void
}


export const Navbar: FC<INavbarProps> = ( props ) => {
    const { className, setModalOpen} = props;
    const userData = useSelector(getAuthData);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div>
                <div className={cls.logo}><img src={Logo} alt="logo"/></div>
                <nav className={cls.links}>
                    <AppLink to={RoutePath.main} className={cls.Link}>Главная</AppLink>
                    <AppLink to={RoutePath.reservation} className={cls.Link}>Бронь</AppLink>
                    <AppLink to={RoutePath.shop} className={cls.Link}>Магазин</AppLink>
                </nav>

            </div>
            <div>
                {
                    userData ?
                        (
                            <AppLink to={"profile"} className={cls.Profile}>
                                <a className={cls.full_name}> {userData.full_name} </a>
                                <img src={ProfileImg} alt={RoutePath.profile} className={cls.ProfileImg}/>
                            </AppLink>
                        ) :
                        <Button className={""} onClick={setModalOpen} theme={ButtonTheme.INHERIT}>Войти</Button>
                }
            </div>
        </div>
    );
};