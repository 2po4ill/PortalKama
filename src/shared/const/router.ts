export enum AppRoutes {
    MAIN = 'main',
    // SHOP = 'shop',
    // CART = 'cart',
    RESERVATION = 'reservation',
    // RESERVATIONLOCKER = 'reservationlocker',
    MYRESERVATIONS = 'myreservations',
    PROFILE = 'profile',
    // всегда последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESERVATION]: '/reservation',
    // [AppRoutes.RESERVATIONLOCKER]: '/reservation/locker',
    [AppRoutes.MYRESERVATIONS]: '/reservation/my',
    // [AppRoutes.SHOP]: '/shop',
    // [AppRoutes.CART]: '/cart',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOT_FOUND]: '*'
}