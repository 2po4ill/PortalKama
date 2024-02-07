import {ICollapsible,Collapsible} from "shared/ui/Collapsible/Collapsible";
import React, {FC} from "react";
import cls from "./ETC.module.scss"
import {Button} from "shared/ui/Button/Button";

export const ETC: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;

    return (
        <div className={cls.ETC}>
            <Collapsible isClicked={props.isClicked} title={"etc"} openedWindow={props.openedWindow} windowName={"Прочее"} onClose={props.onClose}>
                <label> Здесь что-то будет </label>
                <Button> Выйти из аккаунта </Button>
            </Collapsible>
        </div>
    )
}