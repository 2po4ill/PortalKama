import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import cls from './UserDescription.module.scss';
import { FC} from "react";
import {Button} from "shared/ui/Button/Button";

export const UserDescription: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;

    return (
        <Collapsible header={props.header} state={props.state}>
            <div className={cls.Photo}>
                <label> Здесь фото </label>
            </div>
            <div className={cls.Initials}>
                <label> Здесь ФИО </label>
            </div>
            <div className={cls.Position}>
                <label> Здесь должность </label>
            </div>
            <Button> Выйти из аккаунта </Button>
        </Collapsible>
    )
}