import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./EditTagModal.module.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {Tag} from "entities/Post/model/types/post";
import {Text} from "shared/ui/Text/Text";


interface IPostModalProps {
    className?: string;
    isOpen: boolean;
    apiCall: (tag_id:number, name: string, background_color: string, text_color: string) => void;
    onClose: () => void;
    tag_id: number;
    name: string;
    color: string;
    text_color: string;
}

const EditTagModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        onClose,
        tag_id,
        name,
        color,
        text_color} = props;

    const [submittedColor, setSubmittedColor] = useState(color);
    const [submittedTextColor, setSubmittedTextColor] = useState(text_color);
    const [submittedName, setSubmittedName] = useState(name);


    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.CreateTagModal}>
                    <a> {tag_id} </a>
                    <a> {name} </a>
                    <a> {color} </a>
                    <a> {text_color} </a>
                    <Input placeholder={"Введите название темы"} onChange={setSubmittedName} className={cls.Input}
                           value={submittedName}/>
                    <Input placeholder={"Введите хэш код цвета текста с #"} onChange={setSubmittedTextColor}
                           className={cls.Input} value={submittedTextColor}/>
                    <Input placeholder={"Введите хэш код цвета темы с #"} onChange={setSubmittedColor}
                           className={cls.Input} value={submittedColor}/>
                    <Button onClick={() => apiCall(tag_id, submittedName, submittedColor, submittedTextColor)}
                            className={cls.btn}> Отправить </Button>
                    <Button className={cls.btn} onClick={() => {
                        setSubmittedColor("")
                        setSubmittedName("")
                        setSubmittedTextColor("")
                    }}> Очистить </Button>
                </div>
            </Modal>
    );
});
EditTagModal.displayName = "EditTagModal";

export {EditTagModal};