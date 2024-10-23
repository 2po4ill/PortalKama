import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./CreatePostModal.module.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {Tag} from "entities/Post/model/types/post";
import {Text} from "shared/ui/Text/Text";


interface IPostModalProps {
    className?: string;
    tags: Tag[];
    isOpen: boolean;
    apiCall: (title: string, text: string, images: string[], tags: number[]) => void;
    onClose: () => void;
}

const CreatePostModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        tags,
        onClose,} = props;

    const [submittedTitle, setSubmittedTitle] = useState("");
    const [submittedText, setSubmittedText] = useState("");
    const [submittedImg, setSubmittedImg] = useState("");
    const [submittedTags, setSubmittedTags] = useState<number[]>([])

    const [inputStatus, setInputStatus] = useState(false)

    const renderInput = () => {
        return <div>
            <Input placeholder={"Введите url адрес изображения"} onChange={setSubmittedImg}/>
            <Button onClick={() => setInputStatus(false)}> Убрать изображение </Button>
            </div>
    }

    const addTag = (tag: Tag) => {
        const newList: number[] = []
        let tracker = false
        submittedTags.map(tagsObject => tag.tag_id == tagsObject ? tracker = true : newList.push(tagsObject))
        if (!tracker) {
            newList.push(tag.tag_id)
        }
        setSubmittedTags(newList)
    }


    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <Input placeholder={"Введите заголовок новости"} onChange={setSubmittedTitle}/>
                <Input placeholder={"Введите текст новости"} onChange={setSubmittedText}/>
                <div className={cls.ImageSet}>
                    {inputStatus ? null : <Button onClick={() => setInputStatus(true)}> Добавить изображение </Button>}
                    {inputStatus ? renderInput() : null}
                </div>
                <Text title={"Добавить темы к новости"}/>
                {tags.map(tag =>
                    <div style={{background: tag.color}} className={cls.tag}>
                        <input type={"checkbox"} className={cls.Input} name={tag.name} onChange={() => addTag(tag)}/>
                        <label> {tag.name} </label>
                    </div>)
                }
                <Button onClick={() => apiCall(submittedTitle, submittedText, [submittedImg], submittedTags)}> Отправить </Button>
                <Button> Очистить </Button>
            </Modal>
    );
});
CreatePostModal.displayName = "CreatePostModal";

export {CreatePostModal};