import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import ProfileImg from "shared/assets/icons/profile-icon.png";
import testImg from "shared/assets/images/image.png"
import CartImg from 'shared/assets/icons/Корзина.png'
import CartQuantImg from 'shared/assets/icons/CartQuantity.png'
import {RoutePath} from "shared/const/router";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import React, {FC, ReactNode, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {userActions, userSelectors} from "entities/User";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {useLocation} from "react-router-dom";
import {productSelectors} from "entities/Product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";

export interface INavbarProps {
    className?: string;
    setModalOpen: () => void;
    path?: string}


export const Navbar: FC<INavbarProps> = ( props ) => {
    const { className, setModalOpen, path} = props;
    const userData = useSelector(userSelectors.getUser);
    const userImage = useSelector(userSelectors.getImage)
    const userLoading = useSelector(userSelectors.getIsLoading);
    const isAuthorized = useSelector(userSelectors.getIsAuthorized);
    const isLoading = useSelector(productSelectors.getIsLoading);
    const quantity = useSelector(productSelectors.getCartQuantity);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [profileContent, setProfileContent] = useState<ReactNode>(null);

    const mods: Record<string, boolean> = {
        [cls.smallQuantity]: quantity < 10,
        [cls.largeQuantity]: quantity > 9
    };

    const logout = () => {
        dispatch(userActions.logout());
    }

    // useEffect(() => {
    //     console.log("changed")
    //     setProfileContent(getProfileContent());
    // }, [userData, userLoading, isAuthorized]);

    const getProfileContent = () => {

        if (!isAuthorized) {
            if (userLoading) {
                if (userData?.username != "") return (
                    <AppLink to={"profile"} className={cls.Profile} disabled={true}>
                            <div className={cls.ImgCropper}>
                                <img src={userImage ? userImage : ProfileImg} alt={RoutePath.profile}
                                 className={cls.ProfileImg}/>
                            </div>
                                <Text className={cls.full_name} text={userData.username} theme={TextTheme.INVERTED}/>
                                <Button onClick={logout}> Выйти </Button>

                    </AppLink>
            )
                return (
                    <Spinner color={"inverted"} size={"m"} className={cls.spinner} />
                )
            }
            return (
                <Button className={cls.button} onClick={setModalOpen} theme={ButtonTheme.INHERIT}>
                    <Text text={"Войти в личный кабинет"} theme={TextTheme.INVERTED} />
                </Button>
            );
        }
        return (
            <AppLink to={"profile"} className={cls.Profile}>
                <div className={cls.ImgCropper}>
                    <img src={userImage ? userImage : ProfileImg} alt={RoutePath.profile} className={cls.ProfileImg}/>
                </div>
                <Text className={cls.full_name} text={userData.username} theme={TextTheme.INVERTED}  />
                <Button onClick={logout}> Выйти </Button>
            </AppLink>
        );
    };

    const getCartContent = () => {
        if (!isAuthorized || userLoading) return null;
        if (isLoading) return (
            <Spinner color={"inverted"} size={"m"} className={cls.spinner} />
        );
        if (location.pathname === '/shop' || location.pathname === '/cart' || location.pathname === '/cart/user_orders' || location.pathname === '/user_balance') return (
            <AppLink to={"cart"} className={cls.Profile}>
                <li>
                    <img src={CartImg} alt={RoutePath.cart} className={cls.CartImg}/>
                    <img src={CartQuantImg} alt={RoutePath.cart} className={cls.CartQuantityImg}/>
                    <text className={classNames(cls.Quantity, mods, [className])}> {quantity} </text>
                </li>
                <AppLink to={"user_balance"}>
                    <Text text={userData.balance ? userData.balance.toString() : "0" + " баллов"} theme={TextTheme.INVERTED}/>
                </AppLink>
            </AppLink>
        );
        return null;
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.profileTab}>
                {getProfileContent()}
                {getCartContent()}
            </div>
        </div>
    );
};