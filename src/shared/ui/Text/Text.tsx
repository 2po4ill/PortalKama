import { FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export interface ITextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme
}

// memo позволяет пропустить повторный рендеринг компонента, если его свойства не изменились
export const Text: FC<ITextProps> = memo((props) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        ...other
    } = props;

    return (
        <div className={classNames(cls.Text, {}, [ className, cls[theme] ])} {...other} >
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    )
});