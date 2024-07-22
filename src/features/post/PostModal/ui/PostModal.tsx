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


    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false} >
            <Modal isOpen={isOpen} onClose={onClose}>
                {!isPostLoading ?
                    <div className={classNames(cls.PostModal, {}, [className])}>
                        {selectedPost?.text}
                    </div>
                    : <Spinner/>
                }
            </Modal>
        </AsyncReducerProvider>
    );
});
PostModal.displayName = "PostModal";

export {PostModal};