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
    apiCall: (name: string, background_color: string, text_color: string) => void;
    onClose: () => void;
}

const CreateTagModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        onClose,} = props;

    const [submittedColor, setSubmittedColor] = useState("");
    const [submittedTextColor, setSubmittedTextColor] = useState("");
    const [submittedName, setSubmittedName] = useState("");


    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.CreateTagModal}>
                    <Input placeholder={"Введите название темы"} onChange={setSubmittedName} className={cls.Input} value={submittedName}/>
                    <Input placeholder={"Введите хэш код цвета текста с #"} onChange={setSubmittedTextColor} className={cls.Input} value={submittedTextColor}/>
                    <Input placeholder={"Введите хэш код цвета темы с #"} onChange={setSubmittedColor} className={cls.Input} value={submittedColor}/>
                    <Button onClick={() => apiCall(submittedName, submittedColor, submittedTextColor)} className={cls.btn}> Отправить </Button>
                    <Button className={cls.btn} onClick={()=> {
                        setSubmittedColor("")
                        setSubmittedName("")
                        setSubmittedTextColor("")
                    }}> Очистить </Button>
                </div>
            </Modal>
    );
});
CreateTagModal.displayName = "CreateTagModal";

export {CreateTagModal};