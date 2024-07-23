import {Dispatch, FC, memo, SetStateAction} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostListItem.module.scss";
import {Text} from "shared/ui/Text/Text";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {Post} from "entities/Post";
import placeHolder from "shared/assets/placeholder-image.webp"
import {IShopItem} from "entities/Product/model/types/product";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {postActions} from "entities/Post/model/slice/postSlice";
import {useSelector} from "react-redux";
import {postSelectors} from "entities/Post/model/selectors/postSelectors";

interface IPostListItemProps {
    className?: string;
    post: Post
    postClickHandler: () => void;
    setSelectedPost: (post: Post | undefined) => void;
}

const PostListItem: FC<IPostListItemProps> = memo((props) => {
    const { className,
        post ,
        postClickHandler,
        setSelectedPost
    } = props;
    const dispatch = useAppDispatch();

    const {
        post_id,
        title,
        text,
        images,
        creation_date,
        update_date,
        tags,
        likes_amount } = post;
    return (
        <article className={classNames(cls.PostListItem, {}, [className])}
                 onClick={() => {
                     dispatch(postActions.getPost(post_id))
                     setSelectedPost(post)
                     postClickHandler()
        }}>

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

            <div className={cls.footer}>

            </div>
        </article>
    );
});
PostListItem.displayName = "PostListItem";

export {PostListItem};