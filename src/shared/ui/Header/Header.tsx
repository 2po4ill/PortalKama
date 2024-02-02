import React, {FC, ReactNode} from "react";
import cls from "shared/ui/Header/Header.module.scss";
import icon from "shared/assets/collapsible-icon.png";

export interface IHeader {
    className?: string;
    children?: ReactNode,
    title?: string,
    isOpened?: boolean,
    openedWindow?: string,
}

export const Header: FC<IHeader> = (props) => {
    const {
        className,
        children,
        title,
        openedWindow,
    } = props;

    return (
        <div className={cls.Header}>
            {children}
            <img src={icon} alt="icon" className={openedWindow === title ? cls.Opened : null}/>
        </div>
    );
};