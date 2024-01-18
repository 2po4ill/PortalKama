import {RouteProps} from "react-router-dom";
import {AppRoutes, RoutePath} from "shared/const/router";

import MainPage from "pages/MainPage";
import Store from "pages/Store";
import ReservationPage from "pages/ReservationPage/ui/ReservationPage";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {PageLoader} from "widgets/PageLoader";
import {PageNotFound} from "widgets/PageNotFound/ui/PageNotFound";

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.RESERVATION]: {
        path: RoutePath.reservation,
        element: <ReservationPage />
    },
    [AppRoutes.STORE]: {
        path: RoutePath.store,
        element: <Store />
    },

    /**
     *  TODO Сделать NotFoundPage как отдельную страницу или виджет
     * Этот путь всегда последний
     */
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <PageNotFound />
    }
}