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
    onClick?: () => void;
}

// memo позволяет пропустить повторный рендеринг компонента, если его свойства не изменились
export const Text: FC<ITextProps> = memo((props) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        titleMaxLength,
        onClick,
        ...other
    } = props;

    function newLineEditor(text: string) {
        return text.replace(/\\n/g, "  ")
    }


    return (
        <div className={classNames(cls.Text, {}, [ className, cls[theme] ])} {...other} onClick={onClick}>
            {title && <p className={cls.title}>{titleMaxLength ? title.slice(0,titleMaxLength) + "..." : title}</p>}
            {text && <p className={cls.text}>{newLineEditor(text)}</p>}
        </div>
    )
});