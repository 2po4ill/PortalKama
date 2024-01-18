import {classNames} from "shared/lib/classNames";
import cls from './PageLoader.module.scss';
import {Spinner} from "shared/ui/Spinner/Spinner";

export interface IPageLoaderProps {
    className?: string;
}

export const PageLoader = ( { className }: IPageLoaderProps ) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Spinner size={"xl"} />
        </div>
    );
};