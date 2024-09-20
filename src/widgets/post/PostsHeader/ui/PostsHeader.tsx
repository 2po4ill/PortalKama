import {FC, memo, useEffect, useRef, useState} from "react";
import cls from "./PostsHeader.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";

interface IPostsHeaderProps {
    className?: string;
}

const PostsHeader: FC<IPostsHeaderProps> = memo(props => {
    const { className } = props;
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {
        timerRef.current = setTimeout(function tick(){
            setCurrentDate(new Date());
            timerRef.current = setTimeout(tick, 1000)
        }, 1000);

        return () => {
            clearTimeout(timerRef.current);
        }
    }, [setCurrentDate]);

    const currentDayOfTheWeek = (date: Date) => {
        switch (date.getDay()){
            case 0:
                return "Воскресение"
            case 1:
                return "Понедельник"
            case 2:
                return "Вторник"
            case 3:
                return "Среда"
            case 4:
                return "Четверг"
            case 5:
                return "Пятница"
            case 6:
                return "Суббота"
        }
    }

    const currentCalendarDate = (date: Date) => {
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    }

    return (
        <div className={classNames(cls.PostsHeader, {}, [className])}>
            <div className={cls.content}>
                <div className='text'>
                    <div>
                        <label> НОВОСТИ </label>
                    </div>
                    <div>
                        <a> {currentDayOfTheWeek(currentDate)} </a>
                    </div>
                    <a> {currentCalendarDate(currentDate)} </a>
                    <a> {currentDate.getHours() + ':' + currentDate.getMinutes()} </a>
                </div>
            </div>
        </div>
    );
});
PostsHeader.displayName = "PostsHeader";

export {PostsHeader}