import {FC, memo, ReactElement} from "react";
import cls from "./ReservationPageLayout.module.scss";
import {classNames} from "shared/lib/classNames";

interface ReservationPageLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    aside: ReactElement;
}

const ReservationPageLayout: FC<ReservationPageLayoutProps> = memo(props => {
    const { className, content, header, aside } = props;

    return (
        <div className={classNames(cls.PostsPageLayout, {}, [className])}>
            <div className={cls.header}>{header}</div>
            <div className={cls.body}>
                <div className={cls.map}>{content}</div>
                <div className={cls.aside}>{aside}</div>
            </div>
        </div>
    );
});
ReservationPageLayout.displayName = "ReservationPageLayout";

export {ReservationPageLayout};