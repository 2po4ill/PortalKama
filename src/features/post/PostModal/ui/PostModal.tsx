import {FC, memo} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from "./PostModal.module.scss";

interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

const PostModal: FC<IPostModalProps> = memo((props) => {
    const { className, isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={classNames(cls.PostModal, {}, [className])}>
                PostModal
            </div>
        </Modal>
    );
});
PostModal.displayName = "PostModal";

export { PostModal };