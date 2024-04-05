import {FC, memo, ReactElement} from "react";
import cls from "./PostsPageLayout.module.scss";
import {classNames} from "shared/lib/classNames";

interface PostsPageLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    aside: ReactElement;
}

const PostsPageLayout: FC<PostsPageLayoutProps> = memo(props => {
    const { className, content, header, aside } = props;

    return (
        <div className={classNames(cls.PostsPageLayout, {}, [className])}>
            <div className={cls.header}>{header}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.aside}>{aside}</div>
        </div>
    );
});
PostsPageLayout.displayName = "PostsPageLayout";

export {PostsPageLayout};