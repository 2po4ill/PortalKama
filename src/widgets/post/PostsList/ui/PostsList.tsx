import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostsList.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";

interface IPostsListProps {
    className?: string;
    posts: Post[];
}

const PostsList: FC<IPostsListProps> = memo((props) => {
    const { className , posts} = props;


    return (
        <div className={classNames(cls.PostsList, {}, [className])}>
            <div className={cls.listContainer}>
                {
                    posts.map(e => (
                        <PostListItem post={e} key={e.post_id} />
                    ))
                }
            </div>
        </div>
    );
})
PostsList.displayName = "PostsList";

export { PostsList }