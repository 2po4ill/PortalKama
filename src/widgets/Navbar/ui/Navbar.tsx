import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import ProfileImg from "shared/assets/icons/profile-icon.png";
import CartImg from 'shared/assets/icons/Корзина.png'
import CartQuantImg from 'shared/assets/icons/CartQuantity.png'
import {RoutePath} from "shared/const/router";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {userSelectors} from "entities/User";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {useLocation} from "react-router-dom";
import {productSelectors} from "entities/Product";

export interface INavbarProps {
    className?: string;
    setModalOpen: () => void;
    path?: string}


export const Navbar: FC<INavbarProps> = ( props ) => {
    const { className, setModalOpen, path} = props;
    const userData = useSelector(userSelectors.getUser);
    const userLoading = useSelector(userSelectors.getIsLoading);
    const isAuthorized = useSelector(userSelectors.getIsAuthorized);
    const isLoading = useSelector(productSelectors.getIsLoading)
    const quantity = useSelector(productSelectors.getCartQuantity)
    const location = useLocation()

    const mods: Record<string, boolean> = {
        [cls.smallQuantity]: quantity < 10,
        [cls.largeQuantity]: quantity > 9
    };

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.profileTab}>
                {
                    userLoading ? <Spinner color={"inverted"} size={"m"} className={cls.spinner} /> :
                        isAuthorized ?
                        (
                            <>
                            <AppLink to={"profile"} className={cls.Profile}>
                                {/*<a className={cls.full_name}> {userData.full_name} </a>*/}
                                <img src={ProfileImg} alt={RoutePath.profile} className={cls.ProfileImg}/>
                            </AppLink>
                                {location.pathname === '/shop' || location.pathname === '/cart' ?
                                    isLoading ? <Spinner color={"inverted"} size={"m"} className={cls.spinner} /> :
                                        <AppLink to={"cart"} className={cls.Profile}>
                                            <li>
                                                <img src={CartImg} alt={RoutePath.cart} className={cls.CartImg}/>
                                                <img src={CartQuantImg} alt={RoutePath.cart}
                                                     className={cls.CartQuantityImg}/>
                                                <text className={classNames(cls.Quantity, mods, [className])}> {quantity} </text>
                                            </li>
                                            <Text text="1999" theme={TextTheme.INVERTED}/>
                                        </AppLink>
                                    : null
                                }
                            </>
                        ) :
                        <Button className={cls.button} onClick={setModalOpen} theme={ButtonTheme.INHERIT}>
                            <Text text={"Войти"} theme={TextTheme.INVERTED} />
                        </Button>
                }
            </div>
        </div>
    );
};