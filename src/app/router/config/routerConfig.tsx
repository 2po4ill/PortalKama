import {Route, RouteProps, Routes} from "react-router-dom";
import {AppRoutes, RoutePath} from "shared/const/router";
import MainPage from "pages/MainPage";
import Shop from "pages/Shop";
import ReservationPage from "pages/ReservationPage/ui/ReservationPage";
import {PageNotFound} from "widgets/PageNotFound/ui/PageNotFound";
import ProfilePage from "pages/ProfilePage";
import React, {Suspense} from "react";


export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.RESERVATION]: {
        path: RoutePath.reservation,
        element: <ReservationPage />
    },
    [AppRoutes.SHOP]: {
        path: RoutePath.shop,
        element: <Shop />
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage/>
    },

    /**
     *
     * Этот путь всегда последний
     */
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <PageNotFound />
    }
}