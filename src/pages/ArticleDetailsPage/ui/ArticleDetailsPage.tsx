import {classNames} from "shared/lib/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {memo} from "react";

export interface IArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: IArticleDetailsPageProps ) => {
    const { className } = props;

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            ArticleDetailsPage
        </div>
    );
};

export default memo(ArticleDetailsPage);