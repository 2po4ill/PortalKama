import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from "./PostModal.module.scss";
import {useSelector} from "react-redux";
import {postSelectors} from "entities/Post/model/selectors/postSelectors";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {Post} from "entities/Post";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import placeHolder from "shared/assets/placeholder-image.webp";
import {Text} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {CommentNode} from "shared/ui/Comment/Comment";
import {Comment, Tag} from "entities/Post/model/types/post";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {postActions} from "entities/Post/model/slice/postSlice";
import {CreatePostModal} from "features/post/CreatePostModal";
import {EditPostModal} from "features/post/EditPostModal";


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    selectedPost: Post | undefined;
    deleteApiCall: (post_id: number) => void;
    editApiCall: (post_id: number, title: string, text: string, images: string[], tags: number[]) => void;
    role?: number;
    tags: Tag[];
}

const PostModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        onClose,
        deleteApiCall,
        role,
        tags,
        editApiCall,
    selectedPost} = props;
    const isPostLoading = useSelector(postSelectors.getIsPostLoading);
    const selectedDesc = useSelector(postSelectors.getPost);
    const dispatch = useAppDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [submittedText, setSubmittedText] = useState("");

    let postApi = {
        post_id: 0,
        title: "",
        text: "",
        images: [""],
        tags: [0]
    }

    let post: Post | undefined;
    if (selectedPost) {
        post = {
            post_id: selectedPost.post_id,
            images: selectedPost.images,
            title: selectedPost.title,
            text: selectedPost.text,
            likes_amount: selectedPost.likes_amount,
            tags: selectedPost.tags,
            creation_date: selectedPost.creation_date,
            update_date: selectedPost.update_date,
            postDesc: selectedDesc
        }

        const newList: number[] = []

        selectedPost.tags ? selectedPost.tags.map(tag => newList.push(tag.tag_id)) : null

        postApi = {
            post_id: selectedPost.post_id,
            title: selectedPost.title,
            text: selectedPost.text,
            images: selectedPost.images,
            tags: newList
        }
    } else {
        post = undefined
    }

    function renderComment(comment: Comment) {
        return <CommentNode comment={comment}/>
    }

    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                {!isPostLoading ?
                    <div className={classNames(cls.PostModal, {}, [className])}>

                        <div className={cls.collage}>
                            <img src={imageSrc(post && post.images ? post.images[0] : placeHolder)} onError={({currentTarget}) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = placeHolder;
                            }}/>
                        </div>

                        <div className={cls.contentBlock}>
                            <Text
                                title={post?.title}
                                text={post?.postDesc ? post?.postDesc?.text : post?.text}
                            />
                            <a> Темы: {post?.tags?.map(tag => tag.name + " ")}</a>
                            {role == 1 ?
                                <div>
                                    <Button onClick={() =>
                                    {deleteApiCall(post ? post?.post_id : 0)
                                     onClose()}}>
                                        Удалить новость </Button>
                                    <Button onClick={() =>
                                    {setModalIsOpen(true)}}> Редактировать новость </Button>
                                </div>
                            : null}
                        </div>
                        <EditPostModal tags={tags} isOpen={modalIsOpen} apiCall={editApiCall} onClose={() => setModalIsOpen(false)} post={postApi}/>

                        <div className={cls.footer}>
                            <Text title={"Комментарии"}/>
                            <div className={cls.inputWrapper}>
                                <Input
                                    placeholder={"Оставьте комментарий"}
                                    onChange={setSubmittedText}
                                    className={cls.inputComment}
                                    placeholderPosition={"start"}
                                />
                                <Button
                                    className={cls.btn} onClick={() => {
                                        // Обработчик лучше вынести в отдельную переменную
                                        dispatch(postActions.addComment({post_id: post?.post_id, text: submittedText}))
                                        setSubmittedText("")
                                        dispatch(postActions.getPost(post?.post_id))
                                    }}
                                > Отправить </Button>
                            </div>
                            <div className={cls.CommentSection}>
                                {post?.postDesc?.comments ? post?.postDesc?.comments.map(comment => renderComment(comment)): "Здесь пока нет комментариев, оставьте его первым!"}
                            </div>
                        </div>
                    </div>
                    : <Spinner className={cls.Spinner}/>
                }
            </Modal>
    );
});
PostModal.displayName = "PostModal";

export {PostModal};