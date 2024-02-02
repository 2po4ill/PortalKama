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
            <div className={cls.Collapsible}>
                {
                <div className={isOpened ? `${cls.content} ${cls.open}` : `${cls.content} ${cls.close}`}>
                    {children}
                </div>
                }
            </div>
    );
};