import React, {FC, ReactNode, useState} from "react";
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
        <div className={cls.Collapsible}>
            <div className={cls.Header}>
                <label> {title} </label>
                <img src={icon} alt="icon" className={openedWindow === title ? cls.Opened : null}/>
            </div>
            {children}
        </div>
    );
};