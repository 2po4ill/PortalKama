import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostListItem.module.scss";
import {Text} from "shared/ui/Text/Text";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {Post} from "entities/Post";
import placeHolder from "shared/assets/placeholder-image.webp"

interface IPostListItemProps {
    className?: string;
    post: Post
}

const PostListItem: FC<IPostListItemProps> = memo((props) => {
    const { className, post } = props;
    const { title, text, images } = post;

    return (
        <article className={classNames(cls.PostListItem, {}, [className])}>

            <div className={cls.collage}>
                <img src={imageSrc(images[0])} onError={({currentTarget}) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = placeHolder;
                        }}/>
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