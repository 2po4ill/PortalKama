import {FC, memo} from "react";
import cls from "./PostsAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import {PostCalendarInput} from "features/post/PostCalendarInput/PostCalendarInput";
import {Tag} from "/entities/Post/model/types/post";

interface IPostsAsideProps {
    className?: string;
    setSelectedDateStart: (date: Date | undefined) => void;
    setSelectedDateEnd: (date: Date | undefined) => void;
    selectedDateStart?: Date;
    selectedDateEnd?: Date;
    tags: Tag[];
    tagList: string[] | [];
    setSelectedTags: (tags: string[] | []) => void;
    apiCall: () => void;
    apiCancel: () => void;
}

const PostsAside: FC<IPostsAsideProps> = memo(props => {
    const { className,
    setSelectedDateStart,
    setSelectedDateEnd,
    selectedDateStart,
    selectedDateEnd,
    tags,
    apiCall,
    setSelectedTags,
    tagList,
        apiCancel
    } = props;

    const addTag = (tag: Tag) => {
        const newList: string[] = []
        let tracker = false
        tagList.map(tagsObject => tag.name == tagsObject ? tracker = true : newList.push(tagsObject))
        if (!tracker) {
            newList.push(tag.name)
        }
        setSelectedTags(newList)
    }

    return (
        <div className={classNames(cls.PostsAside, {}, [className])}>
            <div className={cls.content}>

                <div className={cls.selectorsBlock}>
                    <div className={cls.searchByTag}>
                        <Text title={"Поиск по темам"}/>
                        {tags.map(tag =>
                            <div style={{background: tag.color}} className={cls.tag}>
                                <input type={"checkbox"} className={cls.Input} name={tag.name} onChange={() => addTag(tag)}/>
                                <label> {tag.name} </label>
                            </div>)
                        }
                    </div>
                    <div className={cls.searchByDate}>
                        <Text className={cls.title} title={"По дате"}/>
                        <div className={cls.textBlock}>
                            <Text text={"C"} className={cls.text}/>
                            <Text text={"По"} className={cls.text}/>
                        </div>
                        <div className={cls.inputBlock}>
                            <PostCalendarInput selectedDate={selectedDateStart} setSelectedDate={setSelectedDateStart} className={cls.CalendarInput}/>
                            <PostCalendarInput selectedDate={selectedDateEnd} setSelectedDate={setSelectedDateEnd} className={cls.CalendarInput}/>
                        </div>
                    </div>
                    <div className={cls.buttonWrapper}>
                        <Button className={cls.btn} onClick={apiCancel}>
                            Сброс
                        </Button>
                        <Button className={cls.btn} onClick={apiCall}>
                            Поиск
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
});
PostsAside.displayName = "PostsAside";

export {PostsAside}