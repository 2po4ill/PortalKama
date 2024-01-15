import {RouteProps} from "react-router-dom";
import MainPage from "pages/MainPage";
import Reservation from "pages/Reservation";
import Store from "pages/Store";


export enum AppRoutes {
    MAIN = 'main',
    RESERVATION = 'reservation',
    STORE = 'store'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESERVATION]: '/reservation',
    [AppRoutes.STORE]: '/store',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.RESERVATION]: {
        path: RoutePath.reservation,
        element: <Reservation />
    },
    [AppRoutes.STORE]: {
        path: RoutePath.reservation,
        element: <Store />
    },
}