import {FC, memo, useEffect, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from "./ViewCommentsPostModal.module.scss";
import {useSelector} from "react-redux";
import {postSelectors} from "entities/Post/model/selectors/postSelectors";
import {Spinner} from "shared/ui/Spinner/Spinner";
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
    apiCall: (comment_id: number) => void;
    deleteApiCall: (comment_id: number) => void;
    onClose: () => void;
}

const ViewCommentsPostModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        deleteApiCall,
        onClose,} = props;
    const isPostLoading = useSelector(postSelectors.getIsPostLoading);
    const comments = useSelector(postSelectors.checkComments);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(postActions.checkComments());
    }, [dispatch]);


    function renderComment(comment: Comment) {
        return <CommentNode comment={comment} role={1} apiCall={apiCall} deleteApiCall={deleteApiCall}/>
    }

    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                {!isPostLoading ?
                    <div className={classNames(cls.PostModal, {}, [className])}>
                        <div className={cls.contentBlock}>
                            {
                                comments ? comments.map( comment => renderComment(comment)) : "комментариев нет"
                            }
                        </div>

                    </div>
                    : <Spinner className={cls.Spinner}/>
                }
            </Modal>
    );
});
ViewCommentsPostModal.displayName = "ViewCommentsPostModal";

export {ViewCommentsPostModal};