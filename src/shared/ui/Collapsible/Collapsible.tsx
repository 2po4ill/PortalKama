import React, {FC, ReactNode, useState} from "react";
import cls from "shared/ui/Collapsible/Collapsible.module.scss";
import icon from "shared/assets/collapsible-icon.png";
import {classNames} from "shared/lib/classNames";

export interface ICollapsible {
    className?: string;
    children?: ReactNode;
    isClicked: boolean,
    windowName: string,
    openedWindow: string,
    title: string,
    onClose: () => void,
}

export const Collapsible: FC<ICollapsible> = (props) => {
    const {
        className,
        children,
        isClicked,
        windowName,
        openedWindow,
        title,
        onClose,
    } = props;

    const mods: Record<string, boolean> = {
        [cls.open]: openedWindow === title,
        [cls.clicked]: isClicked,
        [cls.close]: !(openedWindow === title),
        [cls.nonClicked]: !(openedWindow === title) && !isClicked
    };



    return (
        <div className={cls.Collapsible}>
            <div className={cls.Header} onClick={onClose}>
                <label> {windowName} </label>
                <img src={icon} alt="icon" className={openedWindow === title ? cls.Opened : cls.Closed}/>
            </div>
            <div className={classNames(cls.content, mods)}>
                {children}
            </div>
        </div>
    );
};