import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./EditTagsModal.module.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {Tag} from "entities/Post/model/types/post";
import {Text} from "shared/ui/Text/Text";
import {CreateTagModal} from "features/post/CreateTagModal";
import {EditTagModal} from "features/post/EditTagModal";


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    apiCall: (tag_id: number, name: string, background_color: string, text_color: string) => void;
    dropApiCall: (tag_id: number) => void;
    onClose: () => void;
    tags: [] | Tag[];
}

const EditTagsModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        tags,
        onClose,
        dropApiCall} = props;

    const [submittedId, setSubmittedId] = useState(0);
    const [submittedColor, setSubmittedColor] = useState("");
    const [submittedTextColor, setSubmittedTextColor] = useState("");
    const [submittedName, setSubmittedName] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);


    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.CreateTagModal}>
                    {tags.map(tag =>
                        <div style={{background: tag.background_color, color: tag.text_color}} className={cls.tag}>
                            <label> {tag.name} </label>
                            <Button onClick={() => {
                                setSubmittedId(tag.tag_id)
                                setSubmittedColor(tag.background_color)
                                setSubmittedName(tag.name)
                                setSubmittedTextColor(tag.text_color)
                                setModalIsOpen(true)
                            }}> Изменить </Button>
                            <Button onClick={() => {dropApiCall(tag.tag_id)}}> Удалить </Button>
                        </div>)
                    }
                </div>
                <EditTagModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false);}} apiCall={apiCall}
                tag_id={submittedId}
                color={submittedColor}
                text_color={submittedTextColor}
                name={submittedName}/>
            </Modal>
    );
});
EditTagsModal.displayName = "EditTagsModal";

export {EditTagsModal};