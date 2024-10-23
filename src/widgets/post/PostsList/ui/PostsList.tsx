import {Dispatch, FC, memo, SetStateAction, useState} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostsList.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";
import {IShopItem} from "entities/Product/model/types/product";
import {Button} from "shared/ui/Button/Button";
import {PostModal} from "features/post/PostModal";
import {CreatePostModal} from "features/post/CreatePostModal";
import {Tag} from "entities/Post/model/types/post";

interface IPostsListProps {
    className?: string;
    posts: Post[];
    postClickHandler: () => void;
    apiCall: (title: string, text: string, images: string[], tags: number[]) => void;
    setSelectedPost: (post: Post | undefined) => void;
    role?: number;
    tags: Tag[];
}

const PostsList: FC<IPostsListProps> = memo((props) => {
    const { className ,
        posts,
        role,
        apiCall,
        postClickHandler,
        tags,
        setSelectedPost} = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className={classNames(cls.PostsList, {}, [className])}>
            { role == 1 ?
            <div className={cls.contentCreatorBlock}>
                <Button onClick={() => setModalIsOpen(true)}> Создать запись </Button>
            </div> : null
            }
            <div className={cls.listContainer}>
                {
                    posts ? posts.map(e => (
                        <PostListItem post={e} key={e.post_id} postClickHandler={postClickHandler} setSelectedPost={setSelectedPost}/>
                    )) : "Новостей не найдено"
                }
            </div>
            <CreatePostModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false);}} apiCall={apiCall} tags={tags}/>
        </div>
    );
})
PostsList.displayName = "PostsList";

export { PostsList }