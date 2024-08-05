import {RouteProps} from "react-router-dom";
import {AppRoutes, RoutePath} from "shared/const/router";
import Shop from "pages/Shop";
import ReservationPage from "pages/ReservationPage/ui/ReservationPage";
import {PageNotFound} from "widgets/PageNotFound/ui/PageNotFound";
import ProfilePage from "pages/ProfilePage";
import PostsPage from "pages/PostsPage";
import CartPage from "pages/CartPage";
import MyReservationsPage from "pages/MyReservationsPage/ui/MyReservationsPage";

export type AppRouteProps = RouteProps & {
    authRequire?: boolean;
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <PostsPage />,
    },
    [AppRoutes.RESERVATION]: {
        path: RoutePath.reservation,
        element: <ReservationPage />,
        authRequire: true
    },
    [AppRoutes.SHOP]: {
        path: RoutePath.shop,
        element: <Shop />,
        authRequire: true
    },
    [AppRoutes.CART]: {
        path: RoutePath.cart,
        element: <CartPage />,
        authRequire: true
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authRequire: true
    },
    [AppRoutes.MYRESERVATIONS]: {
        path: RoutePath.myreservations,
        element: <MyReservationsPage />,
        authRequire: true
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