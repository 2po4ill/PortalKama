import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostsList.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";

interface IPostsListProps {
    className?: string;
}

const PostsList: FC<IPostsListProps> = memo((props) => {
    const { className } = props;

    const posts = new Array(10).fill(0).map((e, i) => {
        return {
            id: String(i),
            title: `Новость №${i}`,
            text: "Текст для новости",
            img: [""]
        } as Post
    })

    return (
        <div className={classNames(cls.PostsList, {}, [className])}>
            <div className={cls.listContainer}>
                {
                    posts.map(e => (
                        <PostListItem post={e} key={e.id} />
                    ))
                }
            </div>
        </div>
    );
})
PostsList.displayName = "PostsList";

export { PostsList }