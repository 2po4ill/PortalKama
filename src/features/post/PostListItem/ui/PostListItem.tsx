import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostListItem.module.scss";
import {Text} from "shared/ui/Text/Text";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {Post} from "entities/Post";

interface IPostListItemProps {
    className?: string;
    post: Post
}

const PostListItem: FC<IPostListItemProps> = memo((props) => {
    const { className, post } = props;
    const { title, text, img } = post;

    return (
        <article className={classNames(cls.PostListItem, {}, [className])}>

            <div className={cls.collage}>
                <img src={imageSrc(img[0])} alt="Коллаж"/>
            </div>

            <div className={cls.contentBlock}>
                <Text
                    title={title}
                    text={text}
                />
            </div>
        </article>
    );
});
PostListItem.displayName = "PostListItem";

export {PostListItem};