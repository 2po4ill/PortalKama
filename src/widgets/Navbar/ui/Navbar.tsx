import {classNames} from "shared/lib/classNames";
import cls from './Navbar.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";
import ProfileImg from "shared/assets/user-32-32.png";
import CartImg from 'shared/assets/icons/shopping-cart.png'
import {RoutePath} from "shared/const/router";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {userSelectors} from "entities/User";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {useLocation} from "react-router-dom";

export interface INavbarProps {
    className?: string;
    setModalOpen: () => void;
    path?: string}


export const Navbar: FC<INavbarProps> = ( props ) => {
    const { className, setModalOpen, path} = props;
    const userData = useSelector(userSelectors.getUser);
    const userLoading = useSelector(userSelectors.getIsLoading);
    const isAuthorized = useSelector(userSelectors.getIsAuthorized);
    const location = useLocation()

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
                                <Text text={userData.username} theme={TextTheme.INVERTED} />
                            </AppLink>
                                {location.pathname === '/shop' || location.pathname === '/cart' ?
                                    <AppLink to={"cart"} className={cls.Profile}>
                                        <img src={CartImg} alt={RoutePath.cart} className={cls.CartImg}/>
                                        <Text text="1999" theme={TextTheme.INVERTED} />
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