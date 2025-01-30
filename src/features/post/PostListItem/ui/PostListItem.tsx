import {CSSProperties, Dispatch, FC, memo, SetStateAction} from "react";
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
import {Button} from "shared/ui/Button/Button";
import like from "shared/assets/icons/like.png"
import comment from "shared/assets/icons/comment.png"
import user_pic from "shared/assets/icons/userpic.png"

interface IPostListItemProps {
    className?: string;
    post: Post,
    role?: number,
    postClickHandler: () => void;
    setSelectedPost: (post: Post | undefined) => void;
}

const PostListItem: FC<IPostListItemProps> = memo((props) => {
    const { className,
        post ,
        role,
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
        likes_amount,
        views} = post;


    const date = new Date(creation_date)


    const background = `url(${post.images ? post.images[0]: placeHolder})`

    const newLineText = (text: string) => {
            return <div>
                {text.split('new_string').map(line => line != "" ? <text className={cls.Text}> {line} </text> : <br></br>)}
            </div>
    }
    return (
        <article className={classNames(cls.PostListItem, {}, [className])} style={{backgroundImage: background, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
                 onClick={() => {
                     dispatch(postActions.getPost(post_id))
                     setSelectedPost(post)
                     postClickHandler()
        }}>
            <div className={cls.post_info}>
                <img src={like} alt={"like"}/>
                <h1> {likes_amount ? likes_amount : 0} </h1>
                <img src={user_pic}/>
                <h1> {views ? views: 0} </h1>
                <img src={comment}/>
                <h1> {0} </h1>
            </div>
            <div className={cls.gradient}>
                <div className={cls.contentBlock}>
                    <header className={cls.Title}> {title} </header>
                    {newLineText(text)}
                    {tags?.map(tag => <div style={{background: tag.background_color, color: tag.text_color}} className={cls.tag}>
                        <label> {tag.name} </label>
                    </div>)}
                </div>

                <div className={cls.footer}>
                    <div className={cls.footer_content}>
                        <label> {date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString()} </label>
                    </div>
                </div>
            </div>

        </article>
    );
});
PostListItem.displayName = "PostListItem";

export {PostListItem};