import {classNames} from "shared/lib/classNames";
import cls from './PageNotFound.module.scss';
import {Spinner} from "shared/ui/Spinner/Spinner";

export interface IPageNotFoundProps {
    className?: string;
}

export const PageNotFound = ( { className }: IPageNotFoundProps ) => {
    return (
        <div className={classNames(cls.PageNotFound, {}, [className])}>
            <h2>404</h2>
            <div>page not found</div>
        </div>
    );
};