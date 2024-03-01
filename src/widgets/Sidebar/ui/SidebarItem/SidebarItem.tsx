import cls from './SidebarItem.module.scss';
import {classNames} from "shared/lib/classNames";
import {AppLink} from "shared/ui/AppLink/AppLink";
import {ISidebarItem} from "../../model/sidebarItems";
import {FC, HTMLAttributes, memo} from "react";

export interface ISidebarItemProps extends HTMLAttributes<HTMLAnchorElement>{
    item: ISidebarItem;
    collapsed: boolean;
    className?: string
}

export const SidebarItem: FC<ISidebarItemProps> = memo((props) => {
    const { item, collapsed, className, ...other } = props;

    return (
        <AppLink
            className={classNames(cls.SidebarItem, {[cls.collapsed]: collapsed}, [className])}
            to={item.path}
            {...other}
        >
            <item.Icon className={cls.icon} />
            {
                !collapsed &&
                <span className={cls.link}>
                    {item.text}
                </span>
            }
        </AppLink>
    );
});