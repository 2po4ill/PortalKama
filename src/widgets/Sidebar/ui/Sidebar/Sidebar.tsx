import cls from './Sidebar.module.scss';
import {classNames} from "shared/lib/classNames";
import MenuLogo from "shared/assets/icons/menu.svg";
import React, {useState} from "react";
import {ISidebarItem, sidebarItemsList} from "widgets/Sidebar/model/sidebarItems";
import {SidebarItem} from "widgets/Sidebar/ui/SidebarItem/SidebarItem";

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const menuItem: ISidebarItem = {
        name: "menu",
        text: "Меню",
        Icon: MenuLogo
    }

    const menuButtonHandler = () => {
        setCollapsed(prevState => !prevState)
    }

    return (
        <aside className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [])}>
            <div className={cls.sticky}>
                <SidebarItem item={menuItem} collapsed={collapsed} className={cls.menuButton} onClick={menuButtonHandler} />

                <nav className={cls.linksList}>
                    {
                        sidebarItemsList.map((item) => (
                            <SidebarItem item={item} collapsed={collapsed} key={item.name} />
                        ))
                    }
                </nav>
            </div>
        </aside>
    );
}