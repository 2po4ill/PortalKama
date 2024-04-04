import {classNames} from "shared/lib/classNames";
import cls from './ArticlesPage.module.scss'
import {memo} from "react";

export interface IArticlesPageProps {
    className?: string;
}

const ArticlesPage = ( props: IArticlesPageProps ) => {
    const { className } = props;

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            ArticlesPage
        </div>
    );
};

export default memo(ArticlesPage);