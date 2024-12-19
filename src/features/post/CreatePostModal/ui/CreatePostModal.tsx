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
    apiCall: (title: string, text: string, images: File | undefined, tags: number[]) => void;
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
    const [submittedImg, setSubmittedImg] = useState<File>();
    const [submittedTags, setSubmittedTags] = useState<number[]>([])

    const [inputStatus, setInputStatus] = useState(false)

    const onChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            setSubmittedImg(files[0])
        }
    }

    const renderInput = () => {
        return <div className={cls.renderedInput}>
                <input placeholder={"Выберите файл"} className={cls.Input} type={"file"} onChange={onChange}/>
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
    const formatString = () => {
        return listener().replace(/"/g, "ˮ").replace(/(\r\n|\n|\r)/gm, "new_string")
    }

    const listener = () => {
        const textareaElement = document.getElementById('text') as HTMLTextAreaElement;
        return textareaElement.value;
    }
    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                <div className={cls.CreatePostModal}>
                        <Input placeholder={"Введите заголовок новости"} onChange={setSubmittedTitle} className={cls.Input} value={submittedTitle}/>
                        <textarea placeholder={"Введите текст новости"} id={"text"}></textarea>
                        <div className={cls.ImageSet}>
                            {inputStatus ? null : <Button onClick={() => setInputStatus(true)}> Добавить изображение </Button>}
                            {inputStatus ? renderInput() : null}
                        </div>
                        <Text title={"Добавить темы к новости"}/>
                        <div className={cls.tags}>
                        {tags.map(tag =>
                            <div style={{background: tag.background_color, color: tag.text_color}} className={cls.tag}>
                                <input type={"checkbox"} name={tag.name} onChange={() => addTag(tag)}/>
                                <label className={cls.tagName}> {tag.name} </label>
                            </div>)
                        }
                        </div>
                        <Button className={cls.btn} onClick={() => apiCall(submittedTitle.replace(/"/g, 'ˮ'),  formatString(), submittedImg, submittedTags)}> Отправить </Button>
                        <Button className={cls.btn} onClick={() => {
                            setSubmittedTags([])
                            setSubmittedImg(undefined)
                            setSubmittedText("")
                            setSubmittedTitle("")
                        }}> Очистить </Button>
                </div>
            </Modal>
    );
});
CreatePostModal.displayName = "CreatePostModal";

export {CreatePostModal};