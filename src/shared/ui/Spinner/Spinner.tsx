import {classNames} from "shared/lib/classNames";
import cls from './Spinner.module.scss'

export interface ISpinnerProps {
    className?: string;
    size?: "l" | "xl" | "m" | "s";
    color?: "default" | "inverted"
}

export const Spinner = ( props: ISpinnerProps ) => {
    const { className, size = "l", color = "default" } = props;
    return (
        <div className={classNames(cls.Spinner, {}, [ className, cls[size], cls[color] ])} />
    );
};