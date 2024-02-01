import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import React, {FC} from "react";
import {Button} from "shared/ui/Button/Button";

export const UserDescription: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;

    return (
        <div className={cls.UserDescription}>
            <Collapsible isOpened={props.isOpened}>
                <label> Здесь что-то будет </label>
                <Button> Выйти из аккаунта </Button>
            </Collapsible>
        </div>

    )
}