import React, {FC, ReactNode, useState} from "react";
import cls from "shared/ui/Collapsible/Collapsible.module.scss";
import icon from "shared/assets/collapsible-icon.png";
import {classNames} from "shared/lib/classNames";

export interface ICollapsible {
    className?: string;
    children?: ReactNode;
    isOpened?: boolean,
    isClicked?: boolean,
}

export const Collapsible: FC<ICollapsible> = (props) => {
    const {
        className,
        children,
        isOpened,
        isClicked,
    } = props;

    const mods: Record<string, boolean> = {
        [cls.open]: isOpened,
        [cls.clicked]: isClicked,
        [cls.close]: !isOpened,
        [cls.nonClicked]: !isOpened && !isClicked
    };



    return (
            <div className={cls.Collapsible}>
                {
                <div className={classNames(cls.content, mods)}>
                    {children}
                </div>
                }
            </div>
    );
};