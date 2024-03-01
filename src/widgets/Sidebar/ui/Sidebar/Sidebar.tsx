import cls from './Sidebar.module.scss';
import {classNames} from "shared/lib/classNames";
import MenuLogo from "shared/assets/icons/menu.svg";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {ISidebarItem, sidebarItemsList} from "widgets/Sidebar/model/sidebarItems";
import {SidebarItem} from "widgets/Sidebar/ui/SidebarItem/SidebarItem";

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const menuItem: ISidebarItem = {
        name: "menu",
        text: "Меню",
        Icon: MenuLogo
    }

    const mouseEnterHandler = useCallback(() => {
       timerRef.current = setTimeout(() => {
           setCollapsed(false);
       }, 500)
    }, [setCollapsed]);

    const mouseLeaveHandler = useCallback(() => {
        setCollapsed(true);
        clearTimeout(timerRef.current);
    }, [setCollapsed]);

    const menuButtonHandler = useCallback(() => {
        setCollapsed(prevState => !prevState);
        timerRef.current && clearTimeout(timerRef.current);
    }, [setCollapsed]);

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.name} />
    )), [collapsed]);

    return (
        <aside
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [])}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <div className={cls.sticky}>
                <SidebarItem item={menuItem} collapsed={collapsed} className={cls.menuButton} onClick={menuButtonHandler} />

                <nav className={cls.linksList}>
                    { itemsList }
                </nav>
            </div>
        </aside>
    );
}