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
import {Comment} from "entities/Post/model/types/post";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {postActions} from "entities/Post/model/slice/postSlice";


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    selectedPost: Post | undefined;
}

const PostModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        onClose,
    selectedPost} = props;
    const isPostLoading = useSelector(postSelectors.getIsPostLoading);
    const selectedDesc = useSelector(postSelectors.getPost);
    const dispatch = useAppDispatch();

    const [submittedText, setSubmittedText] = useState("");

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
                            <img src={imageSrc(post ? post.images[0] : placeHolder)} onError={({currentTarget}) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = placeHolder;
                            }}/>
                        </div>

                        <div className={cls.contentBlock}>
                            <Text
                                title={post?.title}
                                text={post?.postDesc ? post?.postDesc?.text : post?.text}
                            />
                        </div>

                        <div className={cls.footer}>
                            <Input placeholder={"Оставьте комментарий"} onChange={setSubmittedText} className={cls.inputComment} adornment={<Button className={cls.btn} onClick={() => { dispatch(postActions.addComment({post_id: post?.post_id, body: submittedText})) }}> Отправить </Button>}/>
                            <div className={cls.CommentSection}>
                                {post?.postDesc?.comments ? post?.postDesc?.comments.map(comment => renderComment(comment)): "Здесь пока нет комментариев, оставьте его первым!"}
                            </div>
                        </div>
                    </div>
                    : <Spinner/>
                }
            </Modal>
    );
});
PostModal.displayName = "PostModal";

export {PostModal};