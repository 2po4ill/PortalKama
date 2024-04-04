import {FC, memo} from "react";
import cls from "./PostsAside.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";
import {Input, InputTheme} from "shared/ui/Input/Input";
import Calendar from "shared/assets/icons/calendar.svg";
import ArrowDown from "shared/assets/icons/arrow-down-bold.svg"
import {Button, ButtonTheme} from "shared/ui/Button/Button";

interface IPostsAsideProps {
    className?: string;
}

const PostsAside: FC<IPostsAsideProps> = memo(props => {
    const { className } = props;

    return (
        <div className={classNames(cls.PostsAside, {}, [className])}>
            <div className={cls.content}>

                <div className={cls.selectorsBlock}>
                    <div className={cls.searchByTag}>
                        <Text title={"Поиск по тегам"}/>
                        <Input disabled placeholder={"Выберете из списка"} theme={InputTheme.BORDERED}
                               adornment={<ArrowDown/>}/>
                        {/*<select >*/}
                        {/*    <option value="#" hidden>Выберете из списка</option>*/}
                        {/*    <option value={1}>Тег #1</option>*/}
                        {/*</select>*/}
                    </div>
                    <div className={cls.searchByDate}>
                        <Text className={cls.title} title={"По дате"}/>
                        <div className={cls.textBlock}>
                            <Text text={"C"} className={cls.text}/>
                            <Text text={"По"} className={cls.text}/>
                        </div>
                        <div className={cls.inputBlock}>
                            <Input className={cls.calendar} placeholder={"ДД.ММ.ГГГГ"} theme={InputTheme.BORDERED}
                                   adornment={<Calendar/>}/>
                            <Input className={cls.calendar} placeholder={"ДД.ММ.ГГГГ"} theme={InputTheme.BORDERED}
                                   adornment={<Calendar/>}/>
                        </div>
                        <div className={cls.buttonWrapper}>
                            <Button theme={ButtonTheme.INHERIT} >
                                <Text text={"сброс"} />
                            </Button>
                        </div>
                    </div>
                    <div className={cls.searchByContent}>
                        <Text title={"По содержанию"}/>
                        <Input  theme={InputTheme.BORDERED} placeholder={"Текст для поиска"} />
                    </div>
                    <div className={cls.buttonWrapper}>
                        <Button >
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