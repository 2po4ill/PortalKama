import React, {ButtonHTMLAttributes, FC, ReactNode, useState} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "shared/ui/Collapsible/Collapsible.module.scss";
import icon from "shared/assets/collapsible-icon.png";

export interface ICollapsible {
    className?: string;
    children?: ReactNode;
    header?: string,
    state?: boolean,
}

export const Collapsible: FC<ICollapsible> = (props) => {
    const {
        className,
        children,
        header,
        state,
    } = props;


    return (
            <div className={cls.Collapsible}>
                <div className={cls.header}>
                    {header}
                    <img src={icon} alt="icon" className={state ? cls.Opened : null}/>
                </div>
                {
                    state ?
                <div className={cls.content}>
                    {children}
                </div>
                        : null
                }
            </div>
    );
};