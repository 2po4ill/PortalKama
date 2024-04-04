import {FC, memo} from "react";
import cls from "./PostsHeader.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";

interface IPostsHeaderProps {
    className?: string;
}

const PostsHeader: FC<IPostsHeaderProps> = memo(props => {
    const { className } = props;

    return (
        <div className={classNames(cls.PostsHeader, {}, [className])}>
            <div className={cls.content}>
                Новости
            </div>
        </div>
    );
});
PostsHeader.displayName = "PostsHeader";

export {PostsHeader}