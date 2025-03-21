import {AppRoutes, RoutePath} from "shared/const/router";
import React from "react";
import Logo from "shared/assets/logo-50x50.svg"
import Cup from "shared/assets/icons/Кубок.svg"
import ReservationIcon from "shared/assets/icons/location-pin-lock.svg";
import ShopIcon from "shared/assets/icons/shop.svg"

export interface ISidebarItem {
    name: string;
    path?: string;
    text: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const sidebarItemsList: ISidebarItem[] = [
    {
        name: AppRoutes.MAIN,
        path: RoutePath.main,
        Icon: Logo,
        text: "Главная"
    },
    {
        name: AppRoutes.RESERVATION,
        path: RoutePath.reservation,
        Icon: ReservationIcon,
        text: "Бронь рабочего места"
    },
    // {
    //     name: AppRoutes.RESERVATIONLOCKER,
    //     path: RoutePath.reservationlocker,
    //     Icon: ReservationIcon,
    //     text: "Бронь шкафчика"
    // },
    {
        name: AppRoutes.SHOP,
        path: RoutePath.shop,
        Icon: ShopIcon,
         text: "Магазин"
    },
    {
        name: AppRoutes.TOPWORKERS,
        path: RoutePath.top_workers,
        Icon: Cup,
       text: "Стена почета и славы"
    }
]