import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import ProfileImg from "shared/assets/user-32-32.png";
import Logo from 'shared/assets/logo.png'
import {RoutePath} from "shared/const/router";
import {Button} from "shared/ui/Button/Button";
import React, {FC, useState} from "react";

export interface INavbarProps {
    className?: string;
    setModalOpen: () => void
}


export const Navbar: FC<INavbarProps> = ( props ) => {
    const { className, setModalOpen} = props

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div>
                <div className={cls.logo}><img src={Logo} alt="logo"/></div>
                <nav className={cls.links}>
                    <AppLink to={RoutePath.main} className={cls.Link}>Главная</AppLink>
                    <AppLink to={RoutePath.reservation} className={cls.Link}>Бронь</AppLink>
                    <AppLink to={RoutePath.store} className={cls.Link}>Магазин</AppLink>
                </nav>

            </div>
            <div>
                <Button onClick={setModalOpen}>modal</Button>
                <AppLink to={"profile"} className={cls.Profile}>
                    <img src={ProfileImg} alt={RoutePath.profile} className={cls.ProfileImg}/>
                </AppLink>
            </div>
        </div>
    );
};