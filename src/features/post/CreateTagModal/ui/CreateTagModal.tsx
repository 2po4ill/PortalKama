import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./CreateTagModal.module.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {Tag} from "entities/Post/model/types/post";
import {Text} from "shared/ui/Text/Text";


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    apiCall: (name: string, color: string) => void;
    onClose: () => void;
}

const CreateTagModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        onClose,} = props;

    const [submittedColor, setSubmittedColor] = useState("");
    const [submittedName, setSubmittedName] = useState("");


    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <Input placeholder={"Введите название темы"} onChange={setSubmittedName}/>
                <Input placeholder={"Введите хэш код цвета темы с #"} onChange={setSubmittedColor}/>
                <Button onClick={() => apiCall(submittedName, submittedColor)}> Отправить </Button>
                <Button> Очистить </Button>
            </Modal>
    );
});
CreateTagModal.displayName = "CreateTagModal";

export {CreateTagModal};