import {classNames} from "shared/lib/classNames";
import {Link, LinkProps} from "react-router-dom";
import cls from './AppLink.module.scss'
import {FC} from "react";

export interface IAppLinkProps extends LinkProps{
    to: string;
    className?: string;
    disabled?: boolean
}

export const AppLink: FC<IAppLinkProps> = ( props ) => {
    const { to, className, children, disabled, ...other } = props;

    if (disabled) return (
        <a {...other} className={classNames(cls.AppLink, {}, [className])}>
            {children}
        </a>
    )
    return (
        <Link to={to} {...other} className={classNames(cls.AppLink, {}, [className])}>
            {children}
        </Link>
    );
};