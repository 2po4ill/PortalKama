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
    apiCall: (post_id: number, title: string,text: string, images: string[], tags: number[]) => void;
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
    const [submittedImg, setSubmittedImg] = useState(post.images ? post.images[0] : "");
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


    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className={cls.EditPostModal}>
                    <Text text={"Заголовок"}/>
                    <Input placeholder={"Введите заголовок новости"} onChange={setSubmittedTitle} value={submittedTitle} className={cls.Input} />
                    <Text text={"Текст"}/>
                    <Input placeholder={"Введите текст новости"} onChange={setSubmittedText} value={submittedText} className={cls.Input}/>
                    <Text text={"Изображение"}/>
                    <Input placeholder={"Введите url адрес изображения"} onChange={setSubmittedImg} value={submittedImg} className={cls.Input}/>
                    <Text title={"Темы к новости"}/>
                    <div className={cls.tags}>
                        {tags.map(tag =>
                            <div style={{background: tag.background_color, color: tag.text_color}} className={cls.tag}>
                                <input type={"checkbox"} name={tag.name} onChange={() => addTag(tag)} checked={!!post.tags.find(confirmedTag => confirmedTag == tag.tag_id)}/>
                                <label className={cls.tagName}> {tag.name} </label>
                            </div>)
                        }
                    </div>
                    <Button className={cls.btn} onClick={() => apiCall(post.post_id, submittedTitle, submittedText, [submittedImg], submittedTags)}> Отправить </Button>
                    <Button className={cls.btn} onClick={() => {
                        setSubmittedImg("")
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