import {memo, ReactElement} from "react";
import cls from './MainLayout.module.scss';
import {classNames} from "shared/lib/classNames";
import {useLocation} from "react-router-dom";


interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, toolbar, header, sidebar } = props;
    const location = useLocation()

    const mods: Record<string, boolean> = {
        [cls.white_background]: location.pathname == "/reservation",
    };

    return (
        <div className={classNames(cls.MainLayout, mods, [className])}>
            <div className={cls.content}>{content}</div>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.header}>{header}</div>
            <div className={cls.rightbar}>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
});
