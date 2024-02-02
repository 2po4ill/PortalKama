import React, {FC, ReactNode, useState} from "react";
import cls from "shared/ui/Collapsible/Collapsible.module.scss";
import icon from "shared/assets/collapsible-icon.png";

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

    function animationQuery(windowStatus: boolean, clickStatus: boolean){
        if (windowStatus && clickStatus) {
            return (`${cls.content} ${cls.open} ${cls.clicked}`)
        }
        else {
            if (windowStatus) {
                return (`${cls.content} ${cls.open}`)
            }
            else {
                if (clickStatus) {
                    return(`${cls.content} ${cls.close} ${cls.clicked}`)
                }
                return(`${cls.content} ${cls.close} ${cls.nonClicked}`)
            }
        }

    }


    return (
            <div className={cls.Collapsible}>
                {
                <div className={animationQuery(isOpened, isClicked)}>
                    {children}
                </div>
                }
            </div>
    );
};