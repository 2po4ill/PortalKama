import {classNames} from "shared/lib/classNames";
import cls from './InDevelopmentLoader.module.scss';
import {Spinner} from "shared/ui/Spinner/Spinner";

export interface IPageLoaderProps {
    className?: string;
}

export const InDevelopmentLoader = ({ className }: IPageLoaderProps ) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <label> В РАЗРАБОТКЕ </label>
            <Spinner size={"xl"} />
        </div>
    );
};