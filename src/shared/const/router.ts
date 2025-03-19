export enum AppRoutes {
    MAIN = 'main',
     SHOP = 'shop',
     CART = 'cart',
    RESERVATION = 'reservation',
    USERBALANCE = 'user_balance',
    TOPWORKERS = 'top_workers',
    // RESERVATIONLOCKER = 'reservationlocker',
    MYRESERVATIONS = 'myreservations',
    PROFILE = 'profile',
    USERORDERS = 'user_orders',
    // всегда последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESERVATION]: '/reservation',
    // [AppRoutes.RESERVATIONLOCKER]: '/reservation/locker',
    [AppRoutes.MYRESERVATIONS]: '/reservation/my',
    [AppRoutes.TOPWORKERS]: '/top_workers',
     [AppRoutes.SHOP]: '/shop',
    [AppRoutes.USERBALANCE]: '/user_balance',
     [AppRoutes.CART]: '/cart',
    [AppRoutes.USERORDERS]: 'cart/user_orders',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOT_FOUND]: '*'
}