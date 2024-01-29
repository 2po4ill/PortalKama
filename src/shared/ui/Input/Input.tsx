import {classNames} from "shared/lib/classNames";
import cls from './Input.module.scss';
import {InputHTMLAttributes, ChangeEvent, FC, memo, ReactNode, useState, useEffect, useRef} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export interface IInputProps extends HTMLInputProps {
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
    adornment?: ReactNode;
    autofocus?: boolean
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
        <div className={classNames(cls.Input, {[cls.focused]: focused}, [className])}>
            <input
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                type={type}
                onFocus={() => {setFocused(true)}}
                onBlur={() => {setFocused(false)}}
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