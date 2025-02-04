import {FC, memo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./EditPostModal.module.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {Tag} from "entities/Post/model/types/post";
import {Text} from "shared/ui/Text/Text";


interface IPostModalProps {
    className?: string;
    tags: Tag[];
    post: {post_id: number, title: string,text: string, images: string[], tags: number[]};
    isOpen: boolean;
    apiCall: (post_id: number, title: string,text: string, images: File | undefined, tags: number[]) => void;
    onClose: () => void;
}

const EditPostModal: FC<IPostModalProps> = memo((props) => {
    const { className,
        isOpen,
        apiCall,
        tags,
        post,
        onClose,} = props;

    const [submittedTitle, setSubmittedTitle] = useState(post.title);
    const [submittedText, setSubmittedText] = useState(post.text);
    const [submittedImg, setSubmittedImg] = useState<File>();
    const [submittedTags, setSubmittedTags] = useState<number[]>(post.tags ? post.tags : [])

    const addTag = (tag: Tag) => {
        const newList: number[] = []
        let tracker = false
        submittedTags.map(tagsObject => tag.tag_id == tagsObject ? tracker = true : newList.push(tagsObject))
        if (!tracker) {
            newList.push(tag.tag_id)
        }
        setSubmittedTags(newList)
    }

    const onChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            setSubmittedImg(files[0])
        }
    }

    const listener = () => {
        const textareaElement = document.getElementById('text') as HTMLTextAreaElement;
        return textareaElement.value;
    }

    const formatString = () => {
        return listener().replace(/"/g, "ˮ").replace(/(\r\n|\n|\r)/gm, "new_string")
    }

    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className={cls.EditPostModal}>
                    <Text text={"Заголовок"}/>
                    <Input placeholder={"Введите заголовок новости"} onChange={setSubmittedTitle} value={submittedTitle}
                           className={cls.Input}/>
                    <Text text={"Текст"}/>
                    <textarea placeholder={"Введите текст новости"} id={"text"}></textarea>
                    <Text text={"Изображение"}/>
                    <input placeholder={"Выберите файл"} className={cls.Input} type={"file"} onChange={onChange}/>
                    <Text title={"Темы к новости"}/>
                    <div className={cls.tags}>
                        {tags.map(tag =>
                            <div style={{background: tag.background_color, color: tag.text_color}} className={cls.tag}>
                                <input type={"checkbox"} name={tag.name} onChange={() => addTag(tag)}
                                       checked={!!post.tags.find(confirmedTag => confirmedTag == tag.tag_id)}/>
                                <label className={cls.tagName}> {tag.name} </label>
                            </div>)
                        }
                    </div>
                    <Button className={cls.btn}
                            onClick={() => apiCall(post.post_id, submittedTitle.replace(/"/g, "ˮ"), formatString(), submittedImg, submittedTags)}> Отправить </Button>
                    <Button className={cls.btn} onClick={() => {
                        setSubmittedImg(undefined)
                        setSubmittedText("")
                        setSubmittedTitle("")
                        setSubmittedTags([])
                    }}> Очистить </Button>
                </div>
            </Modal>
    );
});
EditPostModal.displayName = "EditPostModal";

export {EditPostModal};