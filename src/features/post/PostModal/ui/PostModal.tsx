import {FC, memo} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from "./PostModal.module.scss";
import {useSelector} from "react-redux";
import {postSelectors} from "entities/Post/model/selectors/postSelectors";
import {postActions, postReducer} from "entities/Post/model/slice/postSlice";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {Post} from "entities/Post";


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

    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                {!isPostLoading ?
                    <div className={classNames(cls.PostModal, {}, [className])}>
                        {post?.postDesc?.text}
                    </div>
                    : <Spinner/>
                }
            </Modal>
    );
});
PostModal.displayName = "PostModal";

export {PostModal};