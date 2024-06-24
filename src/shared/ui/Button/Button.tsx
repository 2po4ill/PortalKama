import {classNames} from "shared/lib/classNames";
import cls from './Button.module.scss'
import {ButtonHTMLAttributes, FC, memo} from "react";
import {Spinner} from "shared/ui/Spinner/Spinner";

export enum ButtonTheme {
    DEFAULT = "default",
    INHERIT = "inherit"
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    theme?: ButtonTheme;
    image?: string;
}

export const Button: FC<IButtonProps> = memo(( props ) => {
    const {
        className,
        children,
        disabled = false,
        loading = false,
        theme = ButtonTheme.DEFAULT,
        image,
        ...other } = props;
    return (
        <button className={classNames(cls.Button, {[cls.disabled]: disabled}, [ className, cls[theme] ])} {...other} disabled={disabled}>
            { loading ? <Spinner size={"s"} color={"inverted"}/> : children}
        </button>
    );
});