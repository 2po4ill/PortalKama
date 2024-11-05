import {classNames} from "shared/lib/classNames";
import cls from './Input.module.scss';
import {InputHTMLAttributes, ChangeEvent, FC, memo, ReactNode, useState, useEffect, useRef} from "react";
import {ButtonTheme} from "shared/ui/Button/Button";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export enum InputTheme {
    DEFAULT = "default",
    BORDERED = "bordered"
}

export type PlaceHolderPosition = "start" | "center" | "end";

export interface IInputProps extends HTMLInputProps {
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
    adornment?: ReactNode;
    autofocus?: boolean;
    theme?: InputTheme;
    placeholderPosition?: PlaceHolderPosition
}

// memo позволяет пропустить повторный рендеринг компонента, если его свойства не изменились
export const Input: FC<IInputProps> = memo((props) => {
    const {
        className,
        value,
        onChange,
        type = "text",
        adornment,
        autofocus,
        theme = ButtonTheme.DEFAULT,
        placeholderPosition = "center",
        ...other
    } = props;
    const [focused, setFocused] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }

    useEffect(() => {
        if (autofocus) {
            setFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    return (
        <div className={classNames(cls.Input, {[cls.focused]: focused}, [className, cls[theme]])}>
            <input
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                type={type}
                onFocus={() => {setFocused(true)}}
                onBlur={() => {setFocused(false)}}
                className={classNames(cls[placeholderPosition])}
                {...other}
            />
            {adornment && (
                <div id={"adornment"} className={cls.Adornment}>
                    {adornment}
                </div>
            )}
        </div>
    )
})