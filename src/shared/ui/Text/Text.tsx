import { FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted'
}

export interface ITextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme
    titleMaxLength?: number;
}

// memo позволяет пропустить повторный рендеринг компонента, если его свойства не изменились
export const Text: FC<ITextProps> = memo((props) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        titleMaxLength,
        ...other
    } = props;

    return (
        <div className={classNames(cls.Text, {}, [ className, cls[theme] ])} {...other} >
            {title && <p className={cls.title}>{titleMaxLength ? title.slice(0,titleMaxLength) + "..." : title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    )
});