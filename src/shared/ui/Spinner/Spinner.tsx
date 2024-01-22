import {classNames} from "shared/lib/classNames";
import cls from './Spinner.module.scss'

export interface ISpinnerProps {
    className?: string;
    size?: "l" | "xl" | "m"
}

export const Spinner = ( props: ISpinnerProps ) => {
    const { className, size = "l" } = props;
    return (
        <div className={classNames(cls.Spinner, {}, [className, cls[size]])} />
    );
};