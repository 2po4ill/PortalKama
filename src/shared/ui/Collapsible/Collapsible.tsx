import React, {FC, ReactNode, useState} from "react";
import cls from "shared/ui/Collapsible/Collapsible.module.scss";
import icon from "shared/assets/collapsible-icon.png";

export interface ICollapsible {
    className?: string;
    children?: ReactNode;
    isOpened?: boolean,
}

export const Collapsible: FC<ICollapsible> = (props) => {
    const {
        className,
        children,
        isOpened,
    } = props;


    return (
            <div className={cls.content}>
                {
                    isOpened ?
                <div className={cls.content}>
                    {children}
                </div>
                        : null
                }
            </div>
    );
};