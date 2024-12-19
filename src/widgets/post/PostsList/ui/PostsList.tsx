import {Dispatch, FC, memo, SetStateAction, useState} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostsList.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";
import {IShopItem} from "entities/Product/model/types/product";
import {Button} from "shared/ui/Button/Button";
import {PostModal} from "features/post/PostModal";
import {CreatePostModal} from "features/post/CreatePostModal";
import {Comment, Tag} from "entities/Post/model/types/post";
import {ViewCommentsPostModal} from "features/post/ViewCommentsPostModal";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {postActions} from "entities/Post/model/slice/postSlice";

interface IPostsListProps {
    className?: string;
    posts: Post[];
    postClickHandler: () => void;
    apiCall: (title: string, text: string, images: File | undefined, tags: number[]) => void;
    deleteApiCall: (comment_id: number) => void;
    approveCommentApiCall: (comment_id: number) => void;
    setSelectedPost: (post: Post | undefined) => void;
    role?: number;
    tags: Tag[];
    comments?: Comment[];
}

const PostsList: FC<IPostsListProps> = memo((props) => {
    const { className ,
        posts,
        role,
        apiCall,
        postClickHandler,
        approveCommentApiCall,
        tags,
        setSelectedPost,
        comments,
    deleteApiCall} = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const dispatch = useAppDispatch();

    return (
        <div className={classNames(cls.PostsList, {}, [className])}>
            { role == 1 ?
            <div className={cls.contentCreatorBlock}>
                <Button onClick={() => setModalIsOpen(true)}> Создать запись </Button>
                <Button onClick={() => { dispatch(postActions.checkComments());
                    setModalIsOpen1(true)}}> Модерация комментариев {comments ? "(+" + comments.length.toString() + ")" : ""}</Button>
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
            <ViewCommentsPostModal isOpen={modalIsOpen1} onClose={() => {setModalIsOpen1(false);}} apiCall={approveCommentApiCall} deleteApiCall={deleteApiCall}/>
        </div>
    );
})
PostsList.displayName = "PostsList";

export { PostsList }