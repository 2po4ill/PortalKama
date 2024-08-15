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
}

const PostsAside: FC<IPostsAsideProps> = memo(props => {
    const { className,
    setSelectedDateStart,
    setSelectedDateEnd,
    selectedDateStart,
    selectedDateEnd,
    tags} = props;

    return (
        <div className={classNames(cls.PostsAside, {}, [className])}>
            <div className={cls.content}>

                <div className={cls.selectorsBlock}>
                    <div className={cls.searchByTag}>
                        <Text title={"Поиск по тегам"}/>
                    {/*    сделать checkbox'ы*/}
                        {tags.map(tag => <a> {tag.name} {tag.color} </a>)}
                    </div>
                    <div className={cls.searchByDate}>
                        <Text className={cls.title} title={"По дате"}/>
                        <div className={cls.textBlock}>
                            <Text text={"C"} className={cls.text}/>
                            <Text text={"По"} className={cls.text}/>
                        </div>
                        <div className={cls.inputBlock}>
                            <PostCalendarInput selectedDate={selectedDateStart} setSelectedDate={setSelectedDateStart}/>
                            <PostCalendarInput selectedDate={selectedDateEnd} setSelectedDate={setSelectedDateEnd}/>
                        </div>
                    </div>
                    <div className={cls.buttonWrapper}>
                        <Button className={cls.btn}>
                            Сброс
                        </Button>
                        <Button className={cls.btn}>
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