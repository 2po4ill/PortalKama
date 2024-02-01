import {Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import {FC, useState} from "react";
import {Button} from "shared/ui/Button/Button";
import {Header, IHeader} from "shared/ui/Header/Header";

export const UserDescription: FC<IHeader> = (props) => {
    const { className, ...other } = props;

    return (
        <Header title={props.title} openedWindow={props.openedWindow}>
            <Collapsible isOpened={props.title === props.openedWindow}>
                <label> Здесь что-то будет </label>
                <Button> Выйти из аккаунта </Button>
            </Collapsible>
        </Header>

    )
}