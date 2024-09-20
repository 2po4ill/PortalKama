import {Dispatch, FC, memo, SetStateAction} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostsList.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";
import {IShopItem} from "entities/Product/model/types/product";

interface IPostsListProps {
    className?: string;
    posts: Post[];
    postClickHandler: () => void;
    setSelectedPost: (post: Post | undefined) => void;
}

const PostsList: FC<IPostsListProps> = memo((props) => {
    const { className ,
        posts,
        postClickHandler,
        setSelectedPost} = props;



    return (
        <div className={classNames(cls.PostsList, {}, [className])}>
            <div className={cls.listContainer}>
                {
                    posts ? posts.map(e => (
                        <PostListItem post={e} key={e.post_id} postClickHandler={postClickHandler} setSelectedPost={setSelectedPost}/>
                    )) : "Новостей не найдено"
                }
            </div>
        </div>
    );
})
PostsList.displayName = "PostsList";

export { PostsList }